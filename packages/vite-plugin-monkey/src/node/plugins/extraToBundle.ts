import path from 'node:path';
import type { PluginOption, ResolvedConfig } from 'vite';
import { cssInjectFn, fn2string } from '../inject_template';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import { miniCode } from '../_util';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:extraToBundle',
    apply: 'build',
    enforce: 'post',
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async generateBundle(_, bundle) {
      const bundleList = Object.entries(bundle);
      const cssBundleList = bundleList.filter(([k]) => k.endsWith('.css'));
      const jsBundleList = bundleList.filter(([k]) => k.endsWith('.js'));
      const cssList: string[] = [];
      cssBundleList.forEach(([k, v]) => {
        if (v.type == 'asset') {
          cssList.push(v.source.toString());
          delete bundle[k];
        }
      });
      let injectCssCode: undefined | string = undefined;
      if (cssList.length > 0) {
        let css = cssList.join('');
        if (!viteConfig.build.minify && finalPluginOption.build.minifyCss) {
          css = await miniCode(css, 'css');
        }
        injectCssCode = await miniCode(fn2string(cssInjectFn, css), 'js');
      }
      const chunk = jsBundleList[0][1];
      if (chunk.type == 'chunk') {
        const bannerCode = [
          await finalMonkeyOptionToComment(finalPluginOption),
          injectCssCode,
        ]
          .filter((s) => s)
          .map((s) => s + `\n\n`)
          .join(``);
        // @require @resouse 会导致 map 映射错误, 这需要外部传入额外的偏移量
        let { offset } = finalPluginOption.build.sourcemap;
        for (const char of bannerCode) {
          if (char == '\n') {
            offset++;
          }
        }
        if (offset < 0) {
          offset = 0;
        }
        const { map } = chunk;
        if (map) {
          map.mappings = ';'.repeat(offset) + map.mappings;

          let relativeFileList = map.sources
            .map((filepath, i) => ({ filepath, i }))
            .filter(({ filepath }) => !path.isAbsolute(filepath));
          while (
            relativeFileList.every(({ filepath }) => filepath.startsWith('../'))
          ) {
            relativeFileList.forEach((f) => {
              f.filepath = f.filepath.substring(3);
            });
          }
          let relativeMaxNum = 0;
          relativeFileList.forEach(({ filepath }) => {
            let n = 0;
            while (filepath.substring(n * 3).startsWith('../')) {
              n++;
            }
            if (relativeMaxNum < n) {
              relativeMaxNum = n;
            }
          });
          const prefix = '-/'.repeat(relativeMaxNum);
          relativeFileList.forEach(({ filepath, i }) => {
            map.sources[i] = prefix + filepath;
          });
          Reflect.set(
            map,
            'sourceRoot',
            finalPluginOption.build.sourcemap.sourceRoot,
          );
        }
        chunk.code = bannerCode + chunk.code;
      }

      let { metaFileName } = finalPluginOption.build;
      if (metaFileName === true) {
        metaFileName = finalPluginOption.build.fileName.replace(
          /\.user\.js$/,
          '.meta.js',
        );
      }
      if (typeof metaFileName == 'string' && metaFileName.length > 0) {
        this.emitFile({
          type: 'asset',
          fileName: metaFileName,
          source: await finalMonkeyOptionToComment(finalPluginOption),
        });
      }
    },
  };
};
