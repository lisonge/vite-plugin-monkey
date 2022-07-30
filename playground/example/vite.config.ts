import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          // '': 'default_name', // if not set, will get from package.json
          ja: 'hentai',
          zh: '测试_',
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
        match: ['https://i.songe.li/'],
        grant: ['GM.addElement', 'GM_openInTab'],
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
  ],
  build: {
    // if you want to minify xxx.user.js, set true
    // minify: true,
  },
}));
