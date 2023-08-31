import { defineConfig } from 'vite';
import monkey from './node_modules/vite-plugin-monkey/src/node';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/*'],
      },
      build: {
        // cssSideEffects: (css) => `GM_addStyle(${JSON.stringify(css)});`,
      },
    }),
  ],
  build: {
    target: 'chrome80',
  },
});
