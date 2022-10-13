import detectPort from 'detect-port';
import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { PluginOption, ResolvedConfig } from 'vite';
import { fn2string, serverInjectFn } from '../inject_template';
import { openBrowser } from '../open_browser';
import type { FinalMonkeyOption } from '../types';
import { finalMonkeyOptionToComment } from '../userscript';
import { logger } from '../_logger';
import { existFile, isFirstBoot, lazy } from '../_util';

export const installUserPath = '/__vite-plugin-monkey.install.user.js';
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
      if (typeof prefix == 'string') {
        const t = prefix + '';
        prefix = (name: string) => t + name;
      }
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

          const entryList: {
            type: string;
            src: string;
          }[] = scriptList.map((p) => {
            const src = p.attribs.src ?? '';
            const text = p.firstChild;
            const type = p.attribs.type;
            let innerText = '';
            if (text?.type == ElementType.Text) {
              innerText = text.data ?? '';
            }
            if (src) {
              return { type, src: new URL(src, origin).href };
            } else {
              const u = new URL(origin);
              u.pathname = '/__vite-plugin-monkey/pull_script';
              u.searchParams.set(
                'innerText',
                Buffer.from(innerText, 'utf-8').toString('base64url'),
              );
              return { type, src: u.href };
            }
          });

          let realEntry = finalPluginOption.entry;
          if (path.isAbsolute(realEntry)) {
            realEntry = path.relative(viteConfig.root, realEntry);
            realEntry = realEntry.replace('\\', '/');
          }
          entryList.push({
            type: 'module',
            src: new URL(realEntry, origin).href,
          });
          res.end(
            [
              await finalMonkeyOptionToComment(finalPluginOption),
              fn2string(serverInjectFn, {
                entryList,
                mountGmApi: finalPluginOption.server.mountGmApi,
              }),
              '',
            ].join('\n\n'),
          );
        } else if (req.url?.startsWith('/__vite-plugin-monkey/pull_script')) {
          Object.entries({
            'access-control-allow-origin': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          const u = new URL(req.url, origin);
          const innerText = u.searchParams.get('innerText') ?? '';
          res.end(Buffer.from(innerText, 'base64url').toString('utf-8'));
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
