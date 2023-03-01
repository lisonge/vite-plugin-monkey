import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: true,
    }),
    monkey({
      entry: './src/main.ts',
      userscript: {
        match: [`https://lisonge.com/*`],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
