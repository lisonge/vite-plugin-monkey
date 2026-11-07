import type { ServerResponse } from 'node:http';
import type { ViteDevServer } from 'vite';
import type { MonkeyContext } from '../config/context.ts';
import type { DevBridge } from './bridge.ts';
import { safeURL } from './urls.ts';
import { installationScript, entryScript } from './scripts.ts';
import {
  urlPrefix,
  installUserPath,
  entryPath,
  pullPath,
  localHost,
} from './paths.ts';

function setScriptHeader(res: ServerResponse) {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('content-type', 'application/javascript');
}

export function attachDevRoutes(
  server: ViteDevServer,
  context: MonkeyContext,
  bridge: DevBridge,
) {
  const config = server.config;
  server.middlewares.use((_, res, next) => {
    const name = 'access-control-allow-private-network';
    if (!res.hasHeader(name)) res.setHeader(name, 'true');
    next();
  });
  server.middlewares.use(async (req, res, next) => {
    try {
      if (req.method !== 'GET' || !req.url) return next();
      const url = new URL(req.url, `http://${localHost}`);
      if (url.pathname.startsWith(config.base))
        url.pathname = '/' + url.pathname.slice(config.base.length);
      if (!url.pathname.startsWith(urlPrefix)) return next();
      if (url.pathname === installUserPath) {
        setScriptHeader(res);
        const host =
          typeof config.server.host === 'string' &&
          config.server.host !== '0.0.0.0'
            ? config.server.host
            : localHost;
        const origin =
          safeURL(url.searchParams.get('origin'))?.origin ||
          `${config.server.https ? 'https' : 'http'}://${req.headers.host ?? `${host}:${config.server.port}`}`;
        res.end(installationScript(context, bridge, config.base, origin));
      } else if (url.pathname === entryPath) {
        setScriptHeader(res);
        const html = await server.transformIndexHtml(
          '/',
          '<html><head></head><body></body></html>',
          req.originalUrl,
        );
        res.end(
          entryScript(html, config.root, context.config.entry, config.base),
        );
      } else if (url.pathname === pullPath) {
        setScriptHeader(res);
        res.end(
          Buffer.from(url.searchParams.get('text') ?? '', 'base64url').toString(
            'utf-8',
          ),
        );
      } else next();
    } catch (error) {
      next(error);
    }
  });
}
