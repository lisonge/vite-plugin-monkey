import path from 'node:path';
import type { PluginOption } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { existFile } from '../_util';

const htmlText = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://vitejs.dev/logo.svg" />
    <title>Vite</title>
  </head>
</html>
`.trimStart();

// https://github.com/vitejs/vite/blob/2401253b9aa487c50edb5ec571d5ba7adc949e27/packages/vite/src/node/server/middlewares/indexHtml.ts#L275

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let hasHtml = false;
  return {
    name: 'monkey:virtualHtml',
    apply: 'serve',
    async configResolved(config) {
      const htmlPathList = [path.join(config.root, 'index.html')];
      if (typeof config.publicDir == 'string') {
        htmlPathList.push(
          path.join(config.root, config.publicDir, 'index.html'),
        );
      }
      for (const htmlPath of htmlPathList) {
        if (await existFile(htmlPath)) {
          hasHtml = true;
          return;
        }
      }
    },
    configureServer(server) {
      if (hasHtml) {
        return;
      }
      server.middlewares.use(async (req, res, next) => {
        if (res.writableEnded) {
          return next();
        }
        const url = req.url || '/';
        if (['/', '/index.html'].includes(url)) {
          try {
            res.statusCode = 200;
            const html = await server.transformIndexHtml(
              url,
              htmlText,
              req.originalUrl,
            );
            res.setHeader('content-type', 'text/html');
            res.setHeader('cache-control', 'no-cache');
            res.setHeader('access-control-allow-origin', '*');
            return res.end(html);
          } catch (e) {
            return next(e);
          }
        }
        next();
      });
    },
  };
};
