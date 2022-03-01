import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';
import CustomPlugin from '../../src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    CustomPlugin({
      entry: 'src/main.ts',
      userscript: {
        author: 'lisonge',
        name: 'op-wiki-plus',
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
        align: 2,
        extra: {
          note: ['2017.05.12-V8.4z', '2017.05.05-V8.3'],
        },
      },
      server: {
        open: true,
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
