import MagicString from 'magic-string';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  getProgramImportNodes,
  getSafeIdentifier,
  getUpperCaseName,
  miniCode,
} from '../utils/others';
import { getModuleRealInfo } from '../utils/pkg';
import type { ResolvedMonkeyOption } from '../utils/types';

const loaderModuleCode = `
import { GM_addStyle, GM_getResourceText, GM_getResourceURL } from 'vite-plugin-monkey/dist/client';
export const cssLoader = (name) => GM_addStyle(GM_getResourceText(name));
export const jsonLoader = (name) => JSON.parse(GM_getResourceText(name));
export const rawLoader = (name) => GM_getResourceText(name);
export const urlLoader = (name, type) => {
  return GM_getResourceURL(name, false).replace(
    /^data:application;base64,/,
    'data:' + type + ';base64',
  );
};
`;
const loaderModId = 'virtual:monkey-loader';
const virtualloaderModId = '\0' + loaderModId;

const getExportModuleCode = (
  name: string,
  dynamic: boolean,
  params: unknown[],
): string => {
  const valueLiteral = `(${name}(${params.map((v) => JSON.stringify(v)).join(',')}))`;
  return [
    `import {${name}} from '${loaderModId}'`,
    dynamic
      ? `let cache; export default async()=>cache??(cache=${valueLiteral})`
      : `export default ${valueLiteral}`,
  ].join(';');
};

const resPrefix = 'virtual:monkey-resource-';
const resDynamicPrefix = 'virtual:monkey-resource-dynamic-';
const isRawResId = (id: string): boolean => {
  return id.startsWith(resPrefix) || id.startsWith(resDynamicPrefix);
};
const getValueResId = (value: string, dynamic = false): string => {
  return (dynamic ? resDynamicPrefix : resPrefix) + encodeURIComponent(value);
};
const getVirtualResId = (id: string): string => {
  // append end \0 or encodeURIComponent to prevent handler that other plugin, such as css plugin
  return '\0' + id + '\0';
};

const getResNameTuple = (
  id: string,
): [name: string, dynamic: boolean] | undefined => {
  if (id.startsWith('\0') && id.endsWith('\0')) {
    if (id.startsWith(resDynamicPrefix, 1)) {
      return [
        decodeURIComponent(id.slice(resDynamicPrefix.length + 1, -1)),
        true,
      ];
    } else if (id.startsWith(resPrefix, 1)) {
      return [decodeURIComponent(id.slice(resPrefix.length + 1, -1)), false];
    }
  }
};

export const externalResourceFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  let viteConfig: ResolvedConfig;
  let mrmime: typeof import('mrmime');
  const resourceRecord: Record<
    string,
    { resourceName: string; resourceUrl: string }
  > = {};
  let resKeys: string[];
  return {
    name: 'monkey:externalResource',
    enforce: 'post',
    apply: 'build',
    async config() {
      option = await getOption();
      mrmime = await import('mrmime');
      resKeys = Object.keys(option.build.externalResource);
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
            `import ${loadName} from ${JSON.stringify(getValueResId(value, true))};`,
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
      if (id === virtualloaderModId) return miniCode(loaderModuleCode);
      const [importName, dynamic] = getResNameTuple(id) || [];
      if (dynamic === undefined) return;
      if (!importName) return;
      const pkg = await getModuleRealInfo(importName);
      const resOption = option.build.externalResource[importName];
      const resourceName = await resOption.resourceName({ ...pkg, importName });
      const resourceUrl = await resOption.resourceUrl({ ...pkg, importName });
      resourceRecord[importName] = {
        resourceName,
        resourceUrl,
      };
      const loaderParam = {
        ...pkg,
        resourceName,
        resourceUrl,
        importName,
        dynamic,
      };
      if (resOption.nodeLoader) {
        return miniCode(resOption.nodeLoader(loaderParam));
      } else if (resOption.loader) {
        const valueLiteral = `((${resOption.loader})(${JSON.stringify(loaderParam)}))`;
        return miniCode(
          dynamic
            ? `let cache; export default async()=>cache??(cache=${valueLiteral})`
            : `export default ${valueLiteral}`,
        );
      }
      const [resourcePath, query] = importName.split('?', 2);
      const ext = resourcePath.split('.').at(-1) ?? '';
      const mimeType = mrmime.lookup(ext) ?? 'application/octet-stream';
      const suffixSet = new URLSearchParams(query);
      const moduleCode = (() => {
        if (suffixSet.has('inline') && ext === 'css') {
          // css?inline -> string content
          return getExportModuleCode('rawLoader', dynamic, [resourceName]);
        } else if (suffixSet.has('url') || suffixSet.has('inline')) {
          return getExportModuleCode('urlLoader', dynamic, [
            resourceName,
            mimeType,
          ]);
        } else if (suffixSet.has('raw')) {
          return getExportModuleCode('rawLoader', dynamic, [resourceName]);
        } else if (ext == 'json') {
          return getExportModuleCode('jsonLoader', dynamic, [resourceName]);
        } else if (ext == 'css') {
          return getExportModuleCode('cssLoader', dynamic, [resourceName]);
        } else if (viteConfig.assetsInclude(resourcePath)) {
          return getExportModuleCode('urlLoader', dynamic, [
            resourceName,
            mimeType,
          ]);
        } else {
          throw new Error(`module: ${importName} not found loader`);
        }
      })();
      return miniCode(moduleCode);
    },
    generateBundle() {
      const usedModIdSet = new Set<string>();
      Array.from(this.getModuleIds()).forEach((id) => {
        const name = getResNameTuple(id)?.[0];
        if (name) {
          usedModIdSet.add(name);
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
      option.collectResource = collectResource;
    },
  };
};
