import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: [
          'https://www.google.com/',
          'https://github.com/*',
          'https://songe.li/*',
        ],
      },
      build: {
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
          'element-plus/dist/index.css?url': cdn.jsdelivr(),
        },
      },
    }),
  ],
});
