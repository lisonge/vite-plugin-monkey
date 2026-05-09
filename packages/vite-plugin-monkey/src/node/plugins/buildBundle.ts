import * as acornWalk from 'acorn-walk';
import type { OutputChunk, RolldownOutput } from 'rolldown';
import type { Plugin, ResolvedConfig } from 'vite';
import { build } from 'vite';
import { finalMonkeyOptionToComment } from '../userscript';
import { collectGrant } from '../utils/grant';
import {
  getCssModuleCode,
  moduleExportExpressionWrapper,
} from '../utils/others';
import { getSystemjsRequireUrls, getSystemjsTexts } from '../utils/systemjs';
import {
  getSafeTlaIdentifier,
  transformIdentifierToTla,
  transformTlaToIdentifier,
} from '../utils/topLevelAwait';
import type { ResolvedMonkeyOption } from '../utils/types';
import { cssModuleId, virtualCssModuleId } from './css';
import MagicString from 'magic-string';

const __entry_name = `__monkey.entry.js`;
const cssModuleEntryId = cssModuleId + `-entry`;
const virtualCssModuleEntryId = '\0' + cssModuleEntryId;

// https://github.com/vitejs/vite/blob/main/packages/plugin-legacy/src/index.ts
const polyfillId = '\0vite/legacy-polyfills';

const systemJsImportMapPrefix = `user`;

