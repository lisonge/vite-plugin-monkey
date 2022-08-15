import detectPort from 'detect-port';
import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import nodeFetch, { Response as nodeResponse } from 'node-fetch';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import type { Plugin, ResolvedConfig } from 'vite';
import selfPackageJson from '../../package.json';
import {
  cssInjectTemplate,
  redirectFn,
  serverInjectTemplate,
  template2string,
} from './inject_template';
import { openBrowser } from './open_browser';
import type {
  Format,
  GreasemonkeyUserScript,
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
} from './userscript';
import { userscript2comment } from './userscript';
import { logger } from './_logger';
import {
  existFile,
  getModuleVersion,
  GM_keywords,
  isFirstBoot,
  packageJson,
} from './_util';

export * as cdn from './cdn';
export type {
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  GreasemonkeyUserScript,
  Format,
};

type Lib2Url = (version: string, name: string) => string;

export interface MonkeyOption {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;

  /**
   * alias of vite-plugin-monkey/dist/client
   * @default '$'
   * @example
   * // vite.config.ts, plugin will auto modify config
   * resolve: {
   *   alias: {
   *     [clientAlias]: 'vite-plugin-monkey/dist/client',
   *   },
   * }
   * @example
   * // vite-env.d.ts, you must manual modify .env file
   * declare module clientAlias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;
  server?: {
    /**
     * auto open *.user.js in default browser when userscript comment change or vite server first start
     * @default true
     */
    open?: boolean;

    /**
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list, if you not want prefix, set false
     * @default 'dev:'
     */
    prefix?: string | ((name: string) => string) | false;

    /**
     * mount GM_api to unsafeWindow, not recommend it, you should use GM_api by ESM import
     * @default false
     */
    mountGmApi?: boolean;
  };
  build?: {
    /**
     * build bundle userscript file name
     *
     * it should end with '.user.js'
     * @default (package.json.name??'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * build bundle userscript comment file name, this file is only include comment
     *
     * it can be used by userscript.updateURL
     *
     * it should end with '.meta.js'
     *
     * if set false, will not generate this file
     * @default fileName.replace(/\.user\.js$/,'.meta.js')
     */
    metaFileName?: string | false;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // use fixed version, plugin will auto add this url to userscript.require
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // best recommended this
     * }
     *
     */
    externalGlobals?: Record<
      string,
      string | [string, ...(string | Lib2Url)[]]
    >;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * the judgment is based on String.prototype.includes
     * @default true
     */
    autoGrant?: boolean;

    /**
     * check all require urls for availability, http code is 2xx
     * @default false
     */
    checkCDN?: boolean;
  };
}

const installUserPath = '/__vite-plugin-monkey.install.user.js';
const cacheUserPath = 'node_modules/.vite/__vite-plugin-monkey.cache.user.js';

