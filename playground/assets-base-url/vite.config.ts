import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  publicDir: false,
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'assetsBaseUrl playground',
        namespace: 'https://github.com/lisonge',
        match: ['https://songe.li/*'],
      },
      build: {
        assetsBaseUrl: 'http://localhost:4173/',
        metaFileName: true,
      },
    }),
  ],
  server: { host: 'localhost', port: 5173, strictPort: true },
  preview: { host: 'localhost', port: 4173, strictPort: true },
});
