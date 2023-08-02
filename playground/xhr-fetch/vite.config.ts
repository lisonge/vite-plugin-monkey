import { defineConfig } from 'vite';
import monkey, { util } from './node_modules/vite-plugin-monkey/src/node/index';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://i.songe.li/*'],
        connect: [`httpbin.org`, `i.pximg.net`],
      },
    }),
  ],
});
