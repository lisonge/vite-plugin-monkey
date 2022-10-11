import path from 'node:path';
import fs from 'node:fs/promises';
import type { PluginOption, ResolvedConfig } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { fn2string, redirectFn } from '../inject_template';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:perview',
    apply: 'serve',
    configResolved(config) {
      viteConfig = config;
    },
    async configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (['/', '/index.html'].includes((req.url ?? '').split('?')[0])) {
          const [fileName] = (
            await fs.readdir(path.join(process.cwd(), viteConfig.build.outDir))
          ).filter((name) => name.endsWith('.user.js'));
          if (fileName) {
            Object.entries({
              'content-type': 'text/html; charset=utf-8',
            }).forEach(([k, v]) => {
              res.setHeader(k, String(v));
            });
            res.end(
              `<script type="module" data-source="vite-plugin-monkey">${fn2string(
                redirectFn,
                '/' + fileName,
              )}</script>`,
            );
            return;
          }
        }
        next();
      });
    },
  };
};
