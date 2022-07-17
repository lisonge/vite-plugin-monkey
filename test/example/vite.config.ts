import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import CustomPlugin from '../../src/index';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    CustomPlugin({
      entry: 'src/main.ts',
      userscript: {
        name: {
          '': 'default_name',
          ja: 'hentai',
          zh: '默认名字',
        },
        namespace: 'https://github.com/lisonge',
        version: '1.0.1',
        icon: 'https://vitejs.dev/logo.svg',
        description: {
          '': 'default description zh',
          zh: '描述',
          en: 'description',
          ja: '説明z',
          'zh-CN': '描述',
        },
        match: ['https://i.songe.li/*', 'https://lisonge.com/*'],
        // 'run-at': 'document-start',
        // $extra: {
        //   note: ['2017.05.12-V8.4z', '2017.05.05-V8.3'],
        // },
      },
      // server: {
      //   open: false,
      // },
      build: {
        externalGlobals: {
          'blueimp-md5': [
            'md5',
            (version, name) =>
              `https://cdn.jsdelivr.net/npm/${name}@${version}/js/md5.min.js`,
          ],
        },
      },
    }),
    ViteRestart({
      restart: ['../../src/index.ts'],
    }),
  ],
}));
