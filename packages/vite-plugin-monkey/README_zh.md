# vite-plugin-monkey

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

[README](README.md) | [中文文档](README_zh.md)

一个 vite 插件，用来辅助开发 [Tampermonkey](https://www.tampermonkey.net/) 和 [Violentmonkey](https://violentmonkey.github.io/) 和 [Greasemonkey](https://www.greasespot.net/) 的脚本

## feature

- 支持 Tampermonkey 和 Violentmonkey 和 Greasemonkey 的脚本辅助开发
- 打包自动注入脚本配置头部注释
- 当 第一次启动 或 脚本配置注释改变时 自动在默认浏览器打开脚本安装
- 利用 @require 配置库的 cdn 的方案, 减少构建脚本大小
- 利用 @resource 配置外部资源 cdn 的方案, 额外减少构建脚本大小
- 通过 ESM 导入的方式使用 GM_api, 附带类型提示
- 预览模式下自动打开浏览器安装构建好的脚本
- 完全的 Typescript 和 Vite 的开发体验，比如模块热替换,秒启动

## quick usage (recommend)

使用方式与 vite create 一致

```shell
pnpm create monkey
# npm create monkey
# yarn create monkey
```

然后你能从以下模板选择

| JavaScript                                                     | TypeSript                                                            |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| [empty](/packages/create-monkey/template-empty) (only js)      | [empty-ts](/packages/create-monkey/template-empty-ts) (only ts)      |
| [vanilla](/packages/create-monkey/template-vanilla) (js + css) | [vanilla-ts](/packages/create-monkey/template-vanilla-ts) (ts + css) |
| [vue](/packages/create-monkey/template-vue)                    | [vue-ts](/packages/create-monkey/template-vue-ts)                    |
| [react](/packages/create-monkey/template-react)                | [react-ts](/packages/create-monkey/template-react-ts)                |
| [preact](/packages/create-monkey/template-preact)              | [preact-ts](/packages/create-monkey/template-preact-ts)              |
| [svelte](/packages/create-monkey/template-svelte)              | [svelte-ts](/packages/create-monkey/template-svelte-ts)              |
| [solid](/packages/create-monkey/template-solid)                | [solid-ts](/packages/create-monkey/template-solid-ts)                |

<details open>
  <summary>示例: 初始化模板</summary>

![vue-ts](https://github.com/lisonge/src/raw/main/img/2022-07-17_19-15-35.gif)

</details>

<details open>
  <summary>示例: 模块热替换</summary>

![hmr](https://github.com/lisonge/src/raw/main/img/2022-07-18_18-00-12.gif)

</details>

<details open>
  <summary>示例: 构建&预览</summary>

![build&preview](https://github.com/lisonge/src/raw/main/img/2022-08-15_11-02-58.gif)

</details>

## installation

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

要使 `vite serve` 正常工作, 你应该在 `工作目录` 添加一个 `index.html` 文件, 它的内容应该与 [index.html](/packages/create-monkey/template-empty-ts/index.html) 一致

## 配置

[MonkeyOption](/packages/vite-plugin-monkey/src/node/types.ts#L113)

<details open>
  <summary>MonkeyOption Type</summary>

```ts
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
     *         await util.encodeFn(() => {
     *           window.Vue = Vue;
     *         }, []),
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
     * check all require urls for availability, just http code is 2xx, never check http.body
     * @default false
     */
    checkCDN?: boolean;

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
     *      (version, name, importName, resolveName)=>importName,
     *      (version, name, importName, resolveName)=>`https://unpkg.com/${name}@${version}/${resolveName}`,
     *   ],
     *   'element-plus/dist/index.css': cdn.jsdelivr(),
     * }
     */
    externalResource?: ExternalResource;
  };
};
```

</details>

## externalGlobals cdn 工具

```js
// 使用示例
import { cdn } from 'vite-plugin-monkey';
const buildonfig = {
  externalGlobals: {
    'blueimp-md5': cdn.bytecdntp('md5', 'js/md5.min.js'),
  },
  externalResource: {
    'element-plus/dist/index.css': cdn.jsdelivr(),
  },
};
```

有以下 cdn 可使用，详情见 [cdn.ts](/packages/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](https://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)
- [bytecdntp](https://cdn.bytedance.com/)
- [bootcdn](https://www.bootcdn.cn/all/)
- [baomitu](https://cdn.baomitu.com/)
- [staticfile](https://staticfile.org/)
- [cdnjs](https://cdnjs.com/libraries)
- [zhimg](https://unpkg.zhimg.com/)

如果你想使用其他 cdn，请查看 [external-scripts](https://greasyfork.org/zh-CN/help/external-scripts)

## ESM GM_api

我们通过 esm 模块来使用 GM_api

```ts
import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement } from '$';
// $ 是 vite-plugin-monkey/dist/client 的别名, 你也可以设置其他别名

