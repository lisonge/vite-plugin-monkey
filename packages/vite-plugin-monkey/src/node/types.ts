import type { FinalUserScript, Format, MonkeyUserScript } from './userscript';

export type IPromise<T> = T | Promise<T>;

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

export type PkgOptions = {
  name: string;
  version: string;
  importName: string;
  resolveName: string;
  resourceUrl: string;
  resourceName: string;
};

export type Pkg2UrlFn = (pkg: {
  name: string;
  version: string;
  importName: string;
  resolveName: string;
}) => IPromise<string>;

/**
 * @param importName 'name/subname' in example
 * @returns url or exportVarName
 * @example
 * const mod = await import('name/subname')
 */
export type Mod2UrlFn = (
  version: string,
  name: string,
  importName: string,
) => IPromise<string>;

export type Mod2UrlFn2 = (
  version: string,
  name: string,
  importName?: string,
  resolveName?: string,
) => string;

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
      nodeLoader?: string | ((pkgOptions: PkgOptions) => IPromise<string>);
    }
  | Array<
      | string
      | ((
          version: string,
          name: string,
          importName: string,
          resolveName: string,
        ) => IPromise<string>)
    >
>;

export type FinalMonkeyOption = {
  entry: string;
  format?: Format;
  userscript: FinalUserScript;
  clientAlias: string;
  server: {
    open: boolean;
    prefix: (name: string) => string;
    mountGmApi: boolean;
  };
  build: {
    fileName: string;
    metaFileName: string | boolean;
    autoGrant: boolean;
    minifyCss: boolean;
    externalGlobals: [string, IArray<string | Mod2UrlFn>][];
    externalResource: Record<
      string,
      {
        resourceUrl: Pkg2UrlFn;
        resourceName: Pkg2UrlFn;
        loader?: (pkgOptions: PkgOptions) => unknown;
        nodeLoader?: (pkgOptions: PkgOptions) => IPromise<string>;
      }
    >;
  };
  collectRequireUrls: string[];
  collectGrantSet: Set<string>;
  collectResource: Record<string, string>;
};

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
   * // your don't need to manually modify it
   * resolve: {
   *   alias: {
   *     [clientAlias]: 'vite-plugin-monkey/dist/client',
   *   },
   * }
   * @example
   * // vite-env.d.ts, you must manually modify vite-env.d.ts file for type hint
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
     * this object can be array or object, array=Object.entries(object)
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
     *  // youe need manually set userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js'], when command=='build'
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
     * [ // array structure, this example come from playground/ex-vue-demi
     *   [
     *     'vue',
     *     cdn
     *       .jsdelivr('Vue', 'dist/vue.global.prod.js')
     *       .concat('https://unpkg.com/vue-demi@latest/lib/index.iife.js')
     *       .concat(
     *         await util.fn2dataUrl(() => {
     *           window.Vue = Vue;
     *         }),
     *       ),
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
     * the judgment is based on String.prototype.includes, if code.includes('GM_xxx'), add \@grant GM_xxx to userscript
     * @default true
     */
    autoGrant?: boolean;

    /**
     * if you want minify all, just set viteConfig.build.minify=true
     * @default true
     */
    minifyCss?: boolean;

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
     *   'element-plus/dist/index.css': [ // compat externalGlobals cdn function
     *      (version, name, importName, resolveName)=>importName, // if (!!value) === false, plugin will use default value
     *      (version, name, importName, resolveName)=>`https://unpkg.com/${name}@${version}/${resolveName}`, // if (!!value) === false, plugin will use default value
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource;
  };
};
