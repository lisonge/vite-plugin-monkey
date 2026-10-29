import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey, { npmCdn } from 'vite-plugin-monkey';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/*'],
      },
      dependencies: {
        preact: {
          kind: 'global',
          global: 'preact',
          urls: [npmCdn({ path: 'dist/preact.min.js' })],
        },
      },
    }),
  ],
});
