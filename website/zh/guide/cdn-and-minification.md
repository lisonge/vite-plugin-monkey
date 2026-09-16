# CDN 与压缩 {#cdn-and-minification}

## CDN 工具 {#cdn-utilities}

```ts
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
export default defineConfig({
  plugins: [
    monkey({
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
});
```

有以下 CDN 可使用，详情见 [cdn.ts](https://github.com/lisonge/vite-plugin-monkey/blob/main/vite-plugin-monkey/src/node/cdn.ts)

- [jsdelivr](https://www.jsdelivr.com/)
- [unpkg](https://unpkg.com/)
- [cdnjs](https://cdnjs.com/libraries)
- [zhimg](https://unpkg.zhimg.com/)
- [npmmirror](https://registry.npmmirror.com/)

如果你想使用其他 CDN，请查看 [external-scripts](https://greasyfork.org/zh-CN/help/external-scripts)

## 外置静态资源 {#external-assets}

设置 `monkey({ entry: 'src/main.ts', build: { assetsBaseUrl: 'https://example.com/releases/v1/' } })`，可以将构建图中的 WASM、图片、字体等静态资源独立输出，JavaScript 仍打包为一个用户脚本。未配置时保持默认内联行为。

`assetsBaseUrl` 是 `dist` 对应的绝对 HTTP(S) 发布目录，不能包含查询参数或片段。默认资源文件名为 `assets/[name]-[hash][extname]`；例如 `assets/solver-AbCd.wasm` 会生成同名 `@resource`，地址为 `https://example.com/releases/v1/assets/solver-AbCd.wasm`。

普通资源导入、`?url`、Vite 可静态分析的 `new URL(..., import.meta.url)` 和 CSS 的资源 URL 会使用 `GM_getResourceURL`。插件自动声明所需权限，即使关闭 `autoGrant`；显式 `grant: 'none'` 与资源外置冲突。`?inline`、`?raw` 和已有 `externalResource` 配置保留原有含义。同名资源对应不同发布地址时构建失败。

输出资源文件名也用作 `@resource` 名称，因此不能包含空白字符；遇到此类名称时构建会报错。

先上传资源，再发布 `.user.js` 和可选的 `.meta.js`。建议使用版本目录，并保留旧版本资源供尚未升级的脚本使用。插件不会上传文件。`@resource` 由管理器预加载，并非按需下载。

开发模式仍使用 Vite 的资源服务。此选项不解决依赖预打包导致的开发路径问题，也不提供 JS/Worker 拆包、任意字符串路径转换或 `publicDir` 全目录资源注册。该功能使用 Vite 的实验性 `renderBuiltUrl` 接口；被外置的资源 URL 由插件管理，其余 URL 继续交给用户配置的钩子处理。

## 压缩混淆 {#minification}

由于 greasyfork 的 [代码规则](https://greasyfork.org/zh-CN/help/code-rules)

> 提交到 Greasy Fork 的代码不得混淆或最小化

因此插件将 [viteConfig.build.minify](https://cn.vitejs.dev/config/build-options.html#build-minify) 的默认值更改为 `false`

如果你想启用压缩混淆，只需要手动设置 `viteConfig.build.minify=true`
