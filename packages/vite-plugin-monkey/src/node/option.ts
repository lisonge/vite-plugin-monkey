import { logger } from './_logger';
import { miniCode, projectPkg } from './_util';
import { jsdelivr } from './cdn';
import { fn2string } from './inject_template';
import type {
  FinalMonkeyOption,
  IArray,
  IPromise,
  Mod2UrlFn,
  MonkeyOption,
  Pkg2UrlFn,
  PkgOptions,
} from './types';

export const resolvedOption = (
  pluginOption: MonkeyOption,
): FinalMonkeyOption => {
  const build = pluginOption.build ?? {};

  if (build.minifyCss !== undefined) {
    logger.warn(
      `monkeyConfig.build.minifyCss is deprecated, use viteConfig.build.cssMinify in vite>=4.2.0`,
      { time: false },
    );
  }

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
          resourceName(pkg.version, pkg.name, pkg.importName, pkg.resolveName);
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
    webRequest = [],
    $extra = [],
  } = pluginOption.userscript ?? {};
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
  if (!(webRequest instanceof Array)) {
    webRequest = [webRequest];
  }

  const grantSet = new Set<string>();
  if (typeof grant == 'string') {
    grantSet.add(grant);
  } else if (grant instanceof Array) {
    grant.forEach((s) => grantSet.add(s));
  }

  const extra: [string, ...string[]][] = [];
  ($extra instanceof Array ? $extra : Object.entries($extra)).forEach(
    ([k, v]) => {
      extra.push([k, ...(v instanceof Array ? v : [v])]);
    },
  );

  const {
    icon64,
    icon64URL,
    icon,
    iconURL,
    namespace = `vite-plugin-monkey`,
    version = projectPkg.version,
    author = projectPkg.author ?? 'monkey',
    copyright,
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
    sandbox,
    unwrap = false,
  } = pluginOption.userscript ?? {};

  const { fileName = projectPkg.name + '.user.js' } = build;
  let { metaFileName } = build;
  if (typeof metaFileName == 'string') {
    const t = metaFileName;
    metaFileName = () => t;
  } else if (metaFileName === true) {
    metaFileName = () => fileName.replace(/\.user\.js$/, '.meta.js');
  } else if (metaFileName === false) {
    metaFileName = undefined;
  }

  const metaFileFc = metaFileName;

  const cssSideEffects =
    build.cssSideEffects ||
    (() => {
      return (e: string) => {
        // @ts-ignore
        if (typeof GM_addStyle == 'function') {
          // @ts-ignore
          GM_addStyle(e);
          return;
        }
        const o = document.createElement('style');
        o.textContent = e;
        document.head.append(o);
      };
    });

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
      copyright,
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
      $extra: extra,
      grant: grantSet,
      sandbox,
      unwrap,
      webRequest: webRequest.map((w) => JSON.stringify(w)),
    },
    clientAlias: pluginOption.clientAlias ?? '$',
    entry: pluginOption.entry,
    format: {
      align: pluginOption.format?.align ?? 2,
      generate: pluginOption.format?.generate ?? ((o) => o.userscript),
    },
    server: {
      mountGmApi: server.mountGmApi ?? false,
      open:
        server.open ??
        (process.platform == 'win32' || process.platform == 'darwin'),
      prefix: prefix2,
      closePreviewAutomatically: server.closePreviewAutomatically ?? false,
    },
    build: {
      fileName,
      metaFileName: metaFileFc ? () => metaFileFc(fileName) : undefined,
      autoGrant: build.autoGrant ?? true,
      externalGlobals: externalGlobals,
      externalResource: externalResource2,
    },
    collectRequireUrls: [],
    collectResource: {},
    globalsPkg2VarName: {},
    requirePkgList: [],
    systemjs: build.systemjs ?? jsdelivr()[1],
    cssSideEffects: async (css) => {
      const codeOrFc = await cssSideEffects(css);
      if (typeof codeOrFc == 'string') {
        return codeOrFc;
      }
      return miniCode(fn2string(codeOrFc, css), 'js');
    },
  };

  return config;
};
