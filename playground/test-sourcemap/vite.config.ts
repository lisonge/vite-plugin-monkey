import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: './src/main.ts',
      userscript: {
        match: [`https://lisonge.com/*`],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
});
