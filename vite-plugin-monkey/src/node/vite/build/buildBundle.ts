import type { Rolldown } from 'vite';
import type { Plugin, ResolvedConfig } from 'vite';
import { build, Visitor } from 'vite';
import { finalMonkeyOptionToComment } from '../../metadata/index.ts';
import { collectGrant } from '../../permissions/detect.ts';
import {
  assetStringExpression,
  replaceAssetMarkers,
} from '../../assets/resolve.ts';
import {
  getCssModuleCode,
  moduleExportExpressionWrapper,
} from '../../utils/others.ts';
import { getSystemjsSource } from '../../utils/systemjs.ts';
import { createOutputModules } from '../../utils/outputModules.ts';
import {
  getSafeTlaIdentifier,
  transformIdentifierToTla,
  transformTlaToIdentifier,
} from '../../utils/topLevelAwait.ts';
import type { MonkeyContext } from '../../utils/types.ts';
import { cssModuleId, virtualCssModuleId } from './css.ts';
import { finalizeWorkers } from '../../workers/plugin.ts';
import { workerRuntimeId } from '../../workers/graph.ts';
import { workerRuntimeModule } from '../../runtime/worker.ts';

const entryModuleId = '\0monkey-entry';
const cssModuleEntryId = cssModuleId + `-entry`;
const virtualCssModuleEntryId = '\0' + cssModuleEntryId;

// https://github.com/vitejs/vite/blob/main/packages/plugin-legacy/src/index.ts
const polyfillId = '\0vite/legacy-polyfills';

const systemJsImportMapPrefix = `user`;

