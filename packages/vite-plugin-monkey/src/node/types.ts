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
    metaFileName?: (fileName: string) => string;
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
  hasDynamicImport: boolean;
  injectCssCode: string;
  globalsPkg2VarName: Record<string, string>;
  requirePkgList: { moduleName: string; url: string }[];
  systemjs: 'inline' | Mod2UrlFn2;
};

export type MonkeyOption = {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript?: MonkeyUserScript;
  format?: Format;

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
  server?: {
    /**
     * auto open install url in default browser when userscript comment change
     *
     * and set `viteConfig.server.open ??== monkeyConfig.server.open`
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
     * tree shaking code, then if code.includes('GM_xxx'), add \@grant GM_xxx to userscript
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
     * ![img](https://user-images.githubusercontent.com/38517192/222153432-f27e1f3d-af1e-4d7f-a370-60d6a2eefb57.png)
     *
     * @default
     * cdn.jsdelivr()[1]
     */
    systemjs?: 'inline' | Mod2UrlFn2;
  };
};
