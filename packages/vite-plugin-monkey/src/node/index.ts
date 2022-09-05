import detectPort from 'detect-port';
import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import nodeFetch, { Response as nodeResponse } from 'node-fetch';
import fs from 'node:fs/promises';
import path from 'node:path';
import pc from 'picocolors';
import type { PluginOption, ResolvedConfig } from 'vite';
import { transformWithEsbuild } from 'vite';
import selfPkg from '../../package.json';
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
import type { IArray, LocaleType } from './userscript/common';
import { logger } from './_logger';
import {
  existFile,
  getModuleRealInfo,
  GM_keywords,
  isFirstBoot,
  lazy,
  mergeObj,
  projectPkg,
} from './_util';

export * as cdn from './cdn';
export type {
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  GreasemonkeyUserScript,
  Format,
};

/**
 * @param moduleName 'name/subname' in example
 * @returns url or exportVarName
 * @example
 * const mod = await import('name/subname')
 */
type Lib2Url = (version: string, name: string, moduleName: string) => string;

export type MonkeyOption = {
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
   * // vite-env.d.ts, you must manual modify vite-env.d.ts file for type hint
   * declare module clientAlias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;
  server?: {
    /**
     * auto open *.user.js in default browser when userscript comment change or vite server first start.
     * if you don't want to open when vite server first start, just want to open when userscript comment change, you should set viteConfig.server.open=false
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
     * @example
     * // if set true, you can export all from vite-plugin-monkey/dist/client to global for type hint
     * // vite-env.d.ts
     * type MonkeyWindow = import('vite-plugin-monkey/dist/client').MonkeyWindow;
     * declare const unsafeWindow: MonkeyWindow['unsafeWindow'];
     * declare const GM: MonkeyWindow['GM'];
     * declare const GM_addStyle: MonkeyWindow['GM_addStyle'];
     * declare const GM_addElement: MonkeyWindow['GM_addElement'];
     * declare const GM_deleteValue: MonkeyWindow['GM_deleteValue'];
     * declare const GM_listValues: MonkeyWindow['GM_listValues'];
     * declare const GM_addValueChangeListener: MonkeyWindow['GM_addValueChangeListener'];
     * declare const GM_removeValueChangeListener: MonkeyWindow['GM_removeValueChangeListener'];
     * declare const GM_setValue: MonkeyWindow['GM_setValue'];
     * declare const GM_getValue: MonkeyWindow['GM_getValue'];
     * declare const GM_log: MonkeyWindow['GM_log'];
     * declare const GM_getResourceText: MonkeyWindow['GM_getResourceText'];
     * declare const GM_getResourceURL: MonkeyWindow['GM_getResourceURL'];
     * declare const GM_registerMenuCommand: MonkeyWindow['GM_registerMenuCommand'];
     * declare const GM_unregisterMenuCommand: MonkeyWindow['GM_unregisterMenuCommand'];
     * declare const GM_openInTab: MonkeyWindow['GM_openInTab'];
     * declare const GM_xmlhttpRequest: MonkeyWindow['GM_xmlhttpRequest'];
     * declare const GM_download: MonkeyWindow['GM_download'];
     * declare const GM_getTab: MonkeyWindow['GM_getTab'];
     * declare const GM_saveTab: MonkeyWindow['GM_saveTab'];
     * declare const GM_getTabs: MonkeyWindow['GM_getTabs'];
     * declare const GM_notification: MonkeyWindow['GM_notification'];
     * declare const GM_setClipboard: MonkeyWindow['GM_setClipboard'];
     * declare const GM_info: MonkeyWindow['GM_info'];
     * declare const GM_cookie: MonkeyWindow['GM_cookie'];
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
     * it can be used by userscript.updateURL, when checking for updates, just download this small file instead of downloading the entire script
     *
     * it should end with '.meta.js', if set false, will not generate this file
     *
     * if set true, will equal to fileName.replace(/\\.user\\.js$/,'.meta.js')
     * @default false
     */
    metaFileName?: string | boolean;

    /**
     * if value is string or function, it or its return value is exportVarName
     *
     * if value is Array, the first [item or its return value] is exportVarName, the items after it all are url that is [require url]
     *
     * if module is unimported, plugin will not add require url to userscript
     *
     * @example
     * {
     *  vue:'Vue',
     *  // youe need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js'], when command=='build'
     *
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // plugin will auto add this url to userscript.require
     *
     *  'prettier/parser-babel': [
     *    'prettierPlugins.babel',
     *    (version, name, moduleName) => {
     *      // name == `prettier`
     *      // moduleName == `prettier/parser-babel`
     *      const subpath = `${moduleName.split('/').at(-1)}.js`;
     *      return `https://cdn.jsdelivr.net/npm/${name}@${version}/${subpath}`;
     *    },
     *  ],
     *  // sometimes moduleName deffers from package name
     * }
     */
    externalGlobals?: Record<string, IArray<string | Lib2Url>>;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * the judgment is based on String.prototype.includes, if code.includes('GM_xxx'), add \@grant GM_xxx to userscript
     * @default true
     */
    autoGrant?: boolean;

    /**
     * check all require urls for availability, just http code is 2xx, never check http.body
     * @default false
     */
    checkCDN?: boolean;

    /**
     * if you want minify all, just set viteConfig.build.minify=true
     * @default true
     */
    minifyCss?: boolean;
  };
};

