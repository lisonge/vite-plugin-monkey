import { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { GM_keywords } from '../_util';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  const GM_keyword_set = new Set(GM_keywords);
  const autoGrantList = new Set<string>();

  return {
    name: 'monkey:autoGrant',
    apply: 'build',
    async transform(code, id) {
      if (
        finalPluginOption.build.autoGrant &&
        GM_keyword_set.size > 0 &&
        !id.endsWith('vite-plugin-monkey/dist/client/index.mjs') &&
        !id.includes('virtual:plugin-monkey-loader')
      ) {
        Array.from(GM_keyword_set)
          .filter((fnName) => code.includes(fnName))
          .forEach((fnName) => {
            finalPluginOption.userscript.grant.add(fnName);
            GM_keyword_set.delete(fnName);
          });
      }
    },
  };
};
