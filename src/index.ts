import fs from 'fs';
import path from 'path';
import type { Plugin, ResolvedConfig } from 'vite';
import {
  cssInjectTemplate,
  serverInjectTemplate,
  template2string,
} from './inject_template';
import { openBrowser } from './open_browser';
import type {
  MonkeyUserScript,
  Format,
  GreasemonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
} from './userscript';
import { userscript2comment } from './userscript';
import { logger } from './_logger';
import { GM_keywords, isRestart, packageJson } from './_util';
import selfPackageJson from '../package.json';

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
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list
     * @default 'dev:'
     */
    prefix?: string | ((name: string) => string);
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

const devPath = '/__vite-plugin-monkey.install.user.js';
const cachePath = '/__vite-plugin-monkey.cache.user.js';

export default (pluginOption: MonkeyOption): Plugin => {
  // const logger = createLogger('plugin-monkey');
  const external: string[] = [];
  const globals: Record<string, string> = {};
  const cdnList: string[] = [];

  let config: ResolvedConfig;
  let isServe = true;
  const isHttps = () => !!config.server.https;
  const getPort = () => config.server.port ?? 3000;
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
  const getInstallUrl = () => getOrigin() + devPath;

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
            const filePath = require.resolve(`${k}/package.json`);
            const modulePack: { version?: string } = JSON.parse(
              fs.readFileSync(filePath, 'utf-8')
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
        build: {
          sourcemap: config.build?.sourcemap ?? false,
          minify: config.build?.minify ?? false,
          rollupOptions: {
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
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      const { server } = resolvedConfig;

      server.host = getHost();
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
    configureServer(server) {
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

      // dev userscript middleware
      server.middlewares.use((req, res, next) => {
        let realHost = req.headers[':authority'] ?? req.headers['host'];
        if (!realHost) {
          logger.error('host not found');
        } else if (realHost instanceof Array) {
          realHost = realHost[0];
        }
        if (req.url == devPath && realHost) {
          Object.entries({
            'access-control-allow-origin': '*',
            'access-control-expose-headers': '*',
            'content-type': 'text/javascript;\x20charset=utf-8',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });

          let realEntry = pluginOption.entry;
          if (path.isAbsolute(pluginOption.entry)) {
            realEntry = path.relative(config.root, pluginOption.entry);
            realEntry = realEntry.replace('\\', '/');
          }

          res.write(
            [
              userscript2comment(pluginOption.userscript, pluginOption.format),
              template2string(serverInjectTemplate, {
                origin: `${isHttps() ? 'https' : 'http'}://${realHost}`,
                entry: realEntry,
              }),
            ].join('\n\n')
          );
          res.end();
        } else {
          next();
        }
      });

      // according to the change of final UserScript text, open install url in Browser
      let isOutUrl = false;
      const u = getInstallUrl();
      if (pluginOption.server?.open !== false) {
        let cacheComment = '';
        const cacheCommentPath = 'node_modules' + cachePath;
        if (fs.existsSync(cacheCommentPath)) {
          cacheComment = fs.readFileSync(cacheCommentPath).toString('utf-8');
        }
        const newComment = userscript2comment(
          pluginOption.userscript,
          pluginOption.format
        );
        if (!isRestart()) {
          openBrowser(u, true, logger);
          fs.writeFile(cacheCommentPath, newComment, () => {});
          logger.info(u, 500);
          isOutUrl = true;
        } else {
          if (cacheComment != newComment) {
            openBrowser(u, true, logger);
            fs.writeFile(cacheCommentPath, newComment, () => {});
            logger.info('reopen, config comment has changed');
            logger.info(u);
            isOutUrl = true;
          }
        }
      }
      if (!isOutUrl) {
        logger.info(u, 500);
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
      if (cssTextList?.length > 0) {
        injectCssCode = template2string(cssInjectTemplate, {
          cssTextList,
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
      if (isServe && id.endsWith('node_modules/vite/dist/client/client.mjs')) {
        // use import.meta['url'] instead of import.meta.url, because vite will replace import.meta.url to file system path
        code = code.replace(
          /__HMR_PROTOCOL__/g,
          `(__HMR_PROTOCOL__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.protocol === 'https:' ? 'wss' : 'ws'})()))`
        );
        code = code.replace(
          /__HMR_HOSTNAME__/g,
          `(__HMR_HOSTNAME__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.hostname})()))`
        );
        code = code.replace(
          /__HMR_PORT__/g,
          `(__HMR_PORT__ || ((()=>{const u = new URL(import.meta['url'], location.origin);return u.prort})()))`
        );
        code = code.replace(
          /__BASE__/g,
          `((()=>{const b = __BASE__; const u = new URL(import.meta['url'], location.origin); return b !== '/' ? b : (u.origin+'/');})())`
        );
      }
      return code;
    },
  };
};
