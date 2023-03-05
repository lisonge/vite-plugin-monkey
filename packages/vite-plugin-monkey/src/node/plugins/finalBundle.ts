import fs from 'node:fs/promises';
import path from 'node:path';
import type { OutputChunk, RollupOutput } from 'rollup';
import type { PluginOption } from 'vite';
import { build } from 'vite';
import { systemjsRequireUrls } from '../systemjs';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';

export const finalBundlePlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
  return {
    name: 'monkey:finalBundle',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, esmBundle) {
      const cacheDistDir = path.join(
        process.cwd(),
        `./node_modules/.vite/__plugin_monkey/dist-${new Date().getTime()}`,
      );

      if (
        await fs
          .stat(cacheDistDir)
          .then(() => false)
          .catch(() => true)
      ) {
        await fs.mkdir(cacheDistDir, { recursive: true });
      }

      // https://github.com/vitejs/vite/blob/a8fa9cc704bb9a697975e95179dfe21ab4e1d8de/packages/plugin-legacy/src/index.ts#L718
      const polyfillId = '\0vite/legacy-polyfills';
      let polyfillChunks: OutputChunk[] = [];
      const tempFiles: string[] = [];
      let entryChunks: OutputChunk[] = [];
      for (const [k, chunk] of Object.entries(esmBundle)) {
        if (chunk.type == 'asset') {
          continue;
        }
        const fp = `${cacheDistDir}/${k}`;
        await fs.writeFile(fp, chunk.code, 'utf-8');
        tempFiles.push(fp);
        delete esmBundle[k];
        if (chunk.isEntry) {
          if (chunk.facadeModuleId == polyfillId) {
            polyfillChunks.push(chunk);
          } else {
            entryChunks.push(chunk);
          }
        }
      }
      if (polyfillChunks) {
        entryChunks.unshift(...polyfillChunks);
      }
      if (entryChunks.length == 0) {
        throw new Error(`not found entry chunk`);
      }
      finalOption.hasDynamicImport = entryChunks.some(
        (e) => e.dynamicImports.length > 0,
      );
      let entry = `${cacheDistDir}/__entry.js`;
      if (entryChunks.length == 1) {
        entry = `${cacheDistDir}/${entryChunks[0].fileName}`;
      } else {
        tempFiles.push(entry);
        await fs.writeFile(
          entry,
          entryChunks
            .map((a) => `import ${JSON.stringify(`./${a.fileName}`)};`)
            .join('\n'),
          'utf-8',
        );
      }
      const buildResult = (await build({
        logLevel: 'error',
        configFile: false,
        esbuild: false,
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
            entry: entry,
            formats: [finalOption.useSystemJs ? 'system' : 'iife'] as any,
            name: finalOption.useSystemJs ? undefined : '__expose__',
            fileName: () => `__entry.js`,
          },
        },
      })) as RollupOutput[];

      // clear tempFiles
      // await fs.rm(cacheDistDir, { recursive: true });

      const finalBundle = Object.assign({}, esmBundle, buildResult[0].output);
      let finalJsCode = ``;
      if (finalOption.useSystemJs) {
        const codes: string[] = [];
        let entryName = `__entry.js`;
        Object.entries(finalBundle).forEach(([k, asset]) => {
          if (asset.type == 'chunk') {
            const name = JSON.stringify(`./` + asset.fileName);
            codes.push(
              asset.code
                .trimStart()
                .replace(/^System\.register\(/, `System.register(${name}, `),
            );
            if (asset.isEntry) {
              entryName = name;
            }
          }
        });
        codes.push(`System.import(${entryName}, "./");`);
        finalJsCode = codes.join('\n');
        const usedModuleIds = Array.from(this.getModuleIds()).filter(
          (d) => d in finalOption.globalsPkg2VarName,
        );
        const imports = usedModuleIds.reduce((p: Record<string, string>, c) => {
          p[c] = `x:` + c;
          return p;
        }, {});
        // inject SystemJs external globals
        finalJsCode = [
          Object.keys(imports).length > 0
            ? `System.addImportMap({ imports: ${JSON.stringify(imports)} });`
            : ``,
          ...usedModuleIds.map(
            (id) =>
              `System.set(${JSON.stringify(`x:` + id)}, ${
                finalOption.globalsPkg2VarName[id]
              });`,
          ),
          '\n' + finalJsCode,
        ]
          .filter((s) => s)
          .join('\n');
        // TODO or use inline code
        finalOption.collectRequireUrls.push(...systemjsRequireUrls);
      } else {
        // use iife
        Object.entries(finalBundle).forEach(([k, asset]) => {
          if (asset.type == 'chunk' && asset.isEntry) {
            finalJsCode = asset.code;
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
