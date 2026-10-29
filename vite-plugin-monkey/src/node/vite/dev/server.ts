import type { ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import { finalMonkeyOptionToComment } from '../../metadata/index.ts';
import {
  existFile,
  parserHtmlScriptResult,
  safeURL,
  simpleHash,
  stringifyFunction,
} from '../../utils/others.ts';
import { serverInjectFn } from '../../runtime/templates.ts';
import type { MonkeyContext } from '../../utils/types.ts';

const urlPrefix = '/__vite-plugin-monkey.';
export const installUserPath = urlPrefix + 'install.user.js';
const entryPath = urlPrefix + 'entry.js';
const pullPath = urlPrefix + 'pull.js';

const localHost = '127.0.0.1';
const localOrigin = `http://${localHost}`;
const htmlPlaceholder = '<html><head></head><body></body></html>';
const configModuleId = 'virtual:monkey-config';
const resolvedConfigModuleId = '\0' + configModuleId;

export const serverFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let viteConfig: ResolvedConfig;
  let monkeyWindowKey = '';
  let bridgeProject = '';
  const bridgeVersion = 1;
  return {
    name: 'monkey:server',
    apply: 'serve',
    async resolveId(source) {
      if (source === configModuleId) return resolvedConfigModuleId;
      if (source !== '$') return;
      // Workspace loads this file directly; the published plugin is bundled
      // into dist/node/index.mjs with its browser runtime in dist/client.
      const sourceEntry = fileURLToPath(
        new URL('../../../client/index.ts', import.meta.url),
      );
      return normalizePath(
        (await existFile(sourceEntry))
          ? sourceEntry
          : fileURLToPath(new URL('../client/index.js', import.meta.url)),
      );
    },
    load(id) {
      if (id === resolvedConfigModuleId) {
        return `export const monkeyWindowKey = ${JSON.stringify(monkeyWindowKey)}; export const bridgeVersion = ${bridgeVersion}; export const bridgeProject = ${JSON.stringify(bridgeProject)};`;
      }
    },
    config: {
      order: 'post',
      async handler(userConfig) {
        context = await getContext(userConfig.root);
        // Installed userscripts outlive Vite instances and config reloads.
        // The absolute entry identifies the project without changing on restart.
        bridgeProject = normalizePath(context.config.entry);
        monkeyWindowKey = `__monkeyWindow-${simpleHash(
          normalizePath(context.config.entry),
        )}`;
        return {
          optimizeDeps: {
            exclude: ['$', configModuleId],
          },
          preview: {
            host: userConfig.preview?.host ?? localHost,
            cors: true,
          },
          server: {
            host: userConfig.server?.host ?? localHost,
            cors: true,
          },
        };
      },
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async configureServer(server) {
      // https://github.com/lisonge/vite-plugin-monkey/issues/205
      server.middlewares.use((_, res, next) => {
        const name = 'access-control-allow-private-network';
        if (!res.hasHeader(name)) {
          res.setHeader(name, 'true');
        }
        next();
      });

      const setScriptHeader = (res: ServerResponse) => {
        res.setHeader('access-control-allow-origin', '*');
        res.setHeader('content-type', 'application/javascript');
      };

      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.method !== 'GET' || !req.url) return next();
          const url = new URL(req.url, localOrigin);
          if (url.pathname.startsWith(viteConfig.base))
            url.pathname = '/' + url.pathname.slice(viteConfig.base.length);
          if (!url.pathname.startsWith(urlPrefix)) return next();
          if (url.pathname === installUserPath) {
            setScriptHeader(res);
            const origin =
              safeURL(url.searchParams.get('origin'))?.origin ||
              (() => {
                const host = ((h) => {
                  return typeof h === 'string'
                    ? h !== '0.0.0.0'
                      ? h
                      : localHost
                    : localHost;
                })(viteConfig.server.host);
                return `${viteConfig.server.https ? 'https' : 'http'}://${req.headers.host ?? `${host}:${viteConfig.server.port}`}`;
              })();
            res.end(
              [
                finalMonkeyOptionToComment(context, new Set(), 'serve'),
                stringifyFunction(
                  serverInjectFn,
                  new URL(viteConfig.base + entryPath.slice(1), origin).href,
                  monkeyWindowKey,
                  bridgeVersion,
                  bridgeProject,
                ),
                '',
              ].join('\n\n'),
            );
          } else if (url.pathname === entryPath) {
            setScriptHeader(res);
            const html = await server.transformIndexHtml(
              '/',
              htmlPlaceholder,
              req.originalUrl,
            );
            const results = parserHtmlScriptResult(html);
            const entryUrls: string[] = results.map((v) => {
              return (
                v.src ||
                `${viteConfig.base}${pullPath.slice(1)}?text=${Buffer.from(v.text, 'utf-8').toString('base64url')}`
              );
            });
            const relativeEntry = normalizePath(
              path.relative(viteConfig.root, context.config.entry),
            );
            const entryUrl =
              relativeEntry === '..' ||
              relativeEntry.startsWith('../') ||
              path.isAbsolute(relativeEntry)
                ? path.posix.join('@fs', normalizePath(context.config.entry))
                : relativeEntry;
            entryUrls.push(
              viteConfig.base +
                encodeURI(entryUrl).replace(/[?#]/g, encodeURIComponent),
            );
            res.end(
              entryUrls
                .map(
                  (s) =>
                    `await import(new URL(${JSON.stringify(s)}, import.meta.url).href);`,
                )
                .join('\n'),
            );
          } else if (url.pathname === pullPath) {
            setScriptHeader(res);
            res.end(
              Buffer.from(
                url.searchParams.get('text') ?? '',
                'base64url',
              ).toString('utf-8'),
            );
          } else {
            next();
          }
        } catch (error) {
          next(error);
        }
      });
    },
  };
};
