import detectPort from 'detect-port';
import fs from 'fs/promises';
import { DomUtils, ElementType, parseDocument } from 'htmlparser2';
import nodeFetch from 'node-fetch';
import * as path from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import selfPackageJson from '../package.json';
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
  compatResolve,
  existFile,
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

export interface MonkeyOption {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;
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
  };
  build?: {
    /**
     * build bundle userscript file name, it should end with '.user.js'
     * @default (package.json.name||'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // recommended this, plugin will auto add this url to userscript.require
     *  vuex:['Vuex', (version)=>`https://unpkg.com/vuex@${version}/dist/vuex.global.js`],
     *  // better recommended this
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // or this
     * }
     *
     */
    externalGlobals?: Record<
      string,
      string | [string, string | ((version: string, name: string) => string)]
    >;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * the judgment is based on String.prototype.includes
     * @default true
     */
    autoGrant?: boolean;
  };
}

const installUserPath = '/__vite-plugin-monkey.install.user.js';
const cacheUserPath = 'node_modules/.vite/__vite-plugin-monkey.cache.user.js';

export default (pluginOption: MonkeyOption): Plugin => {
  // const logger = createLogger('plugin-monkey');
  const external: string[] = [];
  const globals: Record<string, string> = {};
  const cdnList: string[] = [];

  let config: ResolvedConfig;
  let isServe = true;
  const isHttps = () => !!config.server.https;
  const getPort = (() => {
    // 5173 come from https://github.com/vitejs/vite/blob/26bcdc3186807bb6f3817119cd7e64ae8308a057/packages/vite/src/node/server/index.ts#L612
    let availablePort = 5173;
    detectPort(availablePort).then((p) => {
      availablePort = p;
    });
    return () => config.server.port ?? availablePort;
  })();
  const getHost = () => {
    if (
      typeof config.server.host == 'string' &&
      config.server.host != '0.0.0.0'
    ) {
      return config.server.host;
    }
    return '127.0.0.1';
  };
  const getOrigin = () =>
    `${isHttps() ? 'https' : 'http'}://${getHost()}:${getPort()}`;
  const getInstallUrl = () => new URL(config.base, getOrigin()).href; //+ installUserPath;

  let fileName = 'monkey.user.js';
  if (pluginOption.build?.fileName) {
    fileName = pluginOption.build?.fileName;
  } else {
    fileName = packageJson.name + '.user.js';
  }

  const GM_keyword_set = new Set(GM_keywords);
  const autoGrantList: string[] = [];

  return {
    name: 'monkey',
    enforce: 'post',
    async config(config, { command }) {
      isServe = command == 'serve';
      for (const kv of Object.entries(
        pluginOption.build?.externalGlobals ?? {}
      )) {
        const [k, v] = kv;
        external.push(k);
        if (typeof v == 'string') {
          globals[k] = v;
        } else if (typeof v[1] == 'string') {
          globals[k] = v[0];
          cdnList.push(v[1]);
        } else if (typeof v[1] == 'function') {
          globals[k] = v[0];
          let version: string | undefined = undefined;
          try {
            const filePath = compatResolve(`${k}/package.json`);
            const modulePack: { version?: string } = JSON.parse(
              await fs.readFile(filePath, 'utf-8')
            );
            version = modulePack.version;
          } catch {
            logger.warn(`not found module ${k} version, use ${k}@latest`);
            version = 'latest';
          }
          if (version) {
            cdnList.push(v[1](version, k));
          }
        }
      }

      return {
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
      config = resolvedConfig;
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
      const { name = packageJson.name } = pluginOption.userscript;
      if (typeof prefix == 'string') {
        if (typeof name == 'string') {
          pluginOption.userscript.name = prefix + name;
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix + v;
          });
        }
      } else if (typeof prefix == 'function') {
        if (typeof name == 'string') {
          pluginOption.userscript.name = prefix(name);
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix(v);
          });
        }
      }

      // support dev env
      pluginOption.userscript.grant = '*';

      server.middlewares.use(async (req, res, next) => {
        let realHost = req.headers[':authority'] ?? req.headers['host'];
        if (realHost instanceof Array) {
          realHost = realHost[0];
        }
        if (!realHost) {
          logger.error('host not found');
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
              p.attribs['data-source'] !== 'vite-plugin-monkey'
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
                  Buffer.from(innerText, 'utf-8').toString('base64url')
                );
                return u.href;
              }
              return '';
            })
            .filter((s) => s);

          let realEntry = pluginOption.entry;
          if (path.isAbsolute(pluginOption.entry)) {
            realEntry = path.relative(config.root, pluginOption.entry);
            realEntry = realEntry.replace('\\', '/');
          }
          entryList.push(new URL(realEntry, origin).href);

          res.end(
            [
              userscript2comment(pluginOption.userscript, pluginOption.format),
              template2string(serverInjectTemplate, {
                entryList,
              }),
            ].join('\n\n')
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
          pluginOption.format
        );
        if (isFirstBoot()) {
        } else if (cacheComment != newComment) {
          openBrowser(getInstallUrl(), true, logger);
          logger.info('reopen, config comment has changed');
        }
        await fs.writeFile(cacheUserPath, newComment).catch();
      }
    },
    generateBundle(_, bundle) {
      if (isServe) {
        return;
      }

      // add cdn url
      if (cdnList.length > 0) {
        const { require } = pluginOption.userscript;
        if (typeof require == 'string') {
          pluginOption.userscript.require = [require, ...cdnList];
        } else if (require instanceof Array) {
          pluginOption.userscript.require = [...require, ...cdnList];
        } else {
          pluginOption.userscript.require = cdnList;
        }
      }

      if (autoGrantList.length > 0 && pluginOption.userscript.grant != '*') {
        const { grant } = pluginOption.userscript;
        if (typeof grant == 'string') {
          // @ts-ignore
          pluginOption.userscript.grant = Array.from(
            new Set([grant, ...autoGrantList])
          );
        } else if (grant instanceof Array) {
          // @ts-ignore
          pluginOption.userscript.grant = Array.from(
            new Set([...grant, ...autoGrantList])
          );
        } else {
          // @ts-ignore
          pluginOption.userscript.grant = autoGrantList;
        }
      }

      const bundleList = Object.entries(bundle);
      const cssBundleList = bundleList.filter(([k]) => k.endsWith('.css'));
      const jsBundleList = bundleList.filter(([k]) => k.endsWith('.js'));
      const cssTextList: string[] = [];
      cssBundleList.forEach(([k, v]) => {
        if (v.type == 'asset') {
          cssTextList.push(v.source.toString());
          delete bundle[k];
        }
      });
      let injectCssCode: undefined | string = undefined;
      if (cssTextList.length > 0) {
        injectCssCode = template2string(cssInjectTemplate, {
          cssText: cssTextList.join(''),
        });
      }

      if (jsBundleList.length != 1) {
        logger.error(`expcet js modules size is 1, got ${jsBundleList.length}`);
      } else {
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
        GM_keyword_set.size > 0
        // &&
        // [
        //   '.js',
        //   '.ts',
        //   '.mjs',
        //   '.cjs',
        //   '.json',
        //   '.vue',
        //   '.tsx',
        //   '.jsx',
        //   '.svelte',
        // ].some((ext) => id.endsWith(ext))
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
          `(__HMR_PROTOCOL__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.protocol === 'https:' ? 'wss' : 'ws'})()))`
        );

        // vite@v3 not need, see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L26
        code = code.replace(
          /__HMR_HOSTNAME__/g,
          `(__HMR_HOSTNAME__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.hostname})()))`
        );

        // vite@v3 not need, see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L29
        code = code.replace(
          /__HMR_PORT__/g,
          `(__HMR_PORT__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.prort})()))`
        );

        code = code.replace(
          /__BASE__/g,
          `((()=>{const b = __BASE__; const u = new URL(import.meta['url'], location.origin); return b !== '/' ? b : (u.origin+'/');})())`
        );

        // work with vite@3
        // see https://github.com/vitejs/vite/blob/v3.0.0/packages/vite/src/client/client.ts#L302
        code = code.replace(
          '`${location.protocol}//${hostAndPath}`',
          "`${new URL(import.meta['url'], location.origin).protocol}//${hostAndPath}`"
        );
      }
      return code;
    },
  };
};
