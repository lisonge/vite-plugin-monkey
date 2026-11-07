import MagicString from 'magic-string';
import { lookup } from 'mrmime';
import type { Plugin, ResolvedConfig } from 'vite';
import { getProgramImportNodes } from '../utils/imports.ts';
import { getSafeIdentifier, getUpperCaseName } from '../utils/code.ts';
import { getModuleRealInfo } from '../utils/pkg.ts';
import type { MonkeyContext } from '../config/context.ts';
import type { PackageContext } from '../config/types.ts';
import { registerResource } from '../assets/resources.ts';

import {
  loaderModuleCode,
  loaderModId,
  virtualloaderModId,
  resourceModuleCode,
  getExportModuleCode,
  isRawResId,
  getValueResId,
  getVirtualResId,
  getResNameTuple,
} from './resource-modules.ts';

export const externalResourceFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let viteConfig: ResolvedConfig;
  // Keep resolved entries across watch builds; emit only dependencies in the current graph.
  const resourceCache: Record<
    string,
    { resourceName: string; resourceUrl: string }
  > = {};
  let resKeys: string[];
  return {
    name: 'monkey:externalResource',
    enforce: 'post',
    apply: 'build',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
        resKeys = Object.entries(context.config.dependencies)
          .filter(([, v]) => v.kind === 'resource')
          .map(([k]) => k);
      },
    },
    configResolved(config) {
      viteConfig = config;
    },
    resolveId(id) {
      if (id === loaderModId) return virtualloaderModId;
      if (isRawResId(id)) return getVirtualResId(id);
    },
    async transform(code) {
      if (!code.includes('import')) return;
      if (!resKeys.some((k) => code.includes(k))) return;
      const nodes = getProgramImportNodes(this.parse(code)).filter((n) =>
        resKeys.includes(n.value),
      );
      if (!nodes.length) return;
      const ms = new MagicString(code);
      const importCodes: string[] = [];
      for (const { node, value } of nodes) {
        if (node.type === 'ImportDeclaration') {
          ms.update(
            node.source.start,
            node.source.end,
            JSON.stringify(getValueResId(value)),
          );
        } else {
          const loadName = getSafeIdentifier(
            getUpperCaseName(value) || 'r',
            code,
            importCodes,
          );
          importCodes.push(
            `import { _ as ${loadName}} from ${JSON.stringify(getValueResId(value, true))};`,
          );
          ms.update(node.start, node.end, `${loadName}()`);
        }
      }
      ms.prepend(importCodes.join('\n'));
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      };
    },
    async load(id) {
      if (id === virtualloaderModId)
        return loaderModuleCode(context.config.css.inject);
      const [importName, dynamic] = getResNameTuple(id) || [];
      if (dynamic === undefined) return;
      if (!importName) return;
      const resOption = context.config.dependencies[importName];
      if (resOption.kind !== 'resource') return;
      let pkg: PackageContext | undefined;
      const getPackage = async () =>
        (pkg ??= {
          ...(await getModuleRealInfo(importName, context.config.entry)),
          importName,
        });
      const resourceName = resOption.name ?? importName;
      const resourceUrl =
        typeof resOption.url === 'string'
          ? resOption.url
          : await resOption.url(await getPackage());
      resourceCache[importName] = {
        resourceName,
        resourceUrl,
      };
      if (typeof resOption.loader === 'object') {
        const loaderParam = {
          ...(await getPackage()),
          resourceName,
          resourceUrl,
          dynamic,
        };
        const resolved = await this.resolve(
          resOption.loader.entry,
          context.config.entry,
        );
        if (!resolved)
          throw new Error(
            '[monkey] Cannot resolve resource loader ' + resOption.loader.entry,
          );
        return resourceModuleCode({
          imports: 'import load from ' + JSON.stringify(resolved.id),
          expression: `load(${JSON.stringify(loaderParam)})`,
          dynamic,
          awaitResult: true,
        });
      }
      const [resourcePath, query] = importName.split('?', 2);
      const ext = resourcePath.split('.').at(-1) ?? '';
      const mimeType = lookup(ext) ?? 'application/octet-stream';
      const suffixSet = new URLSearchParams(query);
      let loader = resOption.loader;
      if (!loader) {
        if (suffixSet.has('inline') && ext === 'css') loader = 'raw';
        else if (suffixSet.has('url') || suffixSet.has('inline'))
          loader = 'url';
        else if (suffixSet.has('raw')) loader = 'raw';
        else if (ext === 'json') loader = 'json';
        else if (ext === 'css') loader = 'css';
        else if (viteConfig.assetsInclude(resourcePath)) loader = 'url';
        else throw new Error(`module: ${importName} not found loader`);
      }
      return getExportModuleCode(loader + 'Loader', dynamic, [
        resourceName,
        mimeType,
      ]);
    },
    generateBundle() {
      const usedModIdSet = new Set<string>();
      Array.from(this.getModuleIds()).forEach((id) => {
        const name = getResNameTuple(id)?.[0];
        if (name) {
          usedModIdSet.add(name);
        }
      });
      const collectResource: Record<string, string> = Object.create(null);
      Object.entries(resourceCache).forEach(
        ([importName, { resourceName, resourceUrl }]) => {
          if (usedModIdSet.has(importName)) {
            registerResource(
              collectResource,
              context.config.userscript.resource,
              resourceName,
              resourceUrl,
            );
          }
        },
      );
      context.state.collectResource = collectResource;
    },
  };
};
