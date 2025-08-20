import MagicString from 'magic-string';
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
const exludeModuleExts = styleExts.map((v) => '.module' + v);

const appendInline = (value: string): string => {
  return value + '?inline';
};
const exlcudeChars = ['\0', '?', '&'];

const filterAsync = async <T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => Promise<unknown>,
): Promise<T[]> => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, index) => results[index]);
};

export const cssFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  const isCssImport = async (
    context: TransformPluginContext,
    id: string,
    value: string,
  ): Promise<boolean> => {
    if (!value) return false;
    if (exlcudeChars.some((c) => value.includes(c))) return false;
    if (exludeModuleExts.some((c) => value.endsWith(c))) return false;
    if (option.build.externalResource[value]) return false;
    const resolvedId = (await context.resolve(value, id))?.id;
    if (!resolvedId) return false;
    if (exlcudeChars.some((c) => resolvedId.includes(c))) return false;
    if (exludeModuleExts.some((c) => resolvedId.endsWith(c))) return false;
    return styleExts.some((e) => resolvedId.endsWith(e));
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
    async transform(code, id) {
      if (new URLSearchParams(id.split('?')[1] || '').has('inline')) return;
      if (!code.includes('import')) return;
      if (!styleExts.some((e) => code.includes(e))) return;
      const importedCssNodes = await filterAsync(
        getProgramImportNodes(this.parse(code)).filter((n) => {
          return !(
            n.node.type === 'ImportDeclaration' &&
            n.node.specifiers.length === 0
          );
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
      importedCssNodes.forEach((n) => {
        const cssId = JSON.stringify(appendInline(n.value));
        if (!nameCache[cssId]) {
          const cssName = getSafeIdentifier(
            getUpperCaseName(n.value) || 'css',
            code,
            importList,
          );
          nameCache[cssId] = cssName;
          importList.push(`import ${cssName} from ${cssId};`);
        }
        ms.update(n.node.start, n.node.end, `${loadName}(${nameCache[cssId]})`);
      });
      ms.prepend(importList.join('\n'));
      return {
        code: ms.toString(),
        map: ms.generateMap(),
      };
    },
  };
};
