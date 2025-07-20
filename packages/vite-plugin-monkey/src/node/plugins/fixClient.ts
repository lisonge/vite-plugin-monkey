import type { Plugin } from 'vite';

export const fixClientFactory = (): Plugin => {
  return {
    name: 'monkey:fixClient',
    apply: 'serve',
    async transform(code, id) {
      if (id.endsWith('node_modules/vite/dist/client/client.mjs')) {
        // https://github.com/vitejs/vite/blob/main/packages/vite/src/client/client.ts
        // https://cdn.jsdelivr.net/npm/vite@latest/dist/client/client.mjs
        return code.replaceAll(
          '__BASE__',
          `new URL(__BASE__ || '/', import.meta['url']).href`,
        );
      }
    },
  };
};