type FinalMonkeyOption = MonkeyOption & {
  userscript: {
    name: string | LocaleType<string>;
    version: string;
    author: string;
  };
  clientAlias: string;
  server: {
    open: boolean;
    prefix: string | ((name: string) => string) | false;
    mountGmApi: boolean;
  };
  build: {
    fileName: string;
    metaFileName: string | boolean;
    externalGlobals: Record<string, IArray<string | Lib2Url>>;
    autoGrant: boolean;
    checkCDN: boolean;
    minifyCss: boolean;
  };
};

const installUserPath = '/__vite-plugin-monkey.install.user.js';
const cacheUserPath = 'node_modules/.vite/__vite-plugin-monkey.cache.user.js';

export default (pluginOption: MonkeyOption): PluginOption => {
  let finalPluginOption: FinalMonkeyOption = {
    ...pluginOption,
    userscript: mergeObj(pluginOption.userscript, {
      name: projectPkg.name,
      version: projectPkg.version,
      author: projectPkg.author ?? 'monkey',
    }),
    clientAlias: '$',
    server: mergeObj(pluginOption.server, {
      open: true,
      prefix: 'dev:',
      mountGmApi: false,
    }),
    build: mergeObj(pluginOption.build, {
      fileName: projectPkg.name + '.user.js',
      metaFileName: false,
      externalGlobals: {},
      autoGrant: true,
      checkCDN: false,
      minifyCss: true,
    }),
  };

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

  let isServe = true;

  const externalModNameSet = new Set<string>(
    Object.keys(finalPluginOption.build.externalGlobals),
  );
  const realUsedModNameSet = new Set<string>();
  const globalsPkg2VarName: Record<string, string> = {};
  const requirePkgList: { moduleName: string; url: string }[] = [];

  const GM_keyword_set = new Set(GM_keywords);
  const autoGrantList = new Set<string>();

  let checkCdnPromiseList: Array<{
    url: string;
    responsePromise: Promise<nodeResponse | unknown>;
  }> = [];

  return {
    name: 'monkey',
    enforce: 'post',
    async config(userConfig, { command }) {
      isServe = command == 'serve';

      if (!isServe) {
        for (const kv of Object.entries(
          finalPluginOption.build.externalGlobals,
        )) {
          const [moduleName, varName2LibUrl] = kv;
          const { name, version } = await getModuleRealInfo(moduleName);

          if (typeof varName2LibUrl == 'string') {
            globalsPkg2VarName[moduleName] = varName2LibUrl;
          } else if (typeof varName2LibUrl == 'function') {
            globalsPkg2VarName[moduleName] = varName2LibUrl(
              version,
              name,
              moduleName,
            );
          } else if (varName2LibUrl instanceof Array) {
            const [varName, ...libUrlList] = varName2LibUrl;
            if (typeof varName == 'string') {
              globalsPkg2VarName[moduleName] = varName;
            } else if (typeof varName == 'function') {
              globalsPkg2VarName[moduleName] = varName(
                version,
                name,
                moduleName,
              );
            }
            for (const libUrl of libUrlList) {
              // keep add order
              if (typeof libUrl == 'string') {
                requirePkgList.push({ url: libUrl, moduleName });
              } else if (typeof libUrl == 'function') {
                requirePkgList.push({
                  url: libUrl(version, name, moduleName),
                  moduleName,
                });
              }
            }
          }
        }
      }

      return {
        resolve: {
          alias: {
            [finalPluginOption.clientAlias]: 'vite-plugin-monkey/dist/client',
          },
        },
        preview: {
          host: userConfig.preview?.host ?? '127.0.0.1',
          cors: true,
        },
        define: {
          'process.env.NODE_ENV':
            userConfig.define?.['process.env.NODE_ENV'] ??
            JSON.stringify(
              userConfig.mode ?? (isServe ? 'development' : 'production'),
            ),
        },
        server: {
          open: userConfig.server?.open ?? finalPluginOption.server.open,
          cors: true,
        },
        build: {
          sourcemap: userConfig.build?.sourcemap ?? false,
          minify: userConfig.build?.minify ?? false,
          rollupOptions: {
            input: finalPluginOption.entry,
            external(source) {
              if (
                !source.startsWith('./') &&
                !source.startsWith('../') &&
                !path.isAbsolute(source)
              ) {
                realUsedModNameSet.add(source);
              }
              return externalModNameSet.has(source);
            },
            output: {
              globals: globalsPkg2VarName,
            },
          },
          lib: {
            entry: finalPluginOption.entry,
            formats: ['iife'],
            fileName: () => {
              return finalPluginOption.build.fileName;
            },
            name: 'vite_plugin_monkey_' + Math.random().toString(16).slice(2),
          },
        },
      };
    },
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
      if (isServe) {
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
      }
    },
    async configureServer(server) {
      const { userscript } = finalPluginOption;

      // prefix name
      if (typeof userscript.name == 'string') {
        userscript.name = { '': userscript.name };
      }
      userscript.name = mergeObj(userscript.name, {
        '': projectPkg.name,
      });

      let prefix = finalPluginOption.server.prefix;
      if (typeof prefix == 'string') {
        const t = prefix + '';
        prefix = (name: string) => t + name;
      }
      if (typeof prefix == 'function') {
        Object.entries(userscript.name).forEach(([k, v]) => {
          // @ts-ignore
          Reflect.set(userscript.name as object, k, prefix(v));
        });
      }

      // support dev env
      const { grant } = userscript;
      if (grant !== 'none') {
        finalPluginOption.userscript.grant = '*';
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
        const origin = `${
          serverConfig.isHttps ? 'https' : 'http'
        }://${realHost}`;

        if (req.url?.startsWith(installUserPath)) {
          Object.entries({
            'access-control-allow-origin': '*',
            'access-control-expose-headers': '*',
            'content-type': 'application/javascript',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });

          const response = await nodeFetch(origin);
          if (!response.ok) {
            logger.warn(
              `${origin} response is not ok, check if index.html exists`,
              { time: true },
            );
          }
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

          let realEntry = finalPluginOption.entry;
          if (path.isAbsolute(realEntry)) {
            realEntry = path.relative(viteConfig.root, realEntry);
            realEntry = realEntry.replace('\\', '/');
          }
          entryList.push(new URL(realEntry, origin).href);

          res.end(
            [
              userscript2comment(
                finalPluginOption.userscript,
                finalPluginOption.format,
              ),
              template2string(serverInjectTemplate, {
                entryList,
                mountGmApi: finalPluginOption.server.mountGmApi,
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

      if (finalPluginOption.server.open) {
        let cacheComment = '';
        if (await existFile(cacheUserPath)) {
          cacheComment = (await fs.readFile(cacheUserPath)).toString('utf-8');
        } else {
          await fs.mkdir(path.dirname(cacheUserPath)).catch();
        }
        const newComment = userscript2comment(
          finalPluginOption.userscript,
          finalPluginOption.format,
        );
        if (!isFirstBoot() && cacheComment != newComment) {
          openBrowser(serverConfig.installUrl, true, logger);
          logger.info('reopen, config comment has changed', { time: true });
        }
        await fs.writeFile(cacheUserPath, newComment).catch();
      }
    },
    async configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (['/', '/index.html'].includes((req.url ?? '').split('?')[0])) {
          const [fileName] = (
            await fs.readdir(path.join(process.cwd(), viteConfig.build.outDir))
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
    async transformIndexHtml() {
      if (isServe) {
        return [
          {
            tag: 'script',
            attrs: { type: 'module', 'data-source': 'vite-plugin-monkey' },
            children: template2string(redirectFn, { url: installUserPath }),
            injectTo: 'head',
          },
        ];
      }
    },
    async transform(code, id) {
      if (
        finalPluginOption.build.autoGrant &&
        !isServe &&
        GM_keyword_set.size > 0 &&
        !id.endsWith('vite-plugin-monkey/dist/client/index.mjs')
      ) {
        Array.from(GM_keyword_set)
          .filter((fnName) => code.includes(fnName))
          .forEach((fnName) => {
            autoGrantList.add(fnName);
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
    async generateBundle(_, bundle) {
      const { userscript } = finalPluginOption;

      let requireUrlList = requirePkgList
        .filter((p) => realUsedModNameSet.has(p.moduleName))
        .map((p) => p.url);
      {
        const { require = [] } = userscript;
        if (typeof require == 'string') {
          requireUrlList = [require, ...requireUrlList];
        } else if (require instanceof Array) {
          requireUrlList = [...require, ...requireUrlList];
        }
        userscript.require = requireUrlList;
      }

      if (finalPluginOption.build.checkCDN) {
        checkCdnPromiseList = requireUrlList.map((url) => ({
          url,
          responsePromise: nodeFetch(url, {
            timeout: 3000,
          }).catch((e) => e),
        }));
      }

      if (autoGrantList.size > 0 && userscript.grant != '*') {
        let tempSet: Set<string>;
        if (typeof userscript.grant == 'string') {
          tempSet = new Set([userscript.grant, ...autoGrantList]);
        } else if (userscript.grant instanceof Array) {
          tempSet = new Set([...userscript.grant, ...autoGrantList]);
        } else {
          tempSet = autoGrantList;
        }
        userscript.grant = Array.from(tempSet) as typeof userscript.grant;
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
        let css = cssList.join('');
        if (!viteConfig.build.minify && finalPluginOption.build.minifyCss) {
          css = (
            await transformWithEsbuild(css, 'any_name.css', {
              minify: true,
              sourcemap: false,
              logLevel: 'error',
            })
          ).code.trim();
        }
        injectCssCode = template2string(cssInjectTemplate, {
          css,
        });
      }

      if (jsBundleList.length != 1) {
        logger.error(`expcet js modules size is 1, got ${jsBundleList.length}`);
      } else {
        let { metaFileName } = finalPluginOption.build;
        if (metaFileName === true) {
          metaFileName = finalPluginOption.build.fileName.replace(
            /\.user\.js$/,
            '.meta.js',
          );
        }
        if (typeof metaFileName == 'string' && metaFileName.length > 0) {
          this.emitFile({
            type: 'asset',
            fileName: metaFileName,
            source: userscript2comment(
              finalPluginOption.userscript,
              finalPluginOption.format,
            ),
          });
        }
        const chunk = jsBundleList[0][1];
        if (chunk.type == 'chunk') {
          chunk.code = [
            userscript2comment(
              finalPluginOption.userscript,
              finalPluginOption.format,
            ),
            `// use ${selfPkg.name}@${
              selfPkg.version
            } at ${new Date().toJSON()}`,
            injectCssCode,
            chunk.code,
          ]
            .filter((s) => s)
            .join('\n\n');
        }
      }
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
  };
};
