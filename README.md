# vite-plugin-monkey

[README](README.md) | [中文文档](README_zh.md)

vite plugin server and build \*.user.js for [Tampermonkey](https://www.tampermonkey.net/) and [Violentmonkey](https://violentmonkey.github.io/) and [Greasemonkey](https://www.greasespot.net/)

## feature

- support Tampermonkey and Violentmonkey and Greasemonkey
- inject userscript comment to build bundle
- auto open \*.user.js in default browser when userscript change
- external cdn url inject to userscript @require
- full typescript support and vite feature

## quick usage

just use <https://github.com/lisonge/vite-userscript-template.git>

## install

```shell
pnpm add -D vite-plugin-monkey
# or by npm i -D vite-plugin-monkey
# or by yarn add -D vite-plugin-monkey
```

plugin [dependencies](./package.json#L81) use fixed versions, you can install plugin by npm/yarn/pnpm and don't worry about the missing of lock.file

## config

[MonkeyOption](./src/index.ts#L29)

```ts
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
```

[MonkeyUserScript](./src/userscript/index.ts#L138)

```ts
/**
 * UserScript, merge metadata from Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork
 */
export type MonkeyUserScript = GreasemonkeyUserScript &
  TampermonkeyUserScript &
  ViolentmonkeyUserScript &
  GreasyforkUserScript &
  MergemonkeyUserScript;
```

- [GreasemonkeyUserScript](./src/userscript/greasemonkey.ts#L38)
- [TampermonkeyUserScript](./src/userscript/tampermonkey.ts#L77)
- [ViolentmonkeyUserScript](./src/userscript/violentmonkey.ts#L81)
- [GreasyforkUserScript](./src/userscript/index.ts#L33)
- [MergemonkeyUserScript](./src/userscript/index.ts#L61)

[Format](./src/userscript/common.ts#L12)

```ts
/**
 * format userscript comment
 */
export type Format = {
  /**
   * @description note font_width/font_family, suggest fixed-width font
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

export type AlignFunc = (
  p0: [string, ...string[]][]
) => [string, ...string[]][];
```

## example

see [test/example/vite.config.ts](./test/example/vite.config.ts)

build file see [test/example/dist/example-project.user.js](./test/example/dist/example-project.user.js)

another simple example <https://github.com/lisonge/vite-userscript-template.git>

### example with vue

- <https://github.com/lisonge/op-wiki-plus>

## note

### CSP

in most cases, this problem does not occur, but some website like <https://github.com/lisonge/vite-plugin-monkey/issues/1> will appear

in dev server, userscript will run between two origin

so if host enable [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), you can solve it in the following ways

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - disable `security.csp.enable` in the `about:config` menu

in the high version of chrome/edge, above extension will not work

you can use [Tampermonkey](https://www.tampermonkey.net/) then open `extension://iikmkjmpaadaobahmlepeloendndfphd/options.html#nav=settings`

at `Security`, set `Modify existing content security policy (CSP) headers` to `Remove entirely (possibly unsecure)`

### Polyfill

because of <https://github.com/vitejs/vite/issues/1639>, now you can not use `@vitejs/plugin-legacy`

the following is a feasible solution by @require cdn

```ts
import { defineConfig } from 'vite';
import monkeyPlugin from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue(),
    monkeyPlugin({
      userscript: {
        require: [
          // polyfill all
          'https://cdn.jsdelivr.net/npm/core-js-bundle@latest/minified.js',
          // or use polyfill.io
          // https://polyfill.io/v3/polyfill.min.js
        ],
      },
    }),
  ],
});
```
