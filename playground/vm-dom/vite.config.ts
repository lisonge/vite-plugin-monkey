import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  esbuild: {
    jsxInject: `import * as VM from '@violentmonkey/dom';`,
    jsxFactory: 'VM.h',
    jsxFragment: 'VM.Fragment',
    jsx: 'transform',
  },
  plugins: [
    monkey({
      entry: './src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://i.songe.li/*'],
        connect: [`httpbin.org`, `i.pximg.net`],
      },
      build: {
        externalGlobals: {
          '@violentmonkey/dom': cdn.jsdelivr(`VM`, `dist/index.js`),
        },
      },
    }),
  ],
});
