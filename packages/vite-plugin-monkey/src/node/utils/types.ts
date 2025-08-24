import type { Plugin } from 'vite';
import type { FinalUserScript, MonkeyUserScript } from '../userscript';

export type Thenable<T> = T | Promise<T>;

export type IArray<T = unknown> = T | T[];

/**
 * key is language code or ''
 * @see https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
 * @example
 * {
 *   '':'default_name',
 *   'zh-CN':'名字',
 *   ja: '名前'
 * }
 */
export type LocaleType<T = unknown> = Record<string, T>;

export interface PkgOptions {
  name: string;
  version: string;
  dynamic: boolean;
  importName: string;
  resolveName: string;
  resourceUrl: string;
  resourceName: string;
}

export interface Pkg2UrlFn {
  (pkg: {
    name: string;
    version: string;
    importName: string;
    resolveName: string;
  }): Thenable<string>;
}

/**
 * @param importName 'name/subname' in example
 * @returns url or exportVarName
 * @example
 * const mod = await import('name/subname')
 */
export interface Mod2UrlFn {
  (version: string, name: string, importName: string): Thenable<string>;
}

export interface ModuleToUrlFc {
  (
    version: string,
    name: string,
    importName?: string,
    resolveName?: string,
  ): string;
}

export type ExternalGlobals =
  | Record<string, IArray<string | Mod2UrlFn>>
  | [string, IArray<string | Mod2UrlFn>][];

export type ExternalResource = Record<
  string,
  | string
  | Pkg2UrlFn
  | {
      resourceUrl: Pkg2UrlFn | string;
      /**
       * @default importName
       */
      resourceName?: Pkg2UrlFn | string;
      loader?: (pkgOptions: PkgOptions) => unknown;
      nodeLoader?: string | ((pkgOptions: PkgOptions) => Thenable<string>);
    }
  | Array<
      | string
      | ((
          version: string,
          name: string,
          importName: string,
          resolveName: string,
        ) => Thenable<string>)
    >
>;

export interface ResolvedMonkeyOption {
  entry: string;
  align: number;
  generate: (uOptions: {
    userscript: string;
    mode: `serve` | `build` | `meta`;
  }) => Thenable<string>;
  userscript: FinalUserScript;
  clientAlias: string;
  server: {
    open: boolean;
    prefix: (name: string) => string;
    mountGmApi: boolean;
  };
  build: {
    fileName: string;
    metaFileName?: () => string;
    autoGrant: boolean;
    externalGlobals: [string, IArray<string | Mod2UrlFn>][];
    externalResource: Record<
      string,
      {
        resourceUrl: Pkg2UrlFn;
        resourceName: Pkg2UrlFn;
        loader?: (pkgOptions: PkgOptions) => unknown;
        nodeLoader?: (pkgOptions: PkgOptions) => Thenable<string>;
      }
    >;
  };
  collectRequireUrls: string[];
  collectResource: Record<string, string>;
  globalsPkg2VarName: Record<string, string>;
  requirePkgList: { moduleName: string; url: string }[];
  systemjs: 'inline' | ModuleToUrlFc;
  cssSideEffects?: string | ((css: string) => void);
}

export interface MonkeyOption {
  /**
   * userscript entry file path
   */
  entry: string;

  /**
   * userscript comment
   */
  userscript?: MonkeyUserScript;

  /**
   * @deprecated use {@link align} or {@link generate} instead
   */
  format?: {
    /**
     * @deprecated use {@link align} instead
     */
    align?: unknown;

    /**
     * @deprecated use {@link generate} instead
     */
    generate?: unknown;
  };

  /**
   * align userscript comment
   * @default 2
   */
  align?: number | false;

  /**
   * custom generate userscript comment
   */
  generate?: (options: {
    userscript: string;
    mode: `serve` | `build` | `meta`;
  }) => Thenable<string>;

  /**
   * alias of vite-plugin-monkey/dist/client
   * @default '$'
   * @example
   * // vite-env.d.ts for type hint
   *
   * // if you use default value `$`
   * /// <reference types="vite-plugin-monkey/client" />
   *
   * // if you use other_alias
   * declare module other_alias {
   *   export * from 'vite-plugin-monkey/dist/client';
   * }
   */
  clientAlias?: string;

  /**
   * handle CSS imports as style nodes([HTMLStyleElement](https://developer.mozilla.org/docs/Web/API/HTMLStyleElement))
   *
   * If you use [Shadow DOM](https://developer.mozilla.org/docs/Web/API/Web_components/Using_shadow_DOM) (style isolation) to place your interface application, this is very useful.
   *
   * Support `.css?style`, `.less?style`, `.sass?style`, `.scss?style`, `.styl?style`, `.stylus?style`, `.pcss?style`, `.postcss?style` and `.sss?style` imports
   *
   * add `/// <reference types="vite-plugin-monkey/style" />` to vite-env.d.ts for type hint
   *
   * @example
   * import style1 from './style1.css?style':
   * import style2 from 'normalize.css?style';
   * const container = document.createElement('div').attachShadow({ mode: 'open' });
   * container.append(style1, style2); // with hmr when change style1.css
   * const style3 = style1.cloneNode(true); // it will still have hmr
   *
   * @default
   * true
   */
  styleImport?: boolean;

