import type { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { getModuleRealInfo } from '../_util';
import path from 'node:path';

const dynamicImportPrefix = '\0monkey-dynamic-import:';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  const externalModNameSet = new Set<string>(
    finalPluginOption.build.externalGlobals.map(([s]) => s),
  );
  const realUsedModNameSet = new Set<string>();
  const globalsPkg2VarName: Record<string, string> = {};
  const requirePkgList: { moduleName: string; url: string }[] = [];
  return {
    name: 'monkey:externalGlobals',
    enforce: 'pre',
    apply: 'build',
    async config() {
      for (const [moduleName, varName2LibUrl] of finalPluginOption.build
        .externalGlobals) {
        const { name, version } = await getModuleRealInfo(moduleName);

        if (typeof varName2LibUrl == 'string') {
          globalsPkg2VarName[moduleName] = varName2LibUrl;
        } else if (typeof varName2LibUrl == 'function') {
          globalsPkg2VarName[moduleName] = await varName2LibUrl(
            version,
            name,
            moduleName,
          );
        } else if (varName2LibUrl instanceof Array) {
          const [varName, ...libUrlList] = varName2LibUrl;
          if (typeof varName == 'string') {
            globalsPkg2VarName[moduleName] = varName;
          } else if (typeof varName == 'function') {
            globalsPkg2VarName[moduleName] = await varName(
              version,
              name,
              moduleName,
            );
          }
          for (const libUrl of libUrlList) {
            // keep add order
            if (typeof libUrl == 'string') {
              requirePkgList.push({ url: libUrl, moduleName });
            } else if (typeof libUrl == 'function') {
              requirePkgList.push({
                url: await libUrl(version, name, moduleName),
                moduleName,
              });
            }
          }
        }
      }
      return {
        build: {
          rollupOptions: {
            external(source, _importer, _isResolved) {
              if (
                !source.startsWith('./') &&
                !source.startsWith('../') &&
                !path.isAbsolute(source)
              ) {
                realUsedModNameSet.add(source);
              }
              return externalModNameSet.has(source);
            },
            output: {
              globals: globalsPkg2VarName,
              inlineDynamicImports: true, // see https://rollupjs.org/guide/en/#outputinlinedynamicimports
            },
          },
        },
      };
    },

    async resolveDynamicImport(specifier, _importer) {
      if (typeof specifier == 'string' && specifier in globalsPkg2VarName) {
        return dynamicImportPrefix + specifier + '\0';
      }
    },

    async load(id) {
      if (id.startsWith(dynamicImportPrefix) && id.endsWith('\0')) {
        const rawId = id.slice(dynamicImportPrefix.length, id.length - 1);
        if (rawId in globalsPkg2VarName) {
          realUsedModNameSet.add(rawId);
          return `export default ${globalsPkg2VarName[rawId]}`;
        }
      }
    },

    async generateBundle() {
      const { userscript } = finalPluginOption;

      let requireUrlList = requirePkgList
        .filter((p) => realUsedModNameSet.has(p.moduleName))
        .map((p) => p.url);
      {
        const { require = [] } = userscript;
        if (typeof require == 'string') {
          requireUrlList = [require, ...requireUrlList];
        } else if (require instanceof Array) {
          requireUrlList = [...require, ...requireUrlList];
        }
        userscript.require = requireUrlList;
      }
    },
  };
};
