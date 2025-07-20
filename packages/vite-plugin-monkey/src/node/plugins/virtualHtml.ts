import type { Plugin } from 'vite';
import { virtualHtmlTemplate, fcToHtml } from '../utils/template';
import { installUserPath } from './server';

export const virtualHtmlFactory = (): Plugin => {
  return {
    name: 'monkey:virtualHtml',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '/';
        if (['/', '/index.html'].includes(url)) {
          res.setHeader('content-type', 'text/html');
          res.setHeader('cache-control', 'no-cache');
          res.setHeader('access-control-allow-origin', '*');
          return res.end(fcToHtml(virtualHtmlTemplate, installUserPath));
        }
        next();
      });
    },
  };
};
