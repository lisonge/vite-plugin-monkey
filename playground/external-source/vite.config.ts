import { defineConfig } from 'vite';
import monkey, { cdn, util } from 'vite-plugin-monkey';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'https://github.com/lisonge',
        icon: 'https://vitejs.dev/logo.svg',
        match: 'https://i.songe.li/',
        description: 'default_description',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
            await util.encodeFn(() => {
              // @ts-ignore
              window.Vue = Vue;
            }, []),
          ),
          'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
          'animate.css': cdn.bootcdn(),
          'element-plus/package.json': cdn.elemecdn(),
          'base64-img/test/img/car.svg': cdn.unpkg(),
          'base64-img/test/img/car.svg?url': cdn.jsdelivr(),
          'base64-img/test/img/car.svg?raw': cdn.jsdelivr(),
        },
      },
    }),
  ],
}));