export const buildBundleFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:buildBundle',
    apply: 'build',
    enforce: 'post',
    async config() {
      option = await getOption();
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async generateBundle(_, rawBundle) {
      const entryChunks: OutputChunk[] = [];
      const chunks: OutputChunk[] = [];
      Object.values(rawBundle).forEach((chunk) => {
        if (chunk.type == 'chunk') {
          if (chunk.facadeModuleId != polyfillId) {
            chunks.push(chunk);
          }
          if (chunk.isEntry) {
            if (chunk.facadeModuleId == polyfillId) {
              entryChunks.unshift(chunk);
            } else {
              entryChunks.push(chunk);
            }
          }
        }
      });

      const fristEntryChunk = entryChunks.find(
        (s) => s.facadeModuleId != polyfillId,
      );

      const cssCode = Object.entries(rawBundle)
        .map(([k, v]) => {
          if (v.type == 'asset' && k.endsWith('.css')) {
            delete rawBundle[k];
            return v.source.toString();
          }
        })
        .filter(Boolean)
        .join('')
        .trim();

      let cssJsCode = '';
      const entryCode = (() => {
        const e = Array.from(entryChunks);
        const codes: string[] = [];
        if (cssCode) {
          if (e[0].facadeModuleId === polyfillId) {
            codes.push(`import ${JSON.stringify(`./${e[0].fileName}`)};`);
            e.shift();
          }
          codes.push(`import '${cssModuleEntryId}';`);
        }
        codes.push(...e.map((c) => `import './${c.fileName}';`));
        return codes.join('\n');
      })();

      const hasDynamicImport = entryChunks.some((e) => {
        // check has import('./a')
        if (e.dynamicImports.length) return true;
        if (!e.code.includes('import')) return false;
        // check has import('vue')
        let a = Boolean(false);
        const ast = this.parse(e.code);
        try {
          acornWalk.simple(ast, {
            ImportExpression() {
              a = true;
              throw new Error('stop');
            },
          });
        } catch {}
        return a;
      });

      const usedModules = new Set<string>();

      const tlaIdentifier = getSafeTlaIdentifier(rawBundle);

      let finalJsCode = ``;

      const mockPlugin = {
        name: 'monkey:mock',
        resolveId: {
          order: 'pre' as const,
          handler: (
            source: string,
            importer: string | undefined,
            options: { isEntry: boolean },
          ): string | undefined => {
            if (!importer && options.isEntry) {
              return '\0' + source;
            }
            if (source === cssModuleEntryId) return virtualCssModuleEntryId;
            if (source === cssModuleId) return virtualCssModuleId;
            const chunk = Object.values(rawBundle).find(
              (chunk) =>
                chunk.type == 'chunk' && source.endsWith(chunk.fileName),
            ) as OutputChunk | undefined;
            if (chunk) {
              return '\0' + source;
            }
          },
        },
        load: {
          order: 'pre' as const,
          handler: (id: string): string | undefined => {
            if (!id.startsWith('\0')) return;
            if (id === virtualCssModuleEntryId) {
              // use \x20 compat unocss
              return `import { _css } from '${cssModuleId}'; _css(${JSON.stringify('\x20' + cssCode + '\x20')});`;
            }
            if (id === virtualCssModuleId) {
              cssJsCode = getCssModuleCode(option.cssSideEffects);
              return cssJsCode;
            }
            if (id.endsWith(__entry_name)) {
              return entryCode;
            }
            const [k, chunk] =
              Object.entries(rawBundle).find(([_, chunk]) =>
                id.endsWith(chunk.fileName),
              ) ?? [];
            if (chunk && chunk.type == 'chunk' && k) {
              usedModules.add(k);
              if (!hasDynamicImport) {
                const ch = transformTlaToIdentifier(this, chunk, tlaIdentifier);
                if (ch) return ch.code;
              }
              return chunk.code;
            }
          },
        },
      };

      const minify = viteConfig.build.minify ?? false;
      if (hasDynamicImport) {
        // use rollup build systemjs
        const { rollup } = await import('rollup');
        const buildResult = await (
          await rollup({
            logLevel: 'silent',
            external: Object.keys(option.globalsPkg2VarName),
            input: __entry_name,
            plugins: [mockPlugin],
          })
        ).generate({
          globals: option.globalsPkg2VarName,
          format: 'systemjs',
          sourcemap: false,
          strict: true,
          compact: true,
        });
        const chunks = buildResult.output.flat();
        const systemJsModules: string[] = [];
        let entryName = '';
        chunks.forEach((chunk) => {
          if (chunk.type == 'chunk') {
            const name = JSON.stringify(`./` + chunk.fileName);
            systemJsModules.push(
              chunk.code
                .trimStart()
                .replace(/^System\.register\(/, `System.register(${name}, `),
            );
            if (chunk.isEntry) {
              entryName = name;
            }
          }
        });
        systemJsModules.push(`System.import(${entryName}, "./");`);
        finalJsCode = systemJsModules.map((v) => v.trim()).join('\n');
        const usedModuleIds = Array.from(this.getModuleIds()).filter(
          (d) => d in option.globalsPkg2VarName,
        );
        // {vue:'xxx:vue'}
        const importsMap = usedModuleIds.reduce(
          (p: Record<string, string>, c) => {
            p[c] = `${systemJsImportMapPrefix}:${c}`;
            return p;
          },
          {},
        );
        // inject SystemJs external globals
        finalJsCode = [
          Object.keys(importsMap).length > 0
            ? `System.addImportMap({ imports: ${JSON.stringify(importsMap)} });`
            : ``,
          ...usedModuleIds.map(
            (id) =>
              `System.set(${JSON.stringify(
                `${systemJsImportMapPrefix}:${id}`,
              )}, ${moduleExportExpressionWrapper(
                option.globalsPkg2VarName[id],
              )});`,
          ),
          finalJsCode,
        ]
          .filter((s) => s.trim())
          .join('\n');

        if (typeof option.systemjs == 'function') {
          option.collectRequireUrls.push(
            ...getSystemjsRequireUrls(option.systemjs),
          );
        } else {
          finalJsCode =
            (await getSystemjsTexts()).join('\n') + '\n' + finalJsCode;
        }
      } else {
        const rolldownMinify =
          (viteConfig.build.minify === undefined ||
            viteConfig.build.minify === 'oxc') &&
          !Array.isArray(viteConfig.build.rolldownOptions?.output)
            ? viteConfig.build.rolldownOptions.output?.minify
            : undefined;
        // use vite(rolldown) build iife
        const buildResult = (await build({
          logLevel: 'error',
          configFile: false,
          build: {
            write: false,
            minify,
            terserOptions: viteConfig.build.terserOptions,
            target: 'esnext',
            modulePreload: false,
            rolldownOptions: {
              external: Object.keys(option.globalsPkg2VarName),
              output: {
                ...(rolldownMinify !== undefined
                  ? { minify: rolldownMinify }
                  : {}),
                // disable rolldown minify when using terser or esbuild
                globals: option.globalsPkg2VarName,
                comments: false,
                strict: false, // rolldown will add 'use strict' to the file top instead of the wrapper function next line
              },
              experimental: {
                attachDebugInfo: 'none',
              },
            },
            lib: {
              entry: __entry_name,
              formats: ['iife'],
              name: '__expose__',
              fileName: () => '__entry.js',
            },
          },
          plugins: [
            {
              ...mockPlugin,
              generateBundle: {
                order: 'pre',
                handler(_, iifeBundle) {
                  Object.entries(iifeBundle).forEach(([_, chunk]) => {
                    transformIdentifierToTla(this, chunk, tlaIdentifier);
                  });
                },
              },
            },
          ],
        })) as RolldownOutput[];
        const chunks = buildResult[0].output.flat();
        chunks.forEach((chunk) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            finalJsCode = chunk.code;
          }
        });

        // add 'use strict' to the wrapper function next line
        const ms = new MagicString(finalJsCode);
        const ast = this.parse(finalJsCode);
        try {
          acornWalk.simple(
            ast,
            {
              FunctionExpression(node) {
                const indentSize = (() => {
                  if (!node.body.body.length) return 0;
                  const st = node.body.body[0].start;
                  let i = st;
                  while (i > 0 && finalJsCode[i] !== '\n') {
                    i--;
                  }
                  if (!i) return 0;
                  return st - i;
                })();
                ms.appendRight(
                  node.body.start + 1,
                  `${minify ? '' : '\n'}${' '.repeat(indentSize)}'use strict';`,
                );
                throw new Error('stop');
              },
            },
            { ...acornWalk.base, Function: () => {} },
          );
        } catch (e) {
          if (!(e instanceof Error && e.message === 'stop')) {
            throw e;
          }
        }
        finalJsCode = ms.toString();
      }

      usedModules.forEach((k) => {
        if (fristEntryChunk != rawBundle[k]) {
          delete rawBundle[k];
        }
      });

      let collectGrantSet: Set<string>;
      if (option.build.autoGrant) {
        collectGrantSet = collectGrant(
          this,
          chunks,
          cssJsCode,
          viteConfig.build.minify !== false,
        );
      } else {
        collectGrantSet = new Set<string>();
      }

      const comment = await finalMonkeyOptionToComment(
        option,
        collectGrantSet,
        'build',
      );

      const mergedCode =
        [comment, finalJsCode]
          .filter((s) => s)
          .join(`\n\n`)
          .trimEnd() + '\n';
      if (fristEntryChunk) {
        fristEntryChunk.fileName = option.build.fileName;
        fristEntryChunk.code = mergedCode;
      } else {
        this.emitFile({
          type: 'asset',
          fileName: option.build.fileName,
          source: mergedCode,
        });
      }

      if (option.build.metaFileName) {
        this.emitFile({
          type: 'asset',
          fileName: option.build.metaFileName(),
          source: await finalMonkeyOptionToComment(
            option,
            collectGrantSet,
            'meta',
          ),
        });
      }
    },
  };
};