export default (pluginOption: MonkeyOption): Plugin => {
  const external: string[] = [];
  const globals: Record<string, string> = {};
  const cdnList: string[] = [];

  let finalConfig: ResolvedConfig;
  let isServe = true;
  const isHttps = () => !!finalConfig.server.https;
  const getPort = (() => {
    // 5173 come from https://github.com/vitejs/vite/blob/26bcdc3186807bb6f3817119cd7e64ae8308a057/packages/vite/src/node/server/index.ts#L612
    let availablePort = 5173;
    detectPort(availablePort).then((p) => {
      availablePort = p;
    });
    return () => finalConfig.server.port ?? availablePort;
  })();
  const getHost = () => {
    if (
      typeof finalConfig.server.host == 'string' &&
      finalConfig.server.host != '0.0.0.0'
    ) {
      return finalConfig.server.host;
    }
    return '127.0.0.1';
  };
  const getOrigin = () =>
    `${isHttps() ? 'https' : 'http'}://${getHost()}:${getPort()}`;
  const getInstallUrl = () => new URL(finalConfig.base, getOrigin()).href; //+ installUserPath;

  let fileName = 'monkey.user.js';
  if (pluginOption.build?.fileName) {
    fileName = pluginOption.build?.fileName;
  } else {
    fileName = packageJson.name + '.user.js';
  }

  const GM_keyword_set = new Set(GM_keywords);

  const autoGrantList: string[] = [];

  let checkCdnPromiseList: Array<{
    url: string;
    responsePromise: Promise<nodeResponse | unknown>;
  }> = [];

  return {
    name: 'monkey',
    enforce: 'post',
    async config(config, { command }) {
      isServe = command == 'serve';
      for (const kv of Object.entries(
        pluginOption.build?.externalGlobals ?? {},
      )) {
        const [moduleName, varName$LibUrl] = kv;
        external.push(moduleName);

        if (typeof varName$LibUrl == 'string') {
          globals[moduleName] = varName$LibUrl;
        } else if (varName$LibUrl instanceof Array) {
          const [varName, ...libUrlList] = varName$LibUrl;
          globals[moduleName] = varName;
          for (const libUrl of libUrlList) {
            // keep add order
            if (typeof libUrl == 'string') {
              cdnList.push(libUrl);
            } else if (typeof libUrl == 'function') {
              cdnList.push(
                libUrl(await getModuleVersion(moduleName), moduleName),
              );
            }
          }
        }
      }

      return {
        resolve: {
          alias: {
            [pluginOption.clientAlias ?? '$']: 'vite-plugin-monkey/dist/client',
          },
        },
        preview: {
          host: config.preview?.host ?? '127.0.0.1',
          cors: config.preview?.cors ?? true,
        },
        define: {
          'process.env.NODE_ENV':
            config.define?.['process.env.NODE_ENV'] ??
            JSON.stringify(
              config.mode ?? (isServe ? 'development' : 'production'),
            ),
        },
        server: {
          open: config.server?.open ?? pluginOption.server?.open ?? true,
        },
        build: {
          sourcemap: config.build?.sourcemap ?? false,
          minify: config.build?.minify ?? false,
          rollupOptions: {
            input: pluginOption.entry,
            external,
            output: {
              globals,
            },
          },
          lib: {
            entry: pluginOption.entry,
            formats: ['iife'],
            fileName: () => {
              return fileName;
            },
            name: 'vite_plugin_monkey_' + Math.random().toString(16).slice(2),
          },
        },
      };
    },
    transformIndexHtml() {
      if (!isServe) return;
      return [
        {
          tag: 'script',
          attrs: { type: 'module', 'data-source': 'vite-plugin-monkey' },
          children: template2string(redirectFn, { url: installUserPath }),
          injectTo: 'head',
        },
      ];
    },
    configResolved(resolvedConfig) {
      finalConfig = resolvedConfig;
      const { server } = resolvedConfig;

      server.host = getHost();
      server.port = getPort();
      server.origin = getOrigin();

      if (server.hmr === undefined && server.hmr === true) {
        server.hmr = {
          host: getHost(),
          protocol: isHttps() ? 'wss' : 'ws',
        };
      } else if (server.hmr && typeof server.hmr == 'object') {
        Object.assign(server.hmr, {
          host: getHost(),
          protocol: isHttps() ? 'wss' : 'ws',
        });
      }
    },
    async configureServer(server) {
      // prefix name
      const prefix = pluginOption.server?.prefix ?? 'dev:';
      const name = (() => {
        let _name = pluginOption.userscript.name ?? packageJson.name;
        if (typeof _name == 'object' && !('' in _name)) {
          _name = { '': packageJson.name, ..._name };
        }
        return _name;
      })();

      if (typeof prefix == 'string') {
        if (typeof name == 'string') {
          pluginOption.userscript.name = prefix + name;
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix + v;
          });
          pluginOption.userscript.name = name;
        }
      } else if (typeof prefix == 'function') {
        if (typeof name == 'string') {
          pluginOption.userscript.name = prefix(name);
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix(v);
          });
          pluginOption.userscript.name = name;
        }
      }

      // support dev env
      const { grant } = pluginOption.userscript;
      if (grant !== 'none') {
        pluginOption.userscript.grant = '*';
      }

      server.middlewares.use(async (req, res, next) => {
        let realHost = req.headers[':authority'] ?? req.headers['host'];
        if (realHost instanceof Array) {
          realHost = realHost[0];
        }
        if (!realHost) {
          logger.error('host not found', { time: true });
          return;
        }
        const origin = `${isHttps() ? 'https' : 'http'}://${realHost}`;

        if (req.url?.startsWith(installUserPath)) {
          Object.entries({
            'access-control-allow-origin': '*',
            'access-control-expose-headers': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });

          const response = await nodeFetch(origin);
          const htmlText = await response.text();
          const doc = parseDocument(htmlText);
          type Element = ReturnType<typeof DomUtils.findAll> extends Array<
            infer T
          >
            ? T
            : never;
          const scriptList = (
            DomUtils.getElementsByTagType(ElementType.Script, doc) as Element[]
          ).filter(
            (p) =>
              p.attribs.type == 'module' &&
              p.attribs['data-source'] !== 'vite-plugin-monkey',
          );

          const entryList = scriptList
            .map((p) => {
              const src = p.attribs.src ?? '';
              const text = p.firstChild;
              let innerText = '';
              if (text?.type == ElementType.Text) {
                innerText = text.data ?? '';
              }
              if (src) return new URL(src, origin).href;
              else if (innerText) {
                const u = new URL(origin);
                u.pathname = '/__vite-plugin-monkey/pull_script';
                u.searchParams.set(
                  'innerText',
                  Buffer.from(innerText, 'utf-8').toString('base64url'),
                );
                return u.href;
              }
              return '';
            })
            .filter((s) => s);

          let realEntry = pluginOption.entry;
          if (path.isAbsolute(pluginOption.entry)) {
            realEntry = path.relative(finalConfig.root, pluginOption.entry);
            realEntry = realEntry.replace('\\', '/');
          }
          entryList.push(new URL(realEntry, origin).href);

          res.end(
            [
              userscript2comment(pluginOption.userscript, pluginOption.format),
              template2string(serverInjectTemplate, {
                entryList,
                mountGmApi: pluginOption.server?.mountGmApi ?? false,
              }),
              '',
            ].join('\n\n'),
          );
        } else if (req.url?.startsWith('/__vite-plugin-monkey/pull_script')) {
          Object.entries({
            'access-control-allow-origin': '*',
            'access-control-expose-headers': '*',
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

      // according to the change of final UserScript text, open install url in Browser
      // let isOutUrl = false;
      // const u = getInstallUrl();
      // console.log('server');
      if (pluginOption.server?.open ?? true) {
        let cacheComment = '';
        // const cacheCommentPath = '' + ;
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch();
        }
        const newComment = userscript2comment(
          pluginOption.userscript,
          pluginOption.format,
        );
        if (isFirstBoot()) {
        } else if (cacheComment != newComment) {
          openBrowser(getInstallUrl(), true, logger);
          logger.info('reopen, config comment has changed', { time: true });
        }
        await fs.writeFile(cacheUserPath, newComment).catch();
      }
    },
    generateBundle(_, bundle) {
      const { require } = pluginOption.userscript;
      if (typeof require == 'string') {
        pluginOption.userscript.require = [require, ...cdnList];
      } else if (require instanceof Array) {
        pluginOption.userscript.require = [...require, ...cdnList];
      } else {
        pluginOption.userscript.require = cdnList;
      }

      if (pluginOption.build?.checkCDN ?? false) {
        checkCdnPromiseList = pluginOption.userscript.require.map((url) => ({
          url,
          responsePromise: nodeFetch(url, {
            timeout: 3000,
          }).catch((e) => e),
        }));
      }

      if (autoGrantList.length > 0 && pluginOption.userscript.grant != '*') {
        const { grant } = pluginOption.userscript;
        if (typeof grant == 'string') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pluginOption.userscript.grant = Array.from(
            new Set([grant, ...autoGrantList]),
          );
        } else if (grant instanceof Array) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pluginOption.userscript.grant = Array.from(
            new Set([...grant, ...autoGrantList]),
          );
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          pluginOption.userscript.grant = autoGrantList;
        }
      }

      const bundleList = Object.entries(bundle);
      const cssBundleList = bundleList.filter(([k]) => k.endsWith('.css'));
      const jsBundleList = bundleList.filter(([k]) => k.endsWith('.js'));
      const cssList: string[] = [];
      cssBundleList.forEach(([k, v]) => {
        if (v.type == 'asset') {
          cssList.push(v.source.toString());
          delete bundle[k];
        }
      });
      let injectCssCode: undefined | string = undefined;
      if (cssList.length > 0) {
        injectCssCode = template2string(cssInjectTemplate, {
          css: cssList.join(''),
        });
      }

      if (jsBundleList.length != 1) {
        logger.error(`expcet js modules size is 1, got ${jsBundleList.length}`);
      } else {
        const metaFileName =
          pluginOption.build?.metaFileName ??
          pluginOption.build?.fileName?.replace(/\.user\.js$/, '.meta.js') ??
          (packageJson.name ?? 'monkey') + '.meta.js';
        if (typeof metaFileName == 'string' && metaFileName.length > 0) {
          this.emitFile({
            type: 'asset',
            fileName: metaFileName,
            source: userscript2comment(
              pluginOption.userscript,
              pluginOption.format,
            ),
          });
        }
        const chunk = jsBundleList[0][1];
        const { name, version } = selfPackageJson;
        if (chunk.type == 'chunk') {
          chunk.code =
            [
              userscript2comment(pluginOption.userscript, pluginOption.format),
              `// use ${name}@${version} at ${new Date().toJSON()}`,
              injectCssCode,
              chunk.code,
            ]
              .filter((s) => s)
              .join('\n\n') + ' \n';
        }
      }
    },
    transform(code, id) {
      if (
        pluginOption.build?.autoGrant !== false &&
        !isServe &&
        GM_keyword_set.size > 0 &&
        !id.endsWith('vite-plugin-monkey/dist/client/index.mjs')
      ) {
        Array.from(GM_keyword_set)
          .filter((fnName) => code.includes(fnName))
          .forEach((fnName) => {
            autoGrantList.push(fnName);
            GM_keyword_set.delete(fnName);
          });
      }

      // WARN @vite/client source file may change in the future version
      // TODO support vite@3
      if (isServe && id.endsWith('node_modules/vite/dist/client/client.mjs')) {
        // use import.meta['url'] instead of import.meta.url, because vite will replace import.meta.url to file system path
        code = code.replace(
          /__HMR_PROTOCOL__/g,
          `(__HMR_PROTOCOL__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.protocol === 'https:' ? 'wss' : 'ws'})()))`,
        );

        // vite@v3 not need
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L26
        code = code.replace(
          /__HMR_HOSTNAME__/g,
          `(__HMR_HOSTNAME__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.hostname})()))`,
        );

        // vite@v3 not need
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L29
        code = code.replace(
          /__HMR_PORT__/g,
          `(__HMR_PORT__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.prort})()))`,
        );

        code = code.replace(
          /__BASE__/g,
          `((()=>{const b = __BASE__; const u = new URL(import.meta['url'], location.origin); return b !== '/' ? b : (u.origin+'/');})())`,
        );

        // work with vite@3
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L302
        code = code.replace(
          '`${location.protocol}//${hostAndPath}`',
          "`${new URL(import.meta['url'], location.origin).protocol}//${hostAndPath}`",
        );
      }
      return code;
    },
    async closeBundle() {
      if (checkCdnPromiseList.length > 0) {
        logger.info(
          `checking CDN*${checkCdnPromiseList.length} for availability`,
        );
        await new Promise<void>((res) => {
          let n = 0;
          let failedNum = 0;
          checkCdnPromiseList.forEach(async ({ url, responsePromise }) => {
            const response = await responsePromise;
            if (response instanceof nodeResponse) {
              if (!response.ok) {
                failedNum++;
                logger.error(`CDN HTTP ${response.status}, ${pc.red(url)}`);
              } else {
                logger.info(`${pc.green('CDN ok,')} ${pc.gray(url)}`);
              }
            } else {
              const error = response as unknown;
              failedNum++;
              if (error instanceof Error) {
                if (error.message.includes(url)) {
                  logger.error(`${error.name}:${error.message}`);
                } else {
                  logger.error(`${error.name}:${error.message}, ${url}`);
                }
              } else {
                const message = String(error);
                if (message.includes(url)) {
                  logger.error(`unknown error:${message}`);
                } else {
                  logger.error(`unknown error:${message}, ${url}`);
                }
              }
            }
            n++;
            if (n == checkCdnPromiseList.length) {
              if (failedNum > 0) {
                logger.error(
                  `check finished, CDN*${failedNum} are not available, you need fix it`,
                );
              } else {
                logger.info(
                  `check finished, All CDN*${checkCdnPromiseList.length} are available`,
                );
              }
              res();
            }
          });
        });
      }
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (['/', '/index.html'].includes((req.url ?? '').split('?')[0])) {
          const [fileName] = (
            await fs.readdir(path.join(process.cwd(), finalConfig.build.outDir))
          ).filter((name) => name.endsWith('.user.js'));
          if (fileName) {
            Object.entries({
              'content-type': 'text/html; charset=utf-8',
            }).forEach(([k, v]) => {
              res.setHeader(k, String(v));
            });
            res.end(
              `<script type="module" data-source="vite-plugin-monkey">${template2string(
                redirectFn,
                { url: '/' + fileName },
              )}</script>`,
            );
            return;
          }
        }
        next();
      });
    },
  };
};
