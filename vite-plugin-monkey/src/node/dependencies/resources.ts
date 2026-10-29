import MagicString from 'magic-string';
import { lookup } from 'mrmime';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  getCssModuleCode,
  getProgramImportNodes,
  getSafeIdentifier,
  getUpperCaseName,
} from '../utils/others.ts';
import { getModuleRealInfo } from '../utils/pkg.ts';
import type { MonkeyContext, PackageContext } from '../utils/types.ts';
import { registerResource } from '../assets/resources.ts';

const loaderModuleCode = (
  inject: import('../utils/types.ts').NormalizedConfig['css']['inject'],
) => `
import { GM_getResourceText, GM_getResourceURL } from '$';
${getCssModuleCode(inject)}
export const cssLoader = (name) => { const css = GM_getResourceText(name); _css(css); return css; };
export const jsonLoader = (name) => JSON.parse(GM_getResourceText(name));
export const rawLoader = (name) => GM_getResourceText(name);
export const urlLoader = (name, type) => {
  return GM_getResourceURL(name, false).replace(
    /^data:application;base64,/,
    'data:' + type + ';base64,',
  );
};
`;
const loaderModId = 'virtual:monkey-loader';
const virtualloaderModId = '\0' + loaderModId;

interface ResourceModuleOptions {
  imports: string;
  expression: string;
  dynamic: boolean;
  awaitResult?: boolean;
}
const resourceModuleCode = ({
  imports,
  expression,
  dynamic,
  awaitResult = false,
}: ResourceModuleOptions): string =>
  [
    imports,
    dynamic
      ? `let cache; export const _ = () => cache ??= Promise.resolve().then(() => ${expression}).then(value => ({default: value}))`
      : `export const _ = ${awaitResult ? 'await ' : ''}${expression}`,
    'export default _',
  ].join(';');

const getExportModuleCode = (
  name: string,
  dynamic: boolean,
  params: unknown[],
): string => {
  return resourceModuleCode({
    imports: `import {${name}} from '${loaderModId}'`,
    expression: `${name}(${params.map((v) => JSON.stringify(v)).join(',')})`,
    dynamic,
  });
};

const resPrefix = 'virtual:monkey-resource-';
const resDynamicPrefix = 'virtual:monkey-resource-dynamic-';
const isRawResId = (id: string): boolean => {
  return id.startsWith(resPrefix);
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
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let viteConfig: ResolvedConfig;
  const resourceRecord: Record<
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
      resourceRecord[importName] = {
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
      Object.entries(resourceRecord).forEach(
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
