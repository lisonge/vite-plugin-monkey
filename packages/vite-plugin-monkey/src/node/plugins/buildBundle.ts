import type { OutputChunk, RollupOutput } from 'rollup';
import type { Plugin, ResolvedConfig } from 'vite';
import { build } from 'vite';
import { finalMonkeyOptionToComment } from '../userscript';
import { collectGrant } from '../utils/grant';
import {
  getCssModuleCode,
  miniCode,
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

      const hasDynamicImport = entryChunks.some(
        (e) => e.dynamicImports.length > 0,
      );

      const usedModules = new Set<string>();

      const tlaIdentifier = getSafeTlaIdentifier(rawBundle);

      const buildResult = (await build({
        logLevel: 'error',
        configFile: false,
        esbuild: false,
        plugins: [
          {
            name: 'monkey:mock',
            enforce: 'pre',
            resolveId(source, importer, options) {
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
            async load(id) {
              if (!id.startsWith('\0')) return;
              if (id === virtualCssModuleEntryId) {
                // use \x20 compat unocss
                return miniCode(
                  `import css from '${cssModuleId}'; css(${JSON.stringify('\x20' + cssCode + '\x20')});`,
                );
              }
              if (id === virtualCssModuleId) {
                cssJsCode = getCssModuleCode(option.cssSideEffects);
                return miniCode(cssJsCode);
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
                  const ch = transformTlaToIdentifier(
                    this,
                    chunk,
                    tlaIdentifier,
                  );
                  if (ch) return ch;
                }
                return {
                  code: chunk.code,
                  map: null,
                };
              }
            },
            generateBundle(_, iifeBundle) {
              if (hasDynamicImport) {
                return;
              }
              Object.entries(iifeBundle).forEach(([_, chunk]) => {
                transformIdentifierToTla(this, chunk, tlaIdentifier);
              });
            },
          },
        ],
        build: {
          write: false,
          minify: false,
          target: 'esnext',
          rollupOptions: {
            external: Object.keys(option.globalsPkg2VarName),
            output: {
              globals: option.globalsPkg2VarName,
            },
          },
          lib: {
            entry: __entry_name,
            formats: [hasDynamicImport ? 'system' : 'iife'] as any,
            name: hasDynamicImport ? undefined : '__expose__',
            fileName: () => `__entry.js`,
          },
        },
      })) as RollupOutput[];
      usedModules.forEach((k) => {
        if (fristEntryChunk != rawBundle[k]) {
          delete rawBundle[k];
        }
      });

      const buildBundle = buildResult[0].output.flat();
      let finalJsCode = ``;
      if (hasDynamicImport) {
        const systemJsModules: string[] = [];
        let entryName = '';
        Object.entries(buildBundle).forEach(([_, chunk]) => {
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
        finalJsCode = systemJsModules.join('\n');
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
          '\n' + finalJsCode,
        ]
          .filter((s) => s)
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
        // use iife
        Object.entries(buildBundle).forEach(([_, chunk]) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            finalJsCode = chunk.code;
          }
        });
      }
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

      const mergedCode = [comment, finalJsCode]
        .filter((s) => s)
        .join(`\n\n`)
        .trimEnd();
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
