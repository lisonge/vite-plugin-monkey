import type { PluginOption } from 'vite';
import autoGrantPlugin from './plugins/autoGrant';
import externalGlobalsPlugin from './plugins/externalGlobals';
import externalLoaderPlugin from './plugins/externalLoader';
import externalResourcePlugin from './plugins/externalResource';
import extraToBundlePlugin from './plugins/extraToBundle';
import fixVitePlugin from './plugins/fixVite';
import perviewPlugin from './plugins/perview';
import serverPlugin from './plugins/server';
import virtualHtmlPlugin from './plugins/virtualHtml';
import windowPlugin from './plugins/window';
import fixAsset from './plugins/fixAsset';
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
import { projectPkg } from './_util';

export * as cdn from './cdn';
export * as util from './util';
export type {
  MonkeyUserScript,
  TampermonkeyUserScript,
  ViolentmonkeyUserScript,
  GreasemonkeyUserScript,
  Format,
  MonkeyOption,
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
    let prefix2: (name: string) => string = (s) => 'server:' + s;
    if (typeof prefix == 'function') {
      prefix2 = prefix;
    } else if (typeof prefix == 'string') {
      prefix2 = () => prefix;
    } else if (prefix === false) {
      prefix2 = (name: string) => name;
    }
    const externalGlobals2 = build?.externalGlobals ?? {};
    const externalGlobals: [string, IArray<string | Mod2UrlFn>][] = [];
    if (externalGlobals2 instanceof Array) {
      externalGlobals2.forEach((s) => externalGlobals.push(s));
    } else {
      Object.entries(externalGlobals2).forEach((s) => externalGlobals.push(s));
    }

    let {
      name = {},
      description = {},
      'exclude-match': excludeMatch = [],
      match = [],
      exclude = [],
      include = [],
      antifeature = [],
      require = [],
      connect = [],
      grant = [],
      $extra = [],
    } = pluginOption.userscript;
    if (typeof name == 'string') {
      name = { '': name };
    } else if (!('' in name)) {
      name = { '': projectPkg.name, ...name };
    }
    if (typeof description == 'string') {
      description = {
        '': description,
      };
    } else if (!('' in description) && projectPkg.description) {
      description = { '': projectPkg.description, ...description };
    }
    if (!(excludeMatch instanceof Array)) {
      excludeMatch = [excludeMatch];
    }
    if (!(match instanceof Array)) {
      match = [match];
    }
    if (!(exclude instanceof Array)) {
      exclude = [exclude];
    }
    if (!(include instanceof Array)) {
      include = [include];
    }
    if (!(antifeature instanceof Array)) {
      antifeature = [antifeature];
    }
    if (!(require instanceof Array)) {
      require = [require];
    }
    if (!(connect instanceof Array)) {
      connect = [connect];
    }

    const grantSet = new Set<string>();
    if (typeof grant == 'string') {
      grantSet.add(grant);
    } else if (grant instanceof Array) {
      grant.forEach((s) => grantSet.add(s));
    }
    if (!($extra instanceof Array)) {
      const t: [string, string][] = [];
      Object.entries($extra).forEach(([k, v]) => {
        if (v instanceof Array) {
          v.forEach((v2) => {
            t.push([k, v2]);
          });
        } else {
          t.push([k, v]);
        }
      });
      $extra = t;
    }

    const {
      icon64,
      icon64URL,
      icon,
      iconURL,
      namespace,
      version = projectPkg.version,
      author = projectPkg.author ?? 'monkey',
      downloadURL,
      defaulticon,
      contributionURL,
      updateURL,
      supportURL = projectPkg.bugs,
      homepageURL = projectPkg.homepage,
      homepage = projectPkg.homepage,
      website,
      license = projectPkg.license,
      incompatible,
      source = projectPkg.repository,
      resource = {},
      noframes = false,
      'run-at': runAt,
      'inject-into': injectInto,
      contributionAmount,
      compatible,
    } = pluginOption.userscript;

    const { sourcemap = {}, fileName = projectPkg.name + '.user.js' } =
      pluginOption.build ?? {};
    let { metaFileName } = pluginOption.build ?? {};
    if (typeof metaFileName == 'string') {
      const t = metaFileName;
      metaFileName = () => t;
    } else if (metaFileName === true) {
      metaFileName = () => fileName.replace(/\.user\.js$/, '.meta.js');
    } else if (metaFileName === false) {
      metaFileName = undefined;
    }

    const config: FinalMonkeyOption = {
      userscript: {
        name,
        namespace,
        version,
        icon64,
        icon64URL,
        icon,
        iconURL,
        author,
        downloadURL,
        defaulticon,
        contributionURL,
        updateURL,
        supportURL,
        homepageURL,
        homepage,
        website,
        license,
        incompatible,
        source,
        resource,
        noframes,
        'run-at': runAt,
        'inject-into': injectInto,
        contributionAmount,
        compatible,
        'exclude-match': excludeMatch.map((s) => String(s)),
        match: match.map((s) => String(s)),
        include: include.map((s) => String(s)),
        exclude: exclude.map((s) => String(s)),
        antifeature,
        require,
        connect,
        description,
        $extra,
        grant: grantSet,
      },
      clientAlias: pluginOption.clientAlias ?? '$',
      entry: pluginOption.entry,
      format: pluginOption.format,
      server: {
        mountGmApi: server.mountGmApi ?? false,
        open: server.open ?? true,
        prefix: prefix2,
      },
      build: {
        fileName,
        metaFileName,
        autoGrant: build.autoGrant ?? true,
        minifyCss: build.minifyCss ?? true,
        externalGlobals: externalGlobals,
        externalResource: externalResource2,
        sourcemap: {
          offset: sourcemap.offset ?? 0,
          sourceRoot:
            sourcemap.sourceRoot ?? `/${namespace}/${name[''] ?? 'name'}/`,
        },
      },
      collectGrantSet: new Set(),
      collectRequireUrls: [],
      collectResource: {},
    };
    return config;
  })();

  const monkeyPlugin: PluginOption = {
    name: 'monkey',
    async config(userConfig, { command }) {
      const isServe = command == 'serve';
      let sourcemap = userConfig.build?.sourcemap;
      if (sourcemap === undefined) {
        if (pluginOption.build?.sourcemap) {
          sourcemap = 'inline';
        } else {
          sourcemap = false;
        }
      }

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
          sourcemap: sourcemap,
          minify: userConfig.build?.minify ?? false,
          rollupOptions: {
            // serve pre-bundling need
            input: finalPluginOption.entry,
          },
          lib: {
            entry: finalPluginOption.entry,
            formats: ['iife'],
            fileName: () => {
              return finalPluginOption.build.fileName;
            },
            name: '__plugin_monkey_exposed',
          },
        },
      };
    },
  };

  return [
    monkeyPlugin,
    fixVitePlugin(finalPluginOption),
    serverPlugin(finalPluginOption),
    autoGrantPlugin(finalPluginOption),
    externalGlobalsPlugin(finalPluginOption),
    externalLoaderPlugin(finalPluginOption),
    externalResourcePlugin(finalPluginOption),
    extraToBundlePlugin(finalPluginOption),
    virtualHtmlPlugin(finalPluginOption),
    perviewPlugin(finalPluginOption),
    windowPlugin(finalPluginOption),
    fixAsset(finalPluginOption),
  ];
};
