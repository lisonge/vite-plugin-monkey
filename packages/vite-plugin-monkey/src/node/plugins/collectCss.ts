import { PluginOption, ResolvedConfig } from 'vite';
import { miniCode } from '../_util';
import { cssInjectFn, fn2string } from '../inject_template';
import type { FinalMonkeyOption } from '../types';

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
      const cssList: string[] = [];
      Object.entries(esmBundle).forEach(([k, v]) => {
        if (v.type == 'asset' && k.endsWith('.css')) {
          cssList.push(v.source.toString());
          delete esmBundle[k];
        }
      });
      if (cssList.length > 0) {
        let css = cssList.join('').trim();
        finalOption.injectCssCode = await miniCode(
          fn2string(cssInjectFn, '\x20' + css + '\x20'),
          // use \x20 to compat unocss, see https://github.com/lisonge/vite-plugin-monkey/issues/45
          'js',
        );
      }
    },
  };
};