export const buildBundleFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:buildBundle',
    apply: 'build',
    enforce: 'post',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
      },
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async generateBundle(_, rawBundle) {
      const hasWorkers = finalizeWorkers(this, context, rawBundle);
      const workerRuntime = hasWorkers
        ? workerRuntimeModule(await getSystemjsSource())
        : undefined;
      for (const chunk of Object.values(rawBundle)) {
        if (chunk.type === 'chunk') {
          chunk.code = replaceAssetMarkers(
            this,
            chunk.code,
            context,
            rawBundle,
          );
        }
      }
      const entryChunks: Rolldown.OutputChunk[] = [];
      const chunks: Rolldown.OutputChunk[] = [];
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

      const firstEntryChunk = entryChunks.find(
        (s) => s.facadeModuleId != polyfillId,
      );

      const cssCode = Object.entries(rawBundle)
        .map(([k, v]) => {
          if (
            v.type == 'asset' &&
            k.endsWith('.css') &&
            !(
              context.config.assets.publicPath &&
              context.state.collectResource[k]
            )
          ) {
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
        codes.push(
          ...e.map((c) => `import ${JSON.stringify('./' + c.fileName)};`),
        );
        return codes.join('\n');
      })();

      const hasDynamicImport = chunks.some((chunk) => {
        if (chunk.dynamicImports.length) return true;
        if (!chunk.code.includes('import')) return false;
        // External dynamic imports are not always listed in dynamicImports.
        let found = false;
        const ast = this.parse(chunk.code);
        new Visitor({
          ImportExpression() {
            found = true;
          },
        }).visit(ast);
        return found;
      });

      const usedModules = new Set<string>();
      const modules = createOutputModules(
        '\0monkey-output/',
        new Map(
          Object.entries(rawBundle).flatMap(([key, chunk]) =>
            chunk.type === 'chunk'
              ? [[chunk.fileName, { key, chunk }] as const]
              : [],
          ),
        ),
      );

      const tlaIdentifier = hasDynamicImport
        ? ''
        : getSafeTlaIdentifier(rawBundle);

      let finalJsCode = ``;

      const mockPlugin = {
        name: 'monkey:mock',
        resolveId: {
          order: 'pre' as const,
          handler: (
            source: string,
            importer: string | undefined,
          ): string | undefined => {
            if (source === entryModuleId) return entryModuleId;
            if (source === cssModuleEntryId) return virtualCssModuleEntryId;
            if (source === cssModuleId) return virtualCssModuleId;
            if (source === workerRuntimeId) return '\0' + workerRuntimeId;
            return modules.resolveId(source, importer);
          },
        },
        load: {
          order: 'pre' as const,
          handler: (id: string): string | undefined => {
            if (!id.startsWith('\0')) return;
            if (id === '\0' + workerRuntimeId) return workerRuntime;
            if (id === virtualCssModuleEntryId) {
              // use \x20 compat unocss
              return `import { _css } from '${cssModuleId}'; _css(${assetStringExpression('\x20' + cssCode + '\x20', context, rawBundle)});`;
            }
            if (id === virtualCssModuleId) {
              cssJsCode = getCssModuleCode(context.config.css.inject);
              return cssJsCode;
            }
            if (id === entryModuleId) {
              return entryCode;
            }
            const module = modules.get(id);
            if (module) {
              const { key, chunk } = module;
              usedModules.add(key);
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
        const bundle = await rollup({
          logLevel: 'silent',
          external: Object.keys(context.state.globalsPkg2VarName),
          input: entryModuleId,
          plugins: [mockPlugin],
        });
        let buildResult;
        try {
          buildResult = await bundle.generate({
            globals: context.state.globalsPkg2VarName,
            format: 'systemjs',
            sourcemap: false,
            strict: true,
            compact: true,
          });
        } finally {
          await bundle.close();
        }
        const chunks = buildResult.output;
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
          (d) => d in context.state.globalsPkg2VarName,
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
                context.state.globalsPkg2VarName[id],
              )});`,
          ),
          finalJsCode,
        ]
          .filter((s) => s.trim())
          .join('\n');

        finalJsCode = (await getSystemjsSource()) + '\n' + finalJsCode;
      } else {
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
              input: entryModuleId,
              external: Object.keys(context.state.globalsPkg2VarName),
              output: {
                // set some default values which may be overridden by custom viteConfig
                comments: false,
                strict: false, // rolldown will add 'use strict' to the file top instead of the wrapper function next line
                intro: `'use strict';`,

                // preserve output options set in viteConfig, allow overriding values set above
                ...(Array.isArray(viteConfig.build.rolldownOptions.output)
                  ? {}
                  : viteConfig.build.rolldownOptions.output),
                globals: context.state.globalsPkg2VarName,
              },
              experimental: {
                attachDebugInfo: 'none',
              },
            },
            lib: {
              entry: entryModuleId,
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
        })) as Rolldown.RolldownOutput[];
        const chunks = buildResult[0].output;
        chunks.forEach((chunk) => {
          if (chunk.type == 'chunk' && chunk.isEntry) {
            finalJsCode = chunk.code;
          }
        });
      }

      usedModules.forEach((k) => {
        if (firstEntryChunk != rawBundle[k]) {
          delete rawBundle[k];
        }
      });

      let collectGrantSet: Set<string>;
      if (!Array.isArray(context.config.userscript.grant)) {
        collectGrantSet = collectGrant(this, chunks, cssJsCode);
      } else {
        collectGrantSet = new Set<string>();
      }

      if (
        context.config.assets.publicPath &&
        Object.keys(context.state.collectResource).some(
          (name) => rawBundle[name]?.type === 'asset',
        )
      ) {
        collectGrantSet.add('GM_getResourceURL');
      }
      const comment = finalMonkeyOptionToComment(
        context,
        collectGrantSet,
        'build',
      );

      const mergedCode =
        [comment, finalJsCode]
          .filter((s) => s)
          .join(`\n\n`)
          .trimEnd() + '\n';
      if (firstEntryChunk) {
        firstEntryChunk.fileName = context.config.output.script;
        firstEntryChunk.code = mergedCode;
      } else {
        this.emitFile({
          type: 'asset',
          fileName: context.config.output.script,
          source: mergedCode,
        });
      }

      if (context.config.output.meta) {
        this.emitFile({
          type: 'asset',
          fileName: context.config.output.meta,
          source: comment,
        });
      }
    },
  };
};
