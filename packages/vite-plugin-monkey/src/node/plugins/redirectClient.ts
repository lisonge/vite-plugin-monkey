import type { Plugin } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { gmIdentifiers } from '../gm_api';

// https://github.com/Tampermonkey/tampermonkey/issues/1567
const clientSourceId = 'vite-plugin-monkey/dist/client';
const clientId = '\0vite-plugin-monkey/dist/client';
export const redirectClientPlugin = (_: FinalMonkeyOption): Plugin => {
  return {
    name: 'monkey:redirectClient',
    enforce: 'pre',
    apply: 'build',
    resolveId(source) {
      if (source === clientSourceId) {
        return clientId;
      }
    },
    load(id) {
      if (id == clientId) {
        const identifiers = ['GM', ...gmIdentifiers, 'unsafeWindow'];
        // https://github.com/evanw/esbuild/issues/2267#issuecomment-1138445856
        const declarations = identifiers
          .map((v) => {
            return `var _${v} = /* @__PURE__ */ (() => typeof ${v} != "undefined" ? ${v} : void 0)();`;
          })
          .concat('var _monkeyWindow = /* @__PURE__ */ (() => window)();');
        const exportIdentifiers = identifiers.concat('monkeyWindow');
        return (
          declarations.join('\n') +
          `\nexport {${exportIdentifiers
            .map((v) => `  _${v} as ${v},`)
            .join('\n')}};`
        );
      }
    },
  };
};
