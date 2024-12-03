import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      format: {
        generate(uOptions) {
          return uOptions.userscript + `\n// hello`;
        },
      },
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/*'],
      },
      build: {
        metaFileName: true,
        // cssSideEffects: (css) => `GM_addStyle(${JSON.stringify(css)});`,
      },
    }),
  ],
  build: {
    target: 'chrome80',
  },
});
