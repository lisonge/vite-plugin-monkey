import type { OutputChunk, RollupOutput } from 'rollup';
import { build, PluginOption } from 'vite';
import { getSystemjsRequireUrls, systemjsTexts } from '../systemjs';
import {
  findSafeTlaIdentifier,
  transformIdentifierToTla,
  transformTlaToIdentifier,
} from '../topLevelAwait';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import { moduleExportExpressionWrapper } from '../_util';
import { lazyValue } from '../_lazy';

const __entry_name = `__monkey.entry.js`;

// https://github.com/vitejs/vite/blob/1df2cfcbebd95a139da7dc30aad487c81b153b45/packages/plugin-legacy/src/index.ts#L718
const polyfillId = '\0vite/legacy-polyfills';

const systemJsImportMapPrefix = `user`;

export const finalBundlePlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
  return {
    name: 'monkey:finalBundle',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, rawBundle) {
      const entryChunks = (() => {
        const polyfillChunks: OutputChunk[] = [];
        const chunks: OutputChunk[] = [];
        Object.values(rawBundle).forEach((chunk) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            if (chunk.facadeModuleId == polyfillId) {
              polyfillChunks.push(chunk);
            } else {
              chunks.push(chunk);
            }
          }
        });
        return polyfillChunks.concat(chunks);
      })();

      finalOption.hasDynamicImport = entryChunks.some(
        (e) => e.dynamicImports.length > 0,
      );

      const usedModules = new Set<string>();

      const tlaIdentifier = lazyValue(() => findSafeTlaIdentifier(rawBundle));

      const buildResult = (await build({
        logLevel: 'error',
        configFile: false,
        esbuild: false,
        plugins: [
          {
            name: 'mokey:mock',
            enforce: 'pre',
            resolveId(source, importer, options) {
              if (!importer && options.isEntry) {
                return '\0' + source;
              }
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

              if (id.endsWith(__entry_name)) {
                return entryChunks
                  .map((a) => `import ${JSON.stringify(`./${a.fileName}`)};`)
                  .join('\n');
              }
              const [k, chunk] =
                Object.entries(rawBundle).find(([k, chunk]) =>
                  id.endsWith(chunk.fileName),
                ) ?? [];
              if (chunk && chunk.type == 'chunk' && k) {
                usedModules.add(k);
                if (!finalOption.hasDynamicImport) {
                  const ch = transformTlaToIdentifier(
                    this,
                    chunk,
                    tlaIdentifier.value,
                  );
                  if (ch) return ch;
                }
                return {
                  code: chunk.code,
                  map: chunk.map,
                };
              }
            },
            generateBundle(_, iifeBundle) {
              if (finalOption.hasDynamicImport) {
                return;
              }
              Object.entries(iifeBundle).forEach(([k, chunk]) => {
                transformIdentifierToTla(this, chunk, tlaIdentifier.value);
              });
            },
          },
        ],
        build: {
          write: false,
          minify: false,
          target: 'esnext',
          rollupOptions: {
            external(source) {
              return source in finalOption.globalsPkg2VarName;
            },
            output: {
              globals: finalOption.globalsPkg2VarName,
            },
          },
          lib: {
            entry: __entry_name,
            formats: [finalOption.hasDynamicImport ? 'system' : 'iife'] as any,
            name: finalOption.hasDynamicImport ? undefined : '__expose__',
            fileName: () => `__entry.js`,
          },
        },
      })) as RollupOutput[];

      usedModules.forEach((k) => {
        delete rawBundle[k];
      });

      const finalBundle = Object.assign({}, rawBundle, buildResult[0].output);
      let finalJsCode = ``;
      if (finalOption.hasDynamicImport) {
        const systemJsModules: string[] = [];
        let entryName = '';
        Object.entries(finalBundle).forEach(([k, chunk]) => {
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
          (d) => d in finalOption.globalsPkg2VarName,
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
                finalOption.globalsPkg2VarName[id],
              )});`,
          ),
          '\n' + finalJsCode,
        ]
          .filter((s) => s)
          .join('\n');

        if (finalOption.hasDynamicImport) {
          if (typeof finalOption.systemjs == 'function') {
            finalOption.collectRequireUrls.push(
              ...getSystemjsRequireUrls(finalOption.systemjs),
            );
          } else {
            finalJsCode =
              (await systemjsTexts.value).join('\n') + '\n' + finalJsCode;
          }
        }
      } else {
        // use iife
        Object.entries(finalBundle).forEach(([k, chunk]) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            finalJsCode = chunk.code;
          }
        });
      }

      const bannerCode = [
        await finalMonkeyOptionToComment(finalOption),
        finalOption.injectCssCode,
      ]
        .filter((s) => s)
        .map((s) => s + `\n\n`)
        .join(``);

      // wrap, @require, @resouse will make map error. This requires developers to manually pass the extra offset in the outside
      // The offset of different userscript engines is different
      // let { offset, sourceRoot } = finalPluginOption.build.sourcemap;
      // for (const char of bannerCode) {
      //   if (char == '\n') {
      //     offset++;
      //   }
      // }
      // if (offset < 0) {
      //   offset = 0;
      // }
      // const { map } = chunk;
      // if (map) {
      //   map.mappings = ';'.repeat(offset) + map.mappings;

      //   let relativeFileList = map.sources
      //     .map((filepath, i) => ({ filepath, i }))
      //     .filter(({ filepath }) => !path.isAbsolute(filepath));
      //   while (
      //     relativeFileList.every(({ filepath }) => filepath.startsWith('../'))
      //   ) {
      //     relativeFileList.forEach((f) => {
      //       f.filepath = f.filepath.substring(3);
      //     });
      //   }
      //   let relativeMaxNum = 0;
      //   relativeFileList.forEach(({ filepath }) => {
      //     let n = 0;
      //     while (filepath.substring(n * 3).startsWith('../')) {
      //       n++;
      //     }
      //     if (relativeMaxNum < n) {
      //       relativeMaxNum = n;
      //     }
      //   });
      //   const prefix = '-/'.repeat(relativeMaxNum);
      //   relativeFileList.forEach(({ filepath, i }) => {
      //     map.sources[i] = prefix + filepath;
      //   });
      //   Reflect.set(map, 'sourceRoot', sourceRoot);
      // }
      finalJsCode = bannerCode + finalJsCode;
      this.emitFile({
        type: 'asset',
        fileName: finalOption.build.fileName,
        source: finalJsCode,
      });

      const { metaFileName, fileName } = finalOption.build;
      if (metaFileName) {
        this.emitFile({
          type: 'asset',
          fileName: metaFileName(fileName),
          source: await finalMonkeyOptionToComment(finalOption),
        });
      }
    },
  };
};