// 无论当前运行环境是开发环境还是构建环境, monkeyWindow 总是脚本作用域的 window
console.log(monkeyWindow);

GM_addElement && GM_addElement(document.body, 'div', { innerHTML: 'hello' });

// 无论当前运行环境是开发环境还是构建环境, unsafeWindow 总是宿主作用域的 window
if (unsafeWindow == window) {
  console.log('scope->host, esm mode');
} else {
  console.log('scope->monkey, iife mode');
}
GM_cookie &&
  GM_cookie.list({}, (cookies, error) => {
    if (error) {
      console.log(error);
    } else {
      const [cookie] = cookies;
      if (cookie) {
        console.log(cookie);
      }
    }
  });
```

## 例子

测试例子, 请直接看 [/playground](/playground)

preact/react/svelte/vanilla/vue/solid 的例子, 请直接看 [create-monkey](/packages/create-monkey)

## 注意

### [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

在 `vite serve` 模式下, 代码入口被作为 script 添加到目标环境 document.head, 代码需要在两个源之间正常工作

#### 对于 http header csp

你可以使用 [Tampermonkey](https://www.tampermonkey.net/) 然后打开插件配置 `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

在 `安全`, 设置 `如果站点有内容安全策略（CSP）则向其策略:` 为 `全部移除（可能不安全）`

具体情况请看 [issues/1](https://github.com/lisonge/vite-plugin-monkey/issues/1)

如果你使用 `Violentmonkey`/`Greasemonkey`, 你能通过以下方式解决

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - 在 `about:config` 菜单配置中，禁用 `security.csp.enable`

#### for html csp

- 利用 <https://wproxy.org/whistle/> 中间人攻击修改 html

- 如果 csp 允许 `*.xx.com` 这类域名, 你可以设置 `viteConfig.server.host=localhost.xx.com` 然后添加本地 dns `127.0.0.1 localhost.xx.com` 到你的 hosts 文件, 如果你需要伪装 https ca, 你可以使用 [mkcert](https://github.com/FiloSottile/mkcert)

- 通过 chrome-remote-interface [issues/1#issuecomment-1236060681](https://github.com/lisonge/vite-plugin-monkey/issues/1#issuecomment-1236060681)

### 通过 @require 加载的 IIFE 和 UMD 混用的问题

iife-cdn 使用 `var` 声明的变量在油猴脚本作用域下不会成为 window 的属性

因此如果一个 umd 库依赖了一个 iife 库, 例如 `element-plus` 依赖 `vue`, `element-plus` cdn 在这种情况下无法正常运行

详情见 [issues/5](https://github.com/lisonge/vite-plugin-monkey/issues/5) 或 [greasyfork#1084](https://github.com/JasonBarnabe/greasyfork/issues/1084)

解决方法是 在 iife-cdn 后面追加一个 dataUrl 脚本, 把 iife 声明的变量作为 window 的属性

```js
// 解决方案例子
import { cdn, util } from 'vite-plugin-monkey';
const buildonfig = {
  vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js').concat(
    await util.encodeFn(() => {
      // @ts-ignore
      window.Vue = Vue;
    }, []),
  ),
  'element-plus': cdn.jsdelivr('ElementPlus', 'dist/index.full.min.js'),
};
```

### Polyfill

由于 <https://github.com/vitejs/vite/issues/1639>, 你暂时不能使用 `@vitejs/plugin-legacy`

一种可行的方案是直接在 @require 加 cdn 去 polyfill

```ts
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      userscript: {
        require: [
          // polyfill 全部
          'https://cdn.jsdelivr.net/npm/core-js-bundle@latest/minified.js',
          // 或者使用 polyfill.io 智能 polyfill, 不过 polyfill.io 在大陆网络连通性很差, 几乎不能用
          // https://polyfill.io/v3/polyfill.min.js
          // 或者使用字节的cdn
          // https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/core-js/3.21.1/minified.min.js
        ],
      },
    }),
  ],
});
```
