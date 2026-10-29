import { defineConfig } from 'vite';
import monkey, { npmCdn } from 'vite-plugin-monkey';
import { hostPagePlugin, preview, server, userscript } from '../shared.ts';
export default defineConfig(({ mode }) => ({
  plugins: [
    hostPagePlugin(),
    monkey({
      entry: 'src/main.ts',
      userscript: userscript('lab'),
      output: { script: 'lab.user.js', meta: true },
      assets:
        mode === 'external'
          ? { publicPath: 'http://localhost:4173/' }
          : undefined,
      dependencies:
        mode === 'external'
          ? {
              'normalize.css?raw': { kind: 'resource', url: npmCdn() },
              'normalize.css?url': { kind: 'resource', url: npmCdn() },
            }
          : undefined,
    }),
  ],
  server,
  preview,
}));
