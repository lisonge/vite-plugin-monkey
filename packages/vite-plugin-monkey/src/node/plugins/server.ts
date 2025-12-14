import fs from 'node:fs/promises';
import type { ServerResponse } from 'node:http';
import path from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import { finalMonkeyOptionToComment } from '../userscript';
import { gmIdentifiers } from '../utils/gmApi';
import { openBrowser } from '../utils/openBrowser';
import {
  existFile,
  isFirstBoot,
  parserHtmlScriptResult,
  safeURL,
  simpleHash,
  stringifyFunction,
} from '../utils/others';
import { mountGmApiFn, serverInjectFn } from '../utils/template';
import type { ResolvedMonkeyOption } from '../utils/types';

const urlPrefix = '/__vite-plugin-monkey.';
export const installUserPath = urlPrefix + 'install.user.js';
const gmApiPath = urlPrefix + 'gm.api.js';
const entryPath = urlPrefix + 'entry.js';
const pullPath = urlPrefix + 'pull.js';

const restartStoreKey = '__vite_plugin_monkey_install_url';
const localHost = '127.0.0.1';
const localOrigin = `http://${localHost}`;
const htmlPlaceholder = '<html><head></head><body></body></html>';

export const serverFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  let viteConfig: ResolvedConfig;
  let monkeyWindowKey = '';
  return {
    name: 'monkey:server',
    apply: 'serve',
    async config(userConfig) {
      option = await getOption();
      for (const [k, v] of Object.entries(option.userscript.name)) {
        Reflect.set(option.userscript.name, k, option.server.prefix(v));
      }
      option.userscript.grant.add('*');
      // see #270
      monkeyWindowKey =
        `__monkeyWindow-` +
        simpleHash(
          await finalMonkeyOptionToComment(option, new Set(), 'serve'),
        );
      return {
        preview: {
          host: userConfig.preview?.host ?? localHost,
          cors: true,
        },
        server: {
          host: userConfig.server?.host ?? localHost,
          open: userConfig.server?.open ?? option.server.open,
          cors: true,
        },
      };
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transform(code, id) {
      if (id.endsWith('/vite-plugin-monkey/dist/client/index.mjs')) {
        return code.replaceAll(
          '__MONKEY_WINDOW_KEY__',
          JSON.stringify(monkeyWindowKey),
        );
      }
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
        if (!(req.method === 'GET' && req.url && req.url.startsWith(urlPrefix)))
          return next();
        const url = new URL(req.url, localOrigin);
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
              return `${viteConfig.server.https ? 'https' : 'http'}://${host}:${viteConfig.server.port}`;
            })();
          Reflect.set(globalThis, restartStoreKey, origin);
          res.end(
            [
              await finalMonkeyOptionToComment(option, new Set(), 'serve'),
              stringifyFunction(
                serverInjectFn,
                new URL(entryPath, origin).href,
                monkeyWindowKey,
              ),
              '',
            ].join('\n\n'),
          );
        } else if (url.pathname === entryPath) {
          setScriptHeader(res);
          const results = await server
            .transformIndexHtml('/', htmlPlaceholder, req.originalUrl)
            .then(parserHtmlScriptResult);
          const entryUrls: string[] = (
            option.server.mountGmApi ? [gmApiPath] : []
          ).concat(
            results.map((v) => {
              return (
                v.src ||
                `${pullPath}?text=${Buffer.from(v.text, 'utf-8').toString('base64url')}`
              );
            }),
          );
          const realEntry = path.isAbsolute(option.entry)
            ? normalizePath(path.relative(viteConfig.root, option.entry))
            : option.entry;
          const entryUrl = new URL(realEntry, localOrigin);
          entryUrls.push(entryUrl.pathname + entryUrl.search);
          res.end(
            entryUrls.map((s) => `import ${JSON.stringify(s)};`).join('\n'),
          );
        } else if (url.pathname === pullPath) {
          setScriptHeader(res);
          res.end(
            Buffer.from(
              url.searchParams.get('text') ?? '',
              'base64url',
            ).toString('utf-8'),
          );
        } else if (url.pathname === gmApiPath) {
          setScriptHeader(res);
          if (option.server.mountGmApi) {
            res.end(
              stringifyFunction(
                mountGmApiFn,
                monkeyWindowKey,
                gmIdentifiers.concat(),
              ),
            );
          } else {
            res.end('');
          }
        } else {
          next();
        }
      });

      if (option.server.open) {
        const hash = simpleHash(viteConfig.configFile);
        const cacheUserPath = `node_modules/.vite/__vite-plugin-monkey.cache.${hash}.user.js`;
        let cacheComment = '';
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch(() => {});
        }
        const newComment = await finalMonkeyOptionToComment(
          option,
          new Set(),
          'serve',
        );
        const installUrl = Reflect.get(globalThis, restartStoreKey);
        if (!isFirstBoot() && cacheComment != newComment && installUrl) {
          openBrowser(installUrl);
          setTimeout(() => {
            console.log('[plugin-monkey] reopen, config comment has changed');
          });
        }
        await fs.writeFile(cacheUserPath, newComment).catch(() => {});
      }
    },
  };
};
