import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import CustomPlugin from '../../src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    CustomPlugin({
      entry: 'src/main.ts',
      userscript: {
        // author: 'lisonge',
        // name: 'op-wiki-plus',
        namespace: 'https://dev.songe.li',
        version: '1.1.2',
        icon: 'https://vitejs.dev/logo.svg',
        description: {
          '': 'default description zh',
          zh: '描述',
          en: 'description',
          ja: '説明',
          'zh-CN': '描述',
        },
        include: ['https://dev.songe.li/*', /^https:\/\/www\.songe\.li\/.*$/],
        extra: {
          note: ['2017.05.12-V8.4z', '2017.05.05-V8.3'],
        },
      },
      format: {
        align: 2,
      },
      server: {
        open: true,
      },
      build: {
        externalGlobals: {
          'blueimp-md5': [
            'md5',
            (version) =>
              `https://cdn.jsdelivr.net/npm/blueimp-md5@${version}/js/md5.min.js`,
          ],
        },
      },
    }),
    ViteRestart({
      restart: ['../../src/index.ts'],
    }),
  ],
  server: {
    https: {
      cert: 'cert.pem',
      key: 'key.pem',
    },
  },
});
