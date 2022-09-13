import { PluginOption, transformWithEsbuild } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { GM_keywords } from '../_util';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  const GM_keyword_set = new Set(GM_keywords);
  const autoGrantList = new Set<string>();

  return {
    name: 'monkey/autoGrant',
    apply: 'build',
    async transform(code, id) {
      if (
        finalPluginOption.build.autoGrant &&
        GM_keyword_set.size > 0 &&
        !id.endsWith('vite-plugin-monkey/dist/client/index.mjs')
      ) {
        Array.from(GM_keyword_set)
          .filter((fnName) => code.includes(fnName))
          .forEach((fnName) => {
            autoGrantList.add(fnName);
            GM_keyword_set.delete(fnName);
          });
      }
    },
    async generateBundle() {
      const { userscript } = finalPluginOption;

      if (autoGrantList.size > 0 && userscript.grant != '*') {
        let tempSet: Set<string>;
        if (typeof userscript.grant == 'string') {
          tempSet = new Set([userscript.grant, ...autoGrantList]);
        } else if (userscript.grant instanceof Array) {
          tempSet = new Set([...userscript.grant, ...autoGrantList]);
        } else {
          tempSet = autoGrantList;
        }
        userscript.grant = Array.from(tempSet) as typeof userscript.grant;
      }
    },
  };
};
