import MagicString from 'magic-string';
import fs from 'node:fs/promises';
import type { TransformPluginContext } from 'rollup';
import type { Plugin } from 'vite';
import {
  getProgramImportNodes,
  getSafeIdentifier,
  getUpperCaseName,
} from '../utils/others';
import type { ResolvedMonkeyOption } from '../utils/types';

export const cssModuleId = 'virtual:monkey-css-side-effects';
export const virtualCssModuleId = '\0' + cssModuleId;

// https://github.com/vitejs/vite/blob/v7.1.2/packages/vite/src/node/constants.ts#L97
const styleExts = [
  '.css',
  '.less',
  '.sass',
  '.scss',
  '.styl',
  '.stylus',
  '.pcss',
  '.postcss',
  '.sss',
];
const exludeModuleCssExts = styleExts.map((v) => '.module' + v);

const appendInline = (value: string): string => {
  return value + '?inline';
};
const exlcudeChars = ['\0', '?', '&'];
const exlcudeModuleNames = [
  // context.resolve() -> [plugin unocss:global:build:scan] [unocss] "uno.css" is being imported multiple times in different files
  'uno.css',
];

const filterAsync = async <T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => Promise<unknown>,
): Promise<T[]> => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, index) => results[index]);
};

const staticCssIdSuffix = '__plugin-monkey-static-css';
// https://github.com/lisonge/vite-plugin-monkey/issues/249
const staticCssTemplate = `
import {0} from '{1}';
import importCSS from '${cssModuleId}';
{0} && importCSS({0});
export default undefined;
`.trimStart();

export const cssFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  const isCssImport = async (
    context: TransformPluginContext,
    importer: string,
    value: string,
  ): Promise<boolean> => {
    if (!value) return false;
    // exclude virtual modules, such as virtual:uno.css
    if (value.startsWith('virtual:')) return false;
    if (exlcudeModuleNames.includes(value)) return false;
    if (exlcudeChars.some((c) => value.includes(c))) return false;
    if (exludeModuleCssExts.some((c) => value.endsWith(c))) return false;
    if (option.build.externalResource[value]) return false;
    const resolvedId = (await context.resolve(value, importer))?.id;
    if (!resolvedId) return false;
    if (exlcudeChars.some((c) => resolvedId.includes(c))) return false;
    if (exludeModuleCssExts.some((c) => resolvedId.endsWith(c))) return false;
    if (!styleExts.some((e) => resolvedId.endsWith(e))) return false;
    // exclude not exist file, such as /project/src/__unocss.css
    return fs
      .access(resolvedId)
      .then(() => true)
      .catch(() => false);
  };
  return {
    name: 'monkey:css',
    apply: 'build',
    enforce: 'post',
    async config() {
      option = await getOption();
      return {
        build: {
          rollupOptions: {
            external: [cssModuleId],
          },
        },
      };
    },
    resolveId(source) {
      if (source.endsWith(staticCssIdSuffix)) return source;
    },
    load(id) {
      // handle static css
      if (!id.endsWith(staticCssIdSuffix)) return;
      const staticId = id.slice(0, -staticCssIdSuffix.length);
      return staticCssTemplate
        .replaceAll(
          '{0}',
          getUpperCaseName(staticId.split('/').at(-1)) || 'css',
        )
        .replaceAll('{1}', appendInline(staticId));
    },
    async transform(code, id) {
      if (new URLSearchParams(id.split('?')[1] || '').has('inline')) return;
      if (!code.includes('import')) return;
      if (!styleExts.some((e) => code.includes(e))) return;
      const importedCssNodes = await filterAsync(
        getProgramImportNodes(this.parse(code)).filter((n) => {
          if (n.node.type === 'ImportDeclaration' && n.node.specifiers.length) {
            return false;
          }
          return true;
        }),
        async (n) => isCssImport(this, id, n.value),
      );
      if (!importedCssNodes.length) return;
      const ms = new MagicString(code);
      const loadName = getSafeIdentifier('importCSS', code);
      const importList: string[] = [
        `import ${loadName} from '${cssModuleId}';`,
      ];
      const nameCache: Record<string, string> = {};
      for (const n of importedCssNodes) {
        if (n.node.type === 'ImportExpression') {
          const inlineCssId = appendInline(n.value);
          if (!nameCache[inlineCssId]) {
            const cssName = getSafeIdentifier(
              getUpperCaseName(n.value) || 'css',
              code,
              importList,
            );
            nameCache[inlineCssId] = cssName;
            importList.push(`import ${cssName} from '${inlineCssId}';`);
          }
          ms.update(
            n.node.start,
            n.node.end,
            `${loadName}(${nameCache[inlineCssId]})`,
          );
        } else {
          const resolved = (await this.resolve(n.value, id))?.id;
          if (!resolved) continue;
          const staticCssId = resolved + staticCssIdSuffix;
          ms.update(n.node.start, n.node.end, `import '${staticCssId}';`);
        }
      }
      ms.prepend(importList.join('\n'));
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      };
    },
  };
};
