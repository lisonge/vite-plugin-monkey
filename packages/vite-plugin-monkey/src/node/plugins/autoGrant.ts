import type { Plugin } from 'vite';
import { normalizePath } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { GM_keywords } from '../_util';

const GM_keyword_set = Array.from(new Set(GM_keywords));

export const autoGrantPlugin = (finalOption: FinalMonkeyOption): Plugin => {
  const collectGrantMap = new Map<string, string[]>();
  return {
    name: 'monkey:autoGrant',
    apply: 'build',
    enforce: 'post',
    async transform(code, id) {
      id = normalizePath(id);
      if (
        finalOption.build.autoGrant &&
        !id.endsWith('vite-plugin-monkey/dist/client/index.mjs') &&
        !id.endsWith('vite-plugin-monkey/dist/native/index.mjs') &&
        !id.includes('virtual:plugin-monkey-loader')
      ) {
        collectGrantMap.set(
          id,
          GM_keyword_set.filter((fnName) => code.includes(fnName)),
        );
      }
    },
    generateBundle() {
      const idSet = new Set(
        Array.from(this.getModuleIds()).map((s) => normalizePath(s)),
      );
      Array.from(collectGrantMap.keys()).forEach((s) => {
        if (!idSet.has(s)) {
          collectGrantMap.delete(s);
        }
      });
      finalOption.collectGrantSet = new Set(
        Array.from(collectGrantMap.values()).flat(),
      );
    },
  };
};
