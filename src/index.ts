import fs from 'fs';
import { Plugin, ResolvedConfig } from 'vite';
import {
  cssInjectTemplate,
  serverInjectTemplate,
  template2string,
} from './inject_template';
import { createLogger } from './logger';
import { openBrowser } from './open_browser';
import type { UserScript } from './user_script';
import { buildUserScript, GrantValueList } from './user_script';
import { isRestart } from './_restart';
export { GrantValueList };

export interface TampermonkeyPlusOption {
  entry: string;
  userscript: UserScript;
  server?: {
    /**
     * server.host and server.hmr.host
     * @default '127.0.0.1'
     */
    host?: string;

    /**
     * auto open *.user.js in default browser
     * @default true
     */
    open?: boolean;

    /**
     * name prefix
     * @default 'dev/'
     */
    prefix?: string | ((name: string) => string);
  };
  build?: {
    /**
     * @default 'tampermonkey.user.js'
     */
    fileName?: string;
    external?: Record<string, string | [string, string]>;
    // cdn?: 'jsdelivr' | 'unpkg' | ((name: string, version: string) => string);
  };
}

const devPath = '/__vite-plugin-tampermonkey-plus.install.user.js';
const cachePath = '/__vite-plugin-tampermonkey-plus.cache.user.js';

/**
 * litmit: host must be only one
 */
export default (option: TampermonkeyPlusOption): Plugin => {
  const { host = '127.0.0.1' } = option.server ?? {};
  const logger = createLogger('plugin-tampermonkey-plus');
  const external: string[] = [];
  const globals: Record<string, string> = {};
  const cdnList: string[] = [];
  // let cdnFunc: ((name: string, version: string) => string) | undefined =
  //   undefined;
  // if (option.build?.cdn == 'jsdelivr') {
  //   cdnFunc = jsdelivr;
  // } else if (option.build?.cdn == 'unpkg') {
  //   cdnFunc = unpkg;
  // }else if(typeof option.build?.cdn =='function'){
  //   cdnFunc = option.build?.cdn
  // }
  Object.entries(option.build?.external ?? {}).forEach(([k, v]) => {
    external.push(k);
    if (typeof v == 'string') {
      globals[k] = v;
    } else {
      globals[k] = v[0];
      cdnList.push(v[1]);
    }
  });

  let config: ResolvedConfig;
  let port = 3000;
  let isHttps = false;
  let isServe = true;
  let origin = '';
  let installUrl = '';
  return {
    name: 'tampermonkey-plus',
    enforce: 'post',
    config(config, { command }) {
      isServe = command == 'serve';
      return {
        build: {
          sourcemap: false,
          minify: false,
          rollupOptions: {
            external,
            output: {
              globals,
            },
          },
          lib: {
            entry: option.entry,
            formats: ['iife'],
            fileName: () => {
              return option.build?.fileName ?? 'tampermonkey.user.js';
            },
            name:
              'vite_plugin_tampermonkey_plus_' +
              Math.random().toString(16).slice(2),
          },
        },
        server: {
          host,
        },
      };
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
      port = config.server.port ?? 3000;
      isHttps = !!config.server.https;
      const hmr = {
        host,
        protocol: isHttps ? 'wss' : 'ws',
      };
      if (config.server.hmr && typeof config.server.hmr == 'object') {
        Object.assign(config.server.hmr, hmr);
      } else if (config.server.hmr !== false) {
        config.server.hmr = hmr;
      }
      origin = `${isHttps ? 'https' : 'http'}://${host}:${port}`;
      installUrl = origin + devPath;
      config.server.origin = origin;
    },
    configureServer(server) {
      // prefix name
      const prefix = option.server?.prefix ?? 'dev/';
      const { name } = option.userscript;
      if (typeof prefix == 'string') {
        if (typeof name == 'string') {
          option.userscript.name = prefix + name;
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix + v;
          });
        }
      } else if (typeof prefix == 'function') {
        if (typeof name == 'string') {
          option.userscript.name = prefix(name);
        } else {
          Object.entries(name).forEach(([k, v]) => {
            name[k] = prefix(v);
          });
        }
      }

      // support dev env
      option.userscript.grant = '*';

      // dev userscript middleware
      server.middlewares.use((req, res, next) => {
        if (req.url == devPath) {
          Object.entries({
            'access-control-allow-origin': '*',
            'access-control-expose-headers': '*',
            'content-type': 'text/javascript;\x20charset=utf-8',
          }).forEach(([k, v]) => {
            res.setHeader(k, v);
          });
          res.write(
            [
              buildUserScript(option.userscript),
              template2string(serverInjectTemplate, {
                origin,
                entry: option.entry,
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
      if (option.server?.open !== false) {
        let cacheComment = '';
        const cacheCommentPath = 'node_modules' + cachePath;
        if (fs.existsSync(cacheCommentPath)) {
          cacheComment = fs.readFileSync(cacheCommentPath).toString('utf-8');
        }
        const newComment = buildUserScript(option.userscript);
        if (!isRestart()) {
          openBrowser(installUrl, true, logger);
          fs.writeFile(cacheCommentPath, newComment, () => {});
          logger.info(installUrl, 500);
          isOutUrl = true;
        } else {
          if (cacheComment != newComment) {
            openBrowser(installUrl, true, logger);
            fs.writeFile(cacheCommentPath, newComment, () => {});
            logger.info('reopen, config comment has changed');
            logger.info(installUrl);
            isOutUrl = true;
          }
        }
      }
      if (!isOutUrl) {
        logger.info(installUrl, 500);
      }
    },
    generateBundle(_, bundle) {
      if (isServe) {
        return;
      }

      // add cdn url
      if (cdnList.length > 0) {
        const { require } = option.userscript;
        if (typeof require == 'string') {
          option.userscript.require = [require, ...cdnList];
        } else if (require instanceof Array) {
          option.userscript.require = [...require, ...cdnList];
        } else {
          option.userscript.require = cdnList;
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
      const injectCssCode = template2string(cssInjectTemplate, {
        cssTextList,
      });

      if (jsBundleList.length != 1) {
        logger.error(`expcet js modules size is 1, got ${jsBundleList.length}`);
      } else {
        const chunk = jsBundleList[0][1];
        if (chunk.type == 'chunk') {
          chunk.code =
            [
              buildUserScript(option.userscript),
              injectCssCode,
              chunk.code,
            ].join('\n\n') + ' \n';
        }
      }
    },
  };
};
