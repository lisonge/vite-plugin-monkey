import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import { walk } from '../_util';
import { fcToHtml, previewTemplate } from '../inject_template';
import type { FinalMonkeyOption } from '../types';

export const perviewPlugin = (finalOption: FinalMonkeyOption): Plugin => {
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
          const distDirPath = path.join(process.cwd(), viteConfig.build.outDir);
          const urls: string[] = [];
          for await (const pathname of walk(distDirPath)) {
            if (pathname.endsWith('.user.js')) {
              const fileName = normalizePath(
                path.relative(distDirPath, pathname),
              );
              urls.push(`/` + fileName);
            }
          }
          res.setHeader('content-type', 'text/html; charset=utf-8');
          res.end(fcToHtml(previewTemplate, urls));
          return;
        }
        next();
        if (finalOption.server.closePreviewAutomatically) {
          setTimeout(() => {
            server.close();
          }, 3000);
        }
      });
    },
  };
};
