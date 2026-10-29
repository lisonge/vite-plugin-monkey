import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import monkey from 'vite-plugin-monkey';
import { hostPagePlugin, preview, server, userscript } from '../shared.ts';
export default defineConfig({
  plugins: [
    hostPagePlugin(),
    solid(),
    monkey({
      entry: 'src/main.tsx',
      userscript: userscript('Solid'),
      output: { script: 'solid.user.js' },
    }),
  ],
  server,
  preview,
});
