# vite-plugin-monkey

vite plugin server and build \*.user.js for Tampermonkey and Violentmonkey and Greasemonkey

## feature

- support Tampermonkey and Violentmonkey and Greasemonkey
- inject userscript comment to build bundle
- auto open \*.user.js in default browser when userscript change
- external cdn url inject to userscript @require
- full typescript support

## install

```shell
pnpm add -D vite-plugin-monkey
```

## config

[MonkeyOption](./src/index.ts#L29)

```ts
export interface MonkeyOption {
  /**
   * userscript entry file path
   */
  entry: string;
  userscript: CommonmonkeyUserScript;
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
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js']
     *  // recommended this, plugin will auto add this url to userscript.require
     * }
     *
     */
    externalGlobals?: Record<string, string | [string, string]>;

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

## example

see [test/example/vite.config.ts](./test/example/vite.config.ts)

## note

in dev server, userscript will run between two origin

so if host enable [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), you can solve it in the following ways

- chrome - [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - disable `security.csp.enable` in the [about:config](about:config) menu
