import type { Plugin } from 'vite';
import type { FinalMonkeyOption } from '../types';

export const fixViteClientPlugin = (_: FinalMonkeyOption): Plugin => {
  return {
    name: 'monkey:fixViteClient',
    apply: 'serve',
    async transform(code, id) {
      if (id.endsWith('node_modules/vite/dist/client/client.mjs')) {
        // use import.meta['url'] instead of import.meta.url, because vite will replace import.meta.url to file system path

        // https://github.com/vitejs/vite/blob/v6.0.0/packages/vite/src/client/client.ts
        code = code.replace(
          /__BASE__/g,
          `((()=>{const b = __BASE__; const u = new URL(import.meta['url'], location.origin); return b !== '/' ? b : (u.origin+'/');})())`,
        );
        return code;
      }
    },
  };
};
