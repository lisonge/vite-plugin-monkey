import path from 'node:path';
import type { PluginOption, ResolvedConfig } from 'vite';
import { resolveConfig, transformWithEsbuild } from 'vite';
import { cssInjectFn, fn2string } from '../inject_template';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import { miniCode } from '../_util';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let viteConfig: ResolvedConfig;

  // https://github.com/vitejs/vite/blob/b9511f1ed8e36a618214944c69e2de6504ebcb3c/packages/vite/src/node/constants.ts#L20
  let ESBUILD_MODULES_TARGET = [
    'es2020',
    'edge88',
    'firefox78',
    'chrome87',
    'safari14',
  ];
  return {
    name: 'monkey:extraToBundle',
    apply: 'build',
    enforce: 'post',
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      const { target } = (await resolveConfig({ configFile: false }, 'build'))
        .build;
      if (Array.isArray(target) && target.length > 0) {
        ESBUILD_MODULES_TARGET = target;
      }
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
          let { cssTarget, target } = viteConfig.build;
          if (!cssTarget) {
            cssTarget = target;
          }
          let finalTarget: string | string[] | undefined = undefined;
          if (typeof cssTarget == 'string') {
            if (cssTarget == 'modules') {
              finalTarget = ESBUILD_MODULES_TARGET;
            } else {
              finalTarget = cssTarget;
            }
          } else if (cssTarget && cssTarget instanceof Array) {
            finalTarget = cssTarget;
          }
          css = (
            await transformWithEsbuild(css, 'any_name.css', {
              sourcemap: false,
              legalComments: 'none',
              minify: true,
              target: finalTarget,
            })
          ).code.trimEnd();
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
        // wrap, @require, @resouse will make map error. This requires developers to manually pass the extra offset in the outside
        // The offset of different userscript engines is different
        let { offset, sourceRoot } = finalPluginOption.build.sourcemap;
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
          Reflect.set(map, 'sourceRoot', sourceRoot);
        }
        chunk.code = bannerCode + chunk.code;
      }

      const { metaFileName, fileName } = finalPluginOption.build;
      if (metaFileName) {
        this.emitFile({
          type: 'asset',
          fileName: metaFileName(fileName),
          source: await finalMonkeyOptionToComment(finalPluginOption),
        });
      }
    },
  };
};
