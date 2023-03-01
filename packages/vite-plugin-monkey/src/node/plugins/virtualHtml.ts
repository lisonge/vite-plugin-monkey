import type { PluginOption } from 'vite';
import { fn2string, redirectFn } from '../inject_template';
import type { FinalMonkeyOption } from '../types';
import { installUserPath } from './server';

const htmlText = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://vitejs.dev/logo.svg" />
    <title>Vite</title>
  </head>
  <script type="module" data-source="vite-plugin-monkey">
  ${fn2string(redirectFn, installUserPath).trim()}
  </script>
</html>
`.trimStart();

// https://github.com/vitejs/vite/blob/2401253b9aa487c50edb5ec571d5ba7adc949e27/packages/vite/src/node/server/middlewares/indexHtml.ts#L275

export const virtualHtmlPlugin = (
  finalOption: FinalMonkeyOption,
): PluginOption => {
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
          return res.end(htmlText);
        }
        next();
      });
    },
  };
};
