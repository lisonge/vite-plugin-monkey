import { defineConfig } from 'vite';
import monkey from './node_modules/vite-plugin-monkey/src/node/index';

export default defineConfig({
  plugins: [
    monkey({
      entry: './src/main.ts',
      userscript: {
        match: [`https://songe.li`],
      },
    }),
  ],
});
