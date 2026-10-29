import MagicString from 'magic-string';
import fs from 'node:fs/promises';
import type { Rolldown } from 'vite';
import type { Plugin } from 'vite';
import {
  getProgramImportNodes,
  getSafeIdentifier,
  getUpperCaseName,
} from '../../utils/others.ts';
import type { MonkeyContext } from '../../utils/types.ts';

export const cssModuleId = 'virtual:monkey-css';
export const virtualCssModuleId = '\0' + cssModuleId;

// https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts
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
  // pluginContext.resolve() -> [plugin unocss:global:build:scan] [unocss] "uno.css" is being imported multiple times in different files
  'uno.css',
];

const staticCssIdSuffix = '__monkey-css';
// https://github.com/lisonge/vite-plugin-monkey/issues/249
const staticCssTemplate = `
import {0} from {1};
import { _css } from '${cssModuleId}';
{0} && _css({0});
export default undefined;
`.trimStart();

export const cssFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  const resolveCssImport = async (
    pluginContext: Rolldown.TransformPluginContext,
    importer: string,
    value: string,
  ): Promise<string | undefined> => {
    // exclude virtual modules, such as virtual:uno.css
    if (value.startsWith('virtual:')) return;
    if (exlcudeModuleNames.includes(value)) return;
    if (exlcudeChars.some((c) => value.includes(c))) return;
    if (exludeModuleCssExts.some((c) => value.endsWith(c))) return;
    if (context.config.dependencies[value]?.kind === 'resource') return;
    const resolvedId = (await pluginContext.resolve(value, importer))?.id;
    if (!resolvedId) return;
    if (exlcudeChars.some((c) => resolvedId.includes(c))) return;
    if (exludeModuleCssExts.some((c) => resolvedId.endsWith(c))) return;
    if (!styleExts.some((e) => resolvedId.endsWith(e))) return;
    // exclude not exist file, such as /project/src/__unocss.css
    return fs
      .access(resolvedId)
      .then(() => resolvedId)
      .catch(() => undefined);
  };
  return {
    name: 'monkey:css',
    apply: 'build',
    enforce: 'post',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
        return {
          build: {
            rolldownOptions: {
              external: [cssModuleId],
            },
          },
        };
      },
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
        .replaceAll('{1}', JSON.stringify(appendInline(staticId)));
    },
    async transform(code, id) {
      if (new URLSearchParams(id.split('?')[1] || '').has('inline')) return;
      if (!code.includes('import')) return;
      if (!styleExts.some((e) => code.includes(e))) return;
      const importedCssNodes = (
        await Promise.all(
          getProgramImportNodes(this.parse(code))
            .filter(
              ({ node }) =>
                node.type !== 'ImportDeclaration' || !node.specifiers.length,
            )
            .map(async (item) => {
              const resolvedId = await resolveCssImport(this, id, item.value);
              return resolvedId ? { ...item, resolvedId } : undefined;
            }),
        )
      ).filter((item) => item !== undefined);
      if (!importedCssNodes.length) return;
      const ms = new MagicString(code);
      const loadName = getSafeIdentifier('_css', code);
      const importList: string[] = [
        `import {_css as ${loadName}} from '${cssModuleId}';`,
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
            importList.push(
              `import ${cssName} from ${JSON.stringify(inlineCssId)};`,
            );
          }
          ms.update(
            n.node.start,
            n.node.end,
            `${loadName}(${nameCache[inlineCssId]})`,
          );
        } else {
          const staticCssId = n.resolvedId + staticCssIdSuffix;
          ms.update(
            n.node.start,
            n.node.end,
            `import ${JSON.stringify(staticCssId)};`,
          );
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
