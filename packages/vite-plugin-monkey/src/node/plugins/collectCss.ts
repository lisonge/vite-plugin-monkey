import { PluginOption, ResolvedConfig, transformWithEsbuild } from 'vite';
import { cssInjectFn, fn2string } from '../inject_template';
import type { FinalMonkeyOption } from '../types';
import { getFinalTarget, miniCode } from '../_util';

export const collectCssPlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
  let viteConfig: ResolvedConfig;

  return {
    name: 'monkey:collectCss',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      viteConfig = config;
    },
    async generateBundle(_, esmBundle) {
      const cssBundleList = Object.entries(esmBundle).filter(([k]) =>
        k.endsWith('.css'),
      );
      const cssList: string[] = [];
      cssBundleList.forEach(([k, v]) => {
        if (v.type == 'asset') {
          cssList.push(v.source.toString());
          delete esmBundle[k];
        }
      });
      if (cssList.length > 0) {
        let css = cssList.join('');
        if (!viteConfig.build.minify && finalOption.build.minifyCss) {
          const { cssTarget, target } = viteConfig.build;
          const finalCssTarget = getFinalTarget(cssTarget || target || []);
          css = (
            await transformWithEsbuild(css, 'any_name.css', {
              sourcemap: false,
              legalComments: 'none',
              minify: true,
              target: finalCssTarget,
            })
          ).code.trimEnd();
        }
        finalOption.injectCssCode = await miniCode(
          fn2string(cssInjectFn, '\x20' + css + '\x20'),
          // use \x20 to compat unocss, see https://github.com/lisonge/vite-plugin-monkey/issues/45
          // TODO check the order of plugin-monkey is last in vite plugin list, if not, logger warn message
          'js',
        );
      }
    },
  };
};
