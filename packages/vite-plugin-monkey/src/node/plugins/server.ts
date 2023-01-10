import detectPort from 'detect-port';
import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizePath, PluginOption, ResolvedConfig } from 'vite';
import { fn2string, mountGmApiFn, serverInjectFn } from '../inject_template';
import { openBrowser } from '../open_browser';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import { lazy } from '../_lazy';
import { logger } from '../_logger';
import { existFile, isFirstBoot } from '../_util';

export const installUserPath = '/__vite-plugin-monkey.install.user.js';
const gmApiPath = '/__vite-plugin-monkey.gm.api.js';
const entryPath = '/__vite-plugin-monkey.entry.js';
const pullPath = '/__vite-plugin-monkey.pull.js';
const cacheUserPath = 'node_modules/.vite/__vite-plugin-monkey.cache.user.js';

export default (finalPluginOption: FinalMonkeyOption): PluginOption => {
  let viteConfig: ResolvedConfig;
  const serverConfig = lazy(() => {
    let availablePort = 5173;
    detectPort(availablePort).then((p) => {
      availablePort = p;
    });
    return {
      get isHttps() {
        return !!viteConfig.server.https;
      },
      get port() {
        return viteConfig.server.port ?? availablePort;
      },
      get host() {
        if (
          typeof viteConfig.server.host == 'string' &&
          viteConfig.server.host != '0.0.0.0'
        ) {
          return viteConfig.server.host;
        }
        return '127.0.0.1';
      },
      get origin() {
        return `${this.isHttps ? 'https' : 'http'}://${this.host}:${this.port}`;
      },
      get installUrl() {
        return new URL(viteConfig.base, this.origin).href;
      },
    };
  });
  return {
    name: 'monkey:server',
    apply: 'serve',
    async config(userConfig, { command }) {
      return {
        preview: {
          host: userConfig.preview?.host ?? '127.0.0.1',
          cors: true,
        },
        server: {
          open: userConfig.server?.open ?? finalPluginOption.server.open,
          cors: true,
        },
      };
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      const { server } = viteConfig;
      server.host = serverConfig.host;
      server.port = serverConfig.port;
      server.origin = serverConfig.origin;
      const baseConfig = {
        host: serverConfig.host,
        protocol: serverConfig.isHttps ? 'wss' : 'ws',
      };
      if (server.hmr === undefined && server.hmr === true) {
        server.hmr = baseConfig;
      } else if (server.hmr && typeof server.hmr == 'object') {
        Object.assign(server.hmr, baseConfig);
      }
    },
    async configureServer(server) {
      const { userscript } = finalPluginOption;

      let prefix = finalPluginOption.server.prefix;
      if (typeof prefix == 'function') {
        for (const [k, v] of Object.entries(userscript.name)) {
          Reflect.set(userscript.name, k, prefix(v));
        }
      }

      // support dev env
      finalPluginOption.userscript.grant.add('*');

      server.middlewares.use(async (req, res, next) => {
        let realHost = req.headers[':authority'] ?? req.headers['host'];
        if (realHost instanceof Array) {
          realHost = realHost[0];
        }
        if (!realHost) {
          logger.error('host not found', { time: true });
          return next();
        }
        const origin = `${
          serverConfig.isHttps ? 'https' : 'http'
        }://${realHost}`;

        if (req.url?.startsWith(installUserPath)) {
          const u = new URL(req.url, origin);
          // if the request is forwarded by some gateways like stackblitz.com, then window.location.host will be not equal to viteServer.req.headers.host
          let overrideOrigin = u.searchParams.get('origin');
          if (overrideOrigin) {
            try {
              overrideOrigin = new URL(overrideOrigin).origin;
            } catch {
              overrideOrigin = origin;
            }
          } else {
            overrideOrigin = origin;
          }

          res.end(
            [
              await finalMonkeyOptionToComment(finalPluginOption),
              fn2string(serverInjectFn, {
                entrySrc: new URL(entryPath, overrideOrigin).href,
              }),
              '',
            ].join('\n\n'),
          );
        } else if (req.url?.startsWith(pullPath)) {
          Object.entries({
            'access-control-allow-origin': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          const u = new URL(req.url, origin);
          const text = u.searchParams.get('text') ?? '';
          res.end(Buffer.from(text, 'base64url').toString('utf-8'));
        } else if (req.url?.startsWith(entryPath)) {
          Object.entries({
            'access-control-allow-origin': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          const htmlText = await server.transformIndexHtml(
            '/',
            `<html><head></head></html>`,
            req.originalUrl,
          );

          const doc = parseDocument(htmlText);
          type Element = ReturnType<typeof DomUtils.findAll> extends Array<
            infer T
          >
            ? T
            : never;
          const scriptList = DomUtils.getElementsByTagType(
            ElementType.Script,
            doc,
          ) as Element[];

          const entryList: string[] = finalPluginOption.server.mountGmApi
            ? [gmApiPath]
            : [];
          entryList.push(
            ...scriptList.map((p) => {
              const src = p.attribs.src ?? '';
              const textNode = p.firstChild;
              let text = '';
              if (textNode?.type == ElementType.Text) {
                text = textNode.data ?? '';
              }
              if (src) {
                return src;
              } else {
                const u = new URL(origin);
                u.pathname = pullPath;
                u.searchParams.set(
                  'text',
                  Buffer.from(text, 'utf-8').toString('base64url'),
                );
                return u.pathname + u.search;
              }
            }),
          );

          let realEntry = finalPluginOption.entry;
          if (path.isAbsolute(realEntry)) {
            realEntry = normalizePath(
              path.relative(viteConfig.root, realEntry),
            );
          }
          const entryUrl = new URL(realEntry, origin);
          entryList.push(entryUrl.pathname + entryUrl.search);
          res.end(
            entryList.map((s) => `import ${JSON.stringify(s)};`).join('\n'),
          );
        } else if (req.url?.startsWith(gmApiPath)) {
          Object.entries({
            'access-control-allow-origin': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          if (finalPluginOption.server.mountGmApi) {
            res.end(fn2string(mountGmApiFn));
          } else {
            res.end('');
          }
        } else {
          next();
        }
      });

      if (finalPluginOption.server.open) {
        let cacheComment = '';
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch();
        }
        const newComment = await finalMonkeyOptionToComment(finalPluginOption);
        if (!isFirstBoot() && cacheComment != newComment) {
          openBrowser(serverConfig.installUrl, true, logger);
          logger.info('reopen, config comment has changed', { time: true });
        }
        await fs.writeFile(cacheUserPath, newComment).catch();
      }
    },
  };
};
