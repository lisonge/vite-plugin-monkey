import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey from 'vite-plugin-monkey';
import { hostPagePlugin, preview, server, userscript } from '../shared.ts';
export default defineConfig({
  plugins: [
    hostPagePlugin(),
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: userscript('React'),
      output: { script: 'react.user.js' },
    }),
  ],
  server,
  preview,
});
