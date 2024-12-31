import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Plugin, ResolvedConfig, normalizePath } from 'vite';
import { logger } from '../_logger';
import { cyrb53hash, existFile, isFirstBoot, toValidURL } from '../_util';
import {
  fn2string,
  mountGmApiFn,
  serverInjectFn,
  serverInjectGMApiFn,
} from '../inject_template';
import { openBrowser } from '../open_browser';
import type { FinalMonkeyOption } from '../types';
import { gmIdentifiers } from '../gm_api';
import { finalMonkeyOptionToComment } from '../userscript';

export const installUserPath = '/__vite-plugin-monkey.install.user.js';
const gmApiPath = '/__vite-plugin-monkey.gm.api.js';
const entryPath = '/__vite-plugin-monkey.entry.js';
const pullPath = '/__vite-plugin-monkey.pull.js';
const restartStoreKey = '__vite_plugin_monkey_install_url';

export const serverPlugin = (finalOption: FinalMonkeyOption): Plugin => {
  let viteConfig: ResolvedConfig;
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
          host: userConfig.server?.host ?? '127.0.0.1',
          open: userConfig.server?.open ?? finalOption.server.open,
          cors: true,
        },
      };
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
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

      // https://github.com/lisonge/vite-plugin-monkey/issues/205
      server.middlewares.use((_, res, next) => {
        if (
          res.getHeader('Access-Control-Allow-Private-Network') === undefined
        ) {
          res.setHeader('Access-Control-Allow-Private-Network', 'true');
        }
        next();
      });

      server.middlewares.use(async (req, res, next) => {
        const reqUrl = req.url;
        if (
          req.method === 'GET' &&
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

          if (reqUrl.startsWith(installUserPath)) {
            let origin = toValidURL(usp.get(`origin`))?.origin;
            if (!origin) {
              const { https, port } = viteConfig.server;
              let { host } = viteConfig.server;
              if (host == '0.0.0.0') {
                host = '127.0.0.1';
              }
              origin = `${https ? 'https' : 'http'}://${host}:${port}`;
              logger.warn(
                `can not get origin from install url query parameter, use ${origin}`,
                {
                  time: true,
                },
              );
            }
            Reflect.set(globalThis, restartStoreKey, origin);
            const u = new URL(entryPath, origin);
            const metadata = await finalMonkeyOptionToComment(
              finalOption,
              new Set(),
              'serve',
            );
            res.end(
              [
                metadata,
                serverInjectGMApiFn(u.href, metadata),
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
            type Element =
              ReturnType<typeof DomUtils.findAll> extends Array<infer T>
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
                const usp = new URLSearchParams({
                  text: Buffer.from(text, 'utf-8').toString('base64url'),
                });
                entryList.push(pullPath + `?` + usp.toString());
              }
            });

            let realEntry = finalOption.entry;
            if (path.isAbsolute(realEntry)) {
              realEntry = normalizePath(
                path.relative(viteConfig.root, realEntry),
              );
            }
            const entryUrl = new URL(realEntry, 'http://127.0.0.1');
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
              res.end(
                `;(${mountGmApiFn})(import.meta, ${JSON.stringify(gmIdentifiers)});`,
              );
            } else {
              res.end('');
            }
          }
          return;
        }

        next();
      });

      if (finalOption.server.open) {
        const cacheUserPath = `node_modules/.vite/__vite-plugin-monkey.cache.${cyrb53hash(
          viteConfig.configFile,
        )}.user.js`;
        let cacheComment = '';
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch(() => {});
        }
        const newComment = await finalMonkeyOptionToComment(
          finalOption,
          new Set(),
          'serve',
        );
        const installUrl = Reflect.get(globalThis, restartStoreKey);
        if (!isFirstBoot() && cacheComment != newComment && installUrl) {
          openBrowser(installUrl, true, logger);
          logger.info('reopen, config comment has changed', { time: true });
        }
        await fs.writeFile(cacheUserPath, newComment).catch(() => {});
      }
    },
  };
};
