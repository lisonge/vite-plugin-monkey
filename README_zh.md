# vite-plugin-monkey

[README](README.md) | [中文文档](README_zh.md)

一个 vite 插件，用来辅助开发 [Tampermonkey](https://www.tampermonkey.net/) 和 [Violentmonkey](https://violentmonkey.github.io/) 和 [Greasemonkey](https://www.greasespot.net/) 的脚本

## 特性

- 支持 Tampermonkey 和 Violentmonkey 和 Greasemonkey 的脚本辅助开发
- 打包自动注入脚本配置头部注释
- 当 第一次启动 或 脚本配置注释改变时 自动在默认浏览器打开脚本
- 友好的利用 @require 配置库的 cdn 的方案，大大减少构建脚本大小
- 完全的 Typescript 和 Vite 的开发体验，比如模块热替换,秒启动

## 安装

```shell
pnpm add -D vite-plugin-monkey
```

## 配置

[MonkeyOption](./src/index.ts#L29)

```ts
export interface MonkeyOption {
  /**
   * 脚本文件的入口路径
   */
  entry: string;
  userscript: MonkeyUserScript;
  format?: Format;
  server?: {
    /**
     * 当 第一次启动 或 脚本配置注释改变时 自动在默认浏览器打开脚本
     * @default true
     */
    open?: boolean;

    /**
     * 开发阶段的脚本名字前缀，用以在脚本安装列表里区分构建好的脚本
     * @default 'dev:'
     */
    prefix?: string | ((name: string) => string);
  };
  build?: {
    /**
     * 打包构建的脚本文件名字 应该以 '.user.js' 结尾
     * @default (package.json.name||'monkey')+'.user.js'
     */
    fileName?: string;

    /**
     * @example
     * {
     *  vue:'Vue',
     *  // 你需要额外设置脚本配置 userscript.require = ['https://unpkg.com/vue@3.0.0/dist/vue.global.js']
     *  vuex:['Vuex', 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js'],
     *  // 插件将会自动注入 cdn 链接到 userscript.require
     *  vuex:['Vuex', (version)=>`https://unpkg.com/vuex@${version}/dist/vuex.global.js`],
     *  // 相比之前的，加了版本号，当依赖升级的时候，cdn 链接自动改变
     *  vuex:['Vuex', (version, name)=>`https://unpkg.com/${name}@${version}/dist/vuex.global.js`],
     *  // 还可以加依赖名字,不过各个依赖的 cdn basename 都不尽一致, 导致可能没什么用
     * }
     *
     */
    externalGlobals?: Record<
      string,
      string | [string, string | ((version: string, name: string) => string)]
    >;

    /**
     * 自动识别代码里用到的 浏览器插件api，然后自动配置 GM_* 或 GM.* 函数到脚本配置注释头
     *
     * 识别依据是判断代码文本里有没有特定的函数名字
     * @default true
     */
    autoGrant?: boolean;
  };
}
```

[MonkeyUserScript](./src/userscript/index.ts#L138)

```ts
/**
 * 综合后的脚本配置, 合并了来自 Greasemonkey, Tampermonkey, Violentmonkey, Greasyfork 的元数据
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
 * 格式化脚本头配置注释
 */
export type Format = {
  /**
   * @description 对齐的空格数量，请注意，显示的时候，保证你的代码是等宽字体
   * @default 2, true
   */
  align?: number | boolean | AlignFunc;
};

// 自定义对齐函数
export type AlignFunc = (
  p0: [string, ...string[]][]
) => [string, ...string[]][];
```

## 例子

vite 非常容易上手，请直接看 [test/example/vite.config.ts](./test/example/vite.config.ts)

## 注意

大多数情况下，此问题不会出现

在开发模式，我们的脚本需要在两个域之间工作，宿主域和本地开发服务器

如果宿主域启用了 [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), 浏览器会拒绝加载宿主域以外的脚本，因此你必须关闭它，关闭方法如下

- chrome - 安装浏览器插件 [Disable Content-Security-Policy](https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/)
- edge - 安装浏览器插件 [Disable Content-Security-Policy](https://microsoftedge.microsoft.com/addons/detail/disable-contentsecurity/ecmfamimnofkleckfamjbphegacljmbp?hl=zh-CN)
- firefox - 在 `about:config` 菜单项里，禁用配置 `security.csp.enable`

<!-- TODO https://sales.jetbrains.com/hc/zh-cn/articles/360016581839-%E5%BC%80%E6%BA%90%E8%AE%B8%E5%8F%AF%E8%AF%81%E6%98%AF%E4%BB%80%E4%B9%88-%E8%B0%81%E5%8F%AF%E4%BB%A5%E8%8E%B7%E5%BE%97%E5%BC%80%E6%BA%90%E8%AE%B8%E5%8F%AF%E8%AF%81- -->
