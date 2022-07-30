import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          // '': 'default_name', // if not set, will get from package.json
          ja: 'hentai',
          zh: '默认名字',
        },
        namespace: 'https://github.com/lisonge',
        version: '1.0.1',
        icon: 'https://vitejs.dev/logo.svg',
        description: {
          '': 'default description zh', // if not set, will get from package.json
          zh: '描述',
          en: 'description',
          ja: '説明z',
          'zh-CN': '描述',
        },
        match: ['https://i.songe.li/', 'https://lisonge.com/'],
        grant: ['GM.addElement'],
        $extra: {
          grant: ['GM_cookie'],
        },
      },
      build: {
        externalGlobals: {
          'blueimp-md5': cdn.jsdelivr('md5'),
        },
      },
    }),
    ViteRestart({
      restart: ['../../src/index.ts'],
    }),
  ],
  build: {
    // if you want to minify xxx.user.js, set true
    // minify: true,
  },
}));
