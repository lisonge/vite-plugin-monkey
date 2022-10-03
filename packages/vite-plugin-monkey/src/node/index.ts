import type { PluginOption } from 'vite';
import autoGrantPlugin from './plugins/autoGrant';
import checkCdnPlugin from './plugins/checkCdn';
import externalGlobalsPlugin from './plugins/externalGlobals';
import externalLoaderPlugin from './plugins/externalLoader';
import externalResourcePlugin from './plugins/externalResource';
import extraToBundlePlugin from './plugins/extraToBundle';
import fixVitePlugin from './plugins/fixVite';
import serverPlugin from './plugins/server';
import miniClientPlugin from './plugins/miniClient';
import addHtml from './plugins/addHtml';
import type {
  FinalMonkeyOption,
  IArray,
  IPromise,
  Mod2UrlFn,
  MonkeyOption,
  Pkg2UrlFn,
  PkgOptions,
} from './types';
import type {
  Format,
  GreasemonkeyUserScript,
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
} from './userscript';
import { mergeObj, projectPkg } from './_util';

export * as cdn from './cdn';
export * as util from './util';
export type {
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  GreasemonkeyUserScript,
  Format,
};

export default (pluginOption: MonkeyOption): PluginOption => {
  const finalPluginOption = (() => {
    const build = pluginOption.build ?? {};

    const { externalResource = {} } = build;
    const externalResource2: Record<
      string,
      {
        resourceUrl: Pkg2UrlFn;
        resourceName: Pkg2UrlFn;
        loader?: (pkgOptions: PkgOptions) => unknown;
        nodeLoader?: (pkgOptions: PkgOptions) => IPromise<string>;
      }
    > = {};

    for (const [k, v] of Object.entries(externalResource)) {
      if (typeof v == 'string') {
        externalResource2[k] = {
          resourceName: () => k,
          resourceUrl: () => v,
        };
      } else if (typeof v == 'function') {
        externalResource2[k] = {
          resourceName: () => k,
          resourceUrl: v,
        };
      } else if (v instanceof Array) {
        let resourceUrl2: Pkg2UrlFn;
        let resourceName2: Pkg2UrlFn = () => k;
        const [resourceName, resourceUrl] = v;
        if (typeof resourceName == 'string') {
          resourceName2 = (pkg) => resourceName || pkg.importName;
        } else {
          resourceName2 = (pkg) =>
            resourceName(
              pkg.version,
              pkg.name,
              pkg.importName,
              pkg.resolveName,
            );
        }
        if (typeof resourceUrl == 'string') {
          resourceUrl2 = () => resourceUrl;
        } else {
          resourceUrl2 = (pkg) =>
            resourceUrl(pkg.version, pkg.name, pkg.importName, pkg.resolveName);
        }
        externalResource2[k] = {
          resourceName: resourceName2,
          resourceUrl: resourceUrl2,
        };
      } else {
        const { resourceUrl, loader, nodeLoader, resourceName } = v;
        let resourceUrl2: Pkg2UrlFn;
        let resourceName2: Pkg2UrlFn = () => k;
        let nodeLoader2:
          | undefined
          | ((pkgOptions: PkgOptions) => IPromise<string>) = undefined;
        if (typeof resourceUrl == 'string') {
          resourceUrl2 = () => resourceUrl;
        } else {
          resourceUrl2 = resourceUrl;
        }
        if (typeof resourceName == 'string') {
          resourceName2 = () => resourceName;
        } else if (typeof resourceName == 'function') {
          resourceName2 = resourceName;
        }
        if (typeof nodeLoader == 'function') {
          nodeLoader2 = nodeLoader;
        } else if (typeof nodeLoader == 'string') {
          nodeLoader2 = () => nodeLoader;
        }
        externalResource2[k] = {
          resourceName: resourceName2,
          resourceUrl: resourceUrl2,
          loader,
          nodeLoader: nodeLoader2,
        };
      }
    }

    const server = pluginOption.server ?? {};

    const { prefix } = server;
    let prefix2: (name: string) => string = (s) => 'dev:' + s;
    if (typeof prefix == 'function') {
      prefix2 = prefix;
    } else if (typeof prefix == 'string') {
      prefix2 = () => prefix;
    }
    const externalGlobals2 = build?.externalGlobals ?? {};
    const externalGlobals: [string, IArray<string | Mod2UrlFn>][] = [];
    if (externalGlobals2 instanceof Array) {
      externalGlobals2.forEach((s) => externalGlobals.push(s));
    } else {
      Object.entries(externalGlobals2).forEach((s) => externalGlobals.push(s));
    }
    const config: FinalMonkeyOption = {
      userscript: mergeObj(pluginOption.userscript, {
        name: projectPkg.name,
        version: projectPkg.version,
        author: projectPkg.author ?? 'monkey',
      }),
      clientAlias: '$',
      entry: pluginOption.entry,
      format: pluginOption.format,
      server: {
        mountGmApi: server.mountGmApi ?? false,
        open: server.open ?? true,
        prefix: prefix2,
      },
      build: {
        fileName: build.fileName ?? projectPkg.name + '.user.js',
        metaFileName: build.metaFileName ?? false,
        autoGrant: build.autoGrant ?? true,
        checkCDN: build.checkCDN ?? false,
        minifyCss: build.minifyCss ?? true,
        externalGlobals: externalGlobals,
        externalResource: externalResource2,
      },
    };
    return config;
  })();

  const monkeyPlugin: PluginOption = {
    name: 'monkey',
    async config(userConfig, { command }) {
      const isServe = command == 'serve';

      return {
        resolve: {
          alias: {
            [finalPluginOption.clientAlias]: 'vite-plugin-monkey/dist/client',
          },
        },
        define: {
          'process.env.NODE_ENV':
            userConfig.define?.['process.env.NODE_ENV'] ??
            JSON.stringify(
              userConfig.mode ?? (isServe ? 'development' : 'production'),
            ),
        },
        build: {
          sourcemap: false,
          minify: userConfig.build?.minify ?? false,
          rollupOptions: {
            input: finalPluginOption.entry,
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
  };

  return [
    monkeyPlugin,
    fixVitePlugin(finalPluginOption),
    serverPlugin(finalPluginOption),
    miniClientPlugin(finalPluginOption),
    autoGrantPlugin(finalPluginOption),
    externalGlobalsPlugin(finalPluginOption),
    externalLoaderPlugin(finalPluginOption),
    externalResourcePlugin(finalPluginOption),
    checkCdnPlugin(finalPluginOption),
    extraToBundlePlugin(finalPluginOption),
    addHtml(finalPluginOption),
  ];
};
