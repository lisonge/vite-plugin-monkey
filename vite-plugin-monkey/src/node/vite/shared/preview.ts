import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import { walk } from '../../utils/others.ts';
import { fcToHtml, installationTemplate } from '../../runtime/templates.ts';

export const previewFactory = (): Plugin => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:preview',
    apply: 'serve',
    configResolved(config) {
      viteConfig = config;
    },
    async configurePreviewServer(server) {
      const base = viteConfig.base;
      server.middlewares.use(async (req, res, next) => {
        try {
          if (
            [base, base + 'index.html'].includes((req.url ?? '').split('?')[0])
          ) {
            const distDirPath = path.resolve(
              viteConfig.root,
              viteConfig.build.outDir,
            );
            const urls: string[] = [];
            for await (const pathname of walk(distDirPath)) {
              if (pathname.endsWith('.user.js')) {
                const fileName = normalizePath(
                  path.relative(distDirPath, pathname),
                );
                urls.push(
                  base + fileName.split('/').map(encodeURIComponent).join('/'),
                );
              }
            }
            res.setHeader('content-type', 'text/html; charset=utf-8');
            res.end(fcToHtml(installationTemplate, urls));
            return;
          }
          next();
        } catch (error) {
          next(error);
        }
      });
    },
  };
};
