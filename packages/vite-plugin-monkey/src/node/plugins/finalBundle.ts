import type { OutputChunk, RollupOutput } from 'rollup';
import { Plugin, ResolvedConfig, build } from 'vite';
import { lazyValue } from '../_lazy';
import {
  collectGrant,
  getInjectCssCode,
  moduleExportExpressionWrapper,
} from '../_util';
import { getSystemjsRequireUrls, systemjsTexts } from '../systemjs';
import {
  findSafeTlaIdentifier,
  transformIdentifierToTla,
  transformTlaToIdentifier,
} from '../topLevelAwait';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import path from 'path';

const __entry_name = `__monkey.entry.js`;

// https://github.com/vitejs/vite/blob/1df2cfcbebd95a139da7dc30aad487c81b153b45/packages/plugin-legacy/src/index.ts#L718
const polyfillId = '\0vite/legacy-polyfills';

const systemJsImportMapPrefix = `user`;

export const finalBundlePlugin = (finalOption: FinalMonkeyOption): Plugin => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:finalBundle',
    apply: 'build',
    enforce: 'post',
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async generateBundle(outputOptions, rawBundle) {
      // 输出的目录
      let outputPath =
        outputOptions.dir || path.resolve(viteConfig.build.outDir);
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

      const hasDynamicImport = entryChunks.some(
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
                Object.entries(rawBundle).find(([_, chunk]) =>
                  id.endsWith(chunk.fileName),
                ) ?? [];
              if (chunk && chunk.type == 'chunk' && k) {
                usedModules.add(k);
                if (!hasDynamicImport) {
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
              if (hasDynamicImport) {
                return;
              }
              Object.entries(iifeBundle).forEach(([_, chunk]) => {
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

        if (typeof finalOption.systemjs == 'function') {
          finalOption.collectRequireUrls.push(
            ...getSystemjsRequireUrls(finalOption.systemjs),
          );
        } else {
          finalJsCode =
            (await systemjsTexts.value).join('\n') + '\n' + finalJsCode;
        }
      } else {
        // use iife
        Object.entries(buildBundle).forEach(([_, chunk]) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            finalJsCode = chunk.code;
          }
        });
      }

      const injectCssCode = await getInjectCssCode(finalOption, rawBundle);

      let collectGrantSet: Set<string>;
      if (finalOption.build.autoGrant) {
        collectGrantSet = collectGrant(
          this,
          chunks,
          injectCssCode,
          viteConfig.build.minify !== false,
        );
      } else {
        collectGrantSet = new Set<string>();
      }

      const comment = await finalMonkeyOptionToComment(
        finalOption,
        collectGrantSet,
        'build',
      );

      const mergedCode = [comment, injectCssCode, finalJsCode]
        .filter((s) => s)
        .join(`\n\n`)
        .trimEnd();
      if (fristEntryChunk) {
        fristEntryChunk.fileName = finalOption.build.fileName;
        fristEntryChunk.code = mergedCode;
      } else {
        this.emitFile({
          type: 'asset',
          fileName: finalOption.build.fileName,
          source: mergedCode,
        });
      }

      if (finalOption.build.metaFileName) {
        this.emitFile({
          type: 'asset',
          fileName: finalOption.build.metaFileName(),
          source: await finalMonkeyOptionToComment(
            finalOption,
            collectGrantSet,
            'meta',
          ),
        });
      }

      if (finalOption.build.metaLocalFileName) {
        let filePath = path.join(outputPath!, finalOption.build.fileName);
        this.emitFile({
          type: 'asset',
          fileName: finalOption.build.metaLocalFileName(),
          source: await finalMonkeyOptionToComment(
            finalOption,
            collectGrantSet,
            'meta-local',
            filePath,
          ),
        });
      }
    },
  };
};
