import { normalizePath, PluginOption, ResolvedConfig } from 'vite';
import type { FinalMonkeyOption, PkgOptions } from '../types';
import { getModuleRealInfo, miniCode } from '../_util';
import { lookup, mimes } from 'mrmime';
import { URLSearchParams } from 'node:url';

const resourceImportPrefix = '\0monkey-resource-import:';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  const resourceRecord: Record<
    string,
    { resourceName: string; resourceUrl: string }
  > = {};
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:externalResource',
    enforce: 'pre',
    apply: 'build',
    configResolved(config) {
      viteConfig = config;
    },
    async resolveId(id) {
      const { externalResource } = finalPluginOption.build;
      if (id in externalResource) {
        return resourceImportPrefix + id + '\0';
      }
      // see https://github.com/vitejs/vite/blob/5d56e421625b408879672a1dd4e774bae3df674f/packages/vite/src/node/plugins/css.ts#L431-L434
      const [fp, ext] = id.split('?', 1);
      const usp = new URLSearchParams(ext);
      if (fp.endsWith('.css') && usp.get('used') === '') {
        usp.delete('used');
        const id2 = fp + '?' + usp.toString();
        if (id2 in externalResource) {
          return resourceImportPrefix + id2 + '\0';
        }
      }
    },
    async load(id) {
      if (id.startsWith(resourceImportPrefix) && id.endsWith('\0')) {
        const { externalResource } = finalPluginOption.build;
        const importName = id.substring(
          resourceImportPrefix.length,
          id.length - 1,
        );
        if (!(importName in externalResource)) {
          return;
        }
        const pkg = await getModuleRealInfo(importName);
        const {
          resourceName: resourceNameFn,
          resourceUrl: resourceUrlFn,
          loader,
          nodeLoader,
        } = externalResource[importName];
        const resourceName = await resourceNameFn({ ...pkg, importName });
        const resourceUrl = await resourceUrlFn({ ...pkg, importName });
        resourceRecord[importName] = {
          resourceName,
          resourceUrl,
        };

        if (nodeLoader) {
          return miniCode(
            await nodeLoader({
              ...pkg,
              resourceName,
              resourceUrl,
              importName,
            }),
          );
        } else if (loader) {
          let fnText: string;
          if (
            loader.prototype && // not arrow function
            loader.name.length > 0 &&
            loader.name != 'function' // not anonymous function
          ) {
            if (Reflect.get(loader, Symbol.toStringTag) == 'AsyncFunction') {
              fnText = loader
                .toString()
                .replace(/^[\s\S]+?\(/, 'async function(');
            } else {
              fnText = loader.toString().replace(/^[\s\S]+?\(/, 'function(');
            }
          } else {
            fnText = loader.toString();
          }
          return miniCode(
            `export default (${fnText})(${JSON.stringify({
              resourceUrl,
              importName,
              ...pkg,
            } as PkgOptions)})`,
          );
        }

        let moduleCode: string | undefined = undefined;
        const ext = importName.split('?')[0].split('.').pop()!;
        const mimeType = lookup(ext) ?? 'application/octet-stream';
        const suffixSet = new URLSearchParams(importName.split('?').pop());
        if (suffixSet.has('url') || suffixSet.has('inline')) {
          moduleCode = [
            `import {urlLoader as loader} from 'virtual:plugin-monkey-loader'`,
            `export default loader(...${JSON.stringify([
              resourceName,
              mimeType,
            ])})`,
          ].join(';');
        } else if (suffixSet.has('raw')) {
          moduleCode = [
            `import {rawLoader as loader} from 'virtual:plugin-monkey-loader'`,
            `export default loader(...${JSON.stringify([resourceName])})`,
          ].join(';');
        } else if (ext == 'json') {
          // export name will bring side effect
          moduleCode = [
            `import {jsonLoader as loader} from 'virtual:plugin-monkey-loader'`,
            `export default loader(...${JSON.stringify([resourceName])})`,
          ].join(';');
        } else if (ext == 'css') {
          moduleCode = [
            `import {cssLoader as loader} from 'virtual:plugin-monkey-loader'`,
            `export default loader(...${JSON.stringify([resourceName])})`,
          ].join(';');
        } else if (viteConfig.assetsInclude(importName)) {
          const mediaType = mimes[ext];
          moduleCode = [
            `import {urlLoader as loader} from 'virtual:plugin-monkey-loader'`,
            `export default loader(...${JSON.stringify([
              resourceName,
              mediaType,
            ])})`,
          ].join(';');
        }
        if (moduleCode) {
          if (
            moduleCode.includes('rawLoader') ||
            moduleCode.includes('jsonLoader') ||
            moduleCode.includes('cssLoader')
          ) {
            finalPluginOption.userscript.grant.add('GM_getResourceText');
          } else if (moduleCode.includes('urlLoader')) {
            finalPluginOption.userscript.grant.add('GM_getResourceURL');
          }
          return miniCode(moduleCode);
        }

        throw new Error(`module: ${importName} not found loader`);
      }
    },
    generateBundle() {
      const usedModIdSet = new Set(
        Array.from(this.getModuleIds()).map((s) => normalizePath(s)),
      );
      Array.from(usedModIdSet).forEach((id) => {
        if (id.startsWith(resourceImportPrefix) && id.endsWith('\0')) {
          usedModIdSet.add(
            id.substring(resourceImportPrefix.length, id.length - 1),
          );
        }
      });
      const collectResource: Record<string, string> = {};
      Object.entries(resourceRecord).forEach(
        ([importName, { resourceName, resourceUrl }]) => {
          if (usedModIdSet.has(importName)) {
            collectResource[resourceName] = resourceUrl;
          }
        },
      );
      finalPluginOption.collectResource = collectResource;
    },
  };
};