  server?: {
    /**
     * auto open install url in default browser when userscript comment change
     *
     * and set `viteConfig.server.open ??= monkeyConfig.server.open`
     * @default
     * process.platform == 'win32' || process.platform == 'darwin' // if platform is Win/Mac
     */
    open?: boolean;

    /**
     * name prefix, distinguish server.user.js and build.user.js in monkey extension install list, if you not want prefix, set false
     * @default 'server:'
     */
    prefix?: string | ((name: string) => string) | false;

    /**
     * mount GM_api to unsafeWindow, not recommend it, you should use GM_api by ESM import, or use [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)
     * @default false
     * @example
     * // if set true, you can use `vite-plugin-monkey/global` for type hint
     * // vite-env.d.ts
     * /// <reference types="vite-plugin-monkey/global" />
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
     *
     * @default false
     */
    metaFileName?: string | boolean | ((fileName: string) => string);

    /**
     * this config can be array or object, array=Object.entries(object)
     *
     * if value is string or function, it or its return value is exportVarName
     *
     * if value is Array, the first [item or its return value] is exportVarName, the items after it all are url that is [require url]
     *
     * if module is unimported, plugin will not add require url to userscript
     *
     * @example
     * { // map structure
     *  vue:'Vue',
     *  // if set this
     *  // you need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js'], when `vite build`
     *
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // plugin will auto add this url to userscript.require
     *
     *  'prettier/parser-babel': [
     *    'prettierPlugins.babel',
     *    (version, name, importName) => {
     *      // name == `prettier`
     *      // importName == `prettier/parser-babel`
     *      const subpath = `${importName.split('/').at(-1)}.js`;
     *      return `https://cdn.jsdelivr.net/npm/${name}@${version}/${subpath}`;
     *    },
     *  ],
     *  // sometimes importName deffers from package name
     * }
     * @example
     * [ // array structure, this example come from [playground/ex-vue-demi](https://github.com/lisonge/vite-plugin-monkey/tree/main/playground/ex-vue-demi)
     *   [
     *     'vue',
     *     cdn
     *       .jsdelivr('Vue', 'dist/vue.global.prod.js')
     *       .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
     *       .concat(util.dataUrl('window.Vue=Vue')),
     *   ],
     *   ['pinia', cdn.jsdelivr('Pinia', 'dist/pinia.iife.prod.js')],
     *   [
     *     'element-plus',
     *     cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
     *   ],
     * ]
     */
    externalGlobals?: ExternalGlobals;

    /**
     * according to final code bundle, auto inject GM_* or GM.* to userscript comment grant
     *
     * @default true
     */
    autoGrant?: boolean;

    /**
     * @example
     * {  // resourceName default value is pkg.importName
     *   'element-plus/dist/index.css': pkg=>`https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *   'element-plus/dist/index.css': {
     *     resourceName: pkg=>pkg.importName,
     *     resourceUrl: pkg=>`https://unpkg.com/${pkg.name}@${pkg.version}/${pkg.resolveName}`,
     *     loader: pkg=>{ // there are default loaders that support [css, json, the assets that vite support, ?url, ?raw] file/name suffix
     *        const css = GM_getResourceText(pkg.resourceName);
     *        GM_addStyle(css);
     *        return css;
     *     },
     *     nodeLoader: pkg=>{
     *        return [
     *          `export default (()=>{`,
     *          `const css = GM_getResourceText(${JSON.stringify(pkg.resourceName)});`,
     *          `GM_addStyle(css);`,
     *          `return css;`,
     *          `})();`
     *        ].join('');
     *     },
     *   },
     *   'element-plus/dist/index.css': [
     *      (version, name, importName, resolveName)=>importName,
     *      (version, name, importName, resolveName)=>`https://unpkg.com/${name}@${version}/${resolveName}`,
     *       // for compat externalGlobals cdn function, if (version/name/importName/resolveName) == '', plugin will use their own default values
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource;

    /**
     * when use dynamic-import, plugin will use systemjs build your code
     *
     * `cdn.jsdelivr()[1]` example -> [dynamic-import.user.js](https://github.com/lisonge/vite-plugin-monkey/blob/7645b185605faf9b48c43116db5ea01726188e03/playground/dynamic-import/dist/dynamic-import.user.js)
     *
     * `'inline'` exmple -> [test-v3.user.js](https://github.com/lisonge/vite-plugin-monkey/blob/7645b185605faf9b48c43116db5ea01726188e03/playground/test-v3/dist/test-v3.user.js)
     *
     * @default
     * cdn.jsdelivr()[1]
     */
    systemjs?: 'inline' | ModuleToUrlFc;

    /**
     * @default
     * const importCss = (css: string): void => {
     *   if (typeof GM_addStyle === 'function') {
     *     GM_addStyle(css);
     *   } else {
     *     document.head.appendChild(document.createElement('style')).append(css)
     *   }
     * };
     * @example
     * // example1
     * importCss.toString()
     *
     * // example2
     * `(a)=>GM_addStyle(a)`
     */
    cssSideEffects?: string | ((css: string) => void);
  };
}

export interface MonkeyPluginFactory {
  (
    getOption: () => Promise<ResolvedMonkeyOption>,
    pluginOption: MonkeyOption,
  ): Plugin | undefined;
}
