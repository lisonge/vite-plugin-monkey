import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import vue from '@vitejs/plugin-vue';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'https://github.com/lisonge',
        icon: 'https://vitejs.dev/logo.svg',
        match: 'https://songe.li/',
        description: 'default_description',
      },
      build: {
        externalGlobals: [
          [
            'vue',
            cdn
              .jsdelivr('Vue', 'dist/vue.global.prod.js')
              .concat(
                cdn.jsdelivr('', 'lib/index.iife.js')[1]('latest', 'vue-demi'),
              )
              .concat(
                await util.fn2dataUrl(() => {
                  // @ts-ignore
                  window.Vue = Vue; // work with element-plus
                }),
              ),
          ],
          ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
          [
            'element-plus',
            cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
          ],
        ],
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
}));
