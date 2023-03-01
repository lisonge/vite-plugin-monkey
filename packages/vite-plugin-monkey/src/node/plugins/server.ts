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
import { existFile, isFirstBoot, toValidURL } from '../_util';

export const installUserPath = '/__vite-plugin-monkey.install.user.js';
const gmApiPath = '/__vite-plugin-monkey.gm.api.js';
const entryPath = '/__vite-plugin-monkey.entry.js';
const pullPath = '/__vite-plugin-monkey.pull.js';
const cacheUserPath = 'node_modules/.vite/__vite-plugin-monkey.cache.user.js';

export const serverPlugin = (finalOption: FinalMonkeyOption): PluginOption => {
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
      get defaultOrigin() {
        return `${this.isHttps ? 'https' : 'http'}://${this.host}:${this.port}`;
      },
      get installUrl() {
        return new URL(viteConfig.base, this.defaultOrigin).href;
      },
    };
  });
  return {
    name: 'monkey:server',
    apply: 'serve',
    async config(userConfig) {
      return {
        preview: {
          host: userConfig.preview?.host ?? '127.0.0.1',
          cors: true,
        },
        server: {
          open: userConfig.server?.open ?? finalOption.server.open,
          cors: true,
        },
      };
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      const { server } = viteConfig;
      server.host = serverConfig.host;
      server.port = serverConfig.port;
      // server.origin = serverConfig.origin;
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
      for (const [k, v] of Object.entries(finalOption.userscript.name)) {
        Reflect.set(
          finalOption.userscript.name,
          k,
          finalOption.server.prefix(v),
        );
      }

      // support dev env
      finalOption.userscript.grant.add('*');

      server.middlewares.use(async (req, res, next) => {
        let viteHost = req.headers[':authority'] ?? req.headers['host'] ?? [];
        if (viteHost instanceof Array) {
          viteHost = viteHost[0];
        }
        if (!viteHost) {
          logger.error('host not found', { time: true });
          return next();
        }
        const viteOrigin = `${
          serverConfig.isHttps ? 'https' : 'http'
        }://${viteHost}`;

        const reqUrl = req.url;
        if (
          reqUrl &&
          [installUserPath, entryPath, pullPath, gmApiPath].some((u) =>
            reqUrl.startsWith(u),
          )
        ) {
          Object.entries({
            'access-control-allow-origin': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          const usp = new URLSearchParams(reqUrl.split('?', 2)[1]);
          let origin = toValidURL(usp.get(`origin`))?.origin ?? viteOrigin;

          if (reqUrl.startsWith(installUserPath)) {
            const u = new URL(entryPath, origin);
            res.end(
              [
                await finalMonkeyOptionToComment(finalOption),
                fn2string(serverInjectFn, {
                  entrySrc: u.href,
                }),
                '',
              ].join('\n\n'),
            );
          } else if (reqUrl.startsWith(entryPath)) {
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

            const entryList: string[] = finalOption.server.mountGmApi
              ? [gmApiPath]
              : [];
            scriptList.forEach((p) => {
              const src = p.attribs.src ?? '';
              const textNode = p.firstChild;
              let text = '';
              if (textNode?.type == ElementType.Text) {
                text = textNode.data ?? '';
              }
              if (src) {
                entryList.push(src);
              } else {
                const scriptUrl = new URL(origin);
                scriptUrl.pathname = pullPath;
                scriptUrl.searchParams.set(
                  'text',
                  Buffer.from(text, 'utf-8').toString('base64url'),
                );
                entryList.push(scriptUrl.pathname + scriptUrl.search);
              }
            });

            let realEntry = finalOption.entry;
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
          } else if (reqUrl.startsWith(pullPath)) {
            res.end(
              Buffer.from(usp.get('text') ?? '', 'base64url').toString('utf-8'),
            );
          } else if (reqUrl.startsWith(gmApiPath)) {
            if (finalOption.server.mountGmApi) {
              res.end(fn2string(mountGmApiFn));
            } else {
              res.end('');
            }
          }
          return;
        }

        next();
      });

      if (finalOption.server.open) {
        let cacheComment = '';
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch();
        }
        const newComment = [
          await finalMonkeyOptionToComment(finalOption),
          `// entry: ${finalOption.entry}`,
        ].join('\n');
        if (!isFirstBoot() && cacheComment != newComment) {
          openBrowser(serverConfig.installUrl, true, logger);
          logger.info('reopen, config comment has changed', { time: true });
        }
        await fs.writeFile(cacheUserPath, newComment).catch();
      }
    },
  };
};
