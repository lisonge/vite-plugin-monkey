import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import unocss from 'unocss/vite';
import { presetMini } from 'unocss';

export default defineConfig({
  plugins: [
    vue(),
    unocss({ presets: [presetMini()] }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/*'],
        tag: ['tag1', 'tag2'],
      },
      build: {
        metaFileName: true,
        externalGlobals: {
          vue: cdn.jsdelivr('Vue'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
          'element-plus/dist/index.css?inline': cdn.jsdelivr(),
          'normalize.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
  build: {
    target: 'chrome80',
  },
});
