import { PluginOption, transformWithEsbuild } from 'vite';
import type { FinalMonkeyOption } from '../types';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  return {
    name: 'monkey:fixVite',
    apply: 'serve',
    async transform(code, id) {
      if (id.endsWith('node_modules/vite/dist/client/client.mjs')) {
        // use import.meta['url'] instead of import.meta.url, because vite will replace import.meta.url to file system path
        code = code.replace(
          /__HMR_PROTOCOL__/g,
          `(__HMR_PROTOCOL__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.protocol === 'https:' ? 'wss' : 'ws'})()))`,
        );

        // vite@v3 not need
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L26
        code = code.replace(
          /__HMR_HOSTNAME__/g,
          `(__HMR_HOSTNAME__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.hostname})()))`,
        );

        // vite@v3 not need
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L29
        code = code.replace(
          /__HMR_PORT__/g,
          `(__HMR_PORT__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.prort})()))`,
        );

        code = code.replace(
          /__BASE__/g,
          `((()=>{const b = __BASE__; const u = new URL(import.meta['url'], location.origin); return b !== '/' ? b : (u.origin+'/');})())`,
        );

        // work with vite@3
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L302
        code = code.replace(
          '`${location.protocol}//${hostAndPath}`',
          "`${new URL(import.meta['url'], location.origin).protocol}//${hostAndPath}`",
        );
        return code;
      }
    },
  };
};
