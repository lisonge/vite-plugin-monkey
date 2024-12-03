import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'https://github.com/lisonge',
        icon: 'https://vitejs.dev/logo.svg',
        match: 'https://songe.li/*',
        description: 'default_description',
      },
      build: {
        externalGlobals: {
          vue: cdn
            .jsdelivr('Vue', 'dist/vue.global.prod.js')
            .concat(util.dataUrl(`;window.Vue=Vue;`)),
          'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
        },
        externalResource: {
          'animate.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
}));
