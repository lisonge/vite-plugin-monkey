import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { npmCdn } from 'vite-plugin-monkey';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/*'],
      },
      dependencies: {
        vue: {
          kind: 'global',
          global: 'Vue',
          urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
        },
      },
    }),
  ],
});
