import type { Plugin } from 'vite';
import { installationTemplate, fcToHtml } from '../../runtime/templates.ts';
import { installUserPath } from './server.ts';

export const virtualHtmlFactory = (): Plugin => {
  let base = '/';
  return {
    name: 'monkey:virtualHtml',
    apply: 'serve',
    configResolved(config) {
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '/').split('?')[0];
        if (['/', '/index.html', base, base + 'index.html'].includes(url)) {
          res.setHeader('content-type', 'text/html');
          res.setHeader('cache-control', 'no-cache');
          res.setHeader('access-control-allow-origin', '*');
          return res.end(
            fcToHtml(
              installationTemplate,
              [base + installUserPath.slice(1)],
              true,
            ),
          );
        }
        next();
      });
    },
  };
};
