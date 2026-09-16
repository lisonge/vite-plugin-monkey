# assetsBaseUrl playground

测试静态资源外置，JavaScript 仍输出为一个用户脚本。

SVG 使用 `import badgeUrl from './assets/badge.svg'`，不带查询后缀，验证 Vite 默认的资源 URL 处理。WASM 覆盖 `import { answer } from './assets/answer.wasm'` 具名导入、`?url`、`?init` 与 `new URL`，SVG 的 `?inline`、`?raw` 用作对照。

## 构建模式

在仓库根目录执行：

```sh
pnpm --filter assets-base-url build
pnpm --filter assets-base-url preview
```

1. 打开 <http://localhost:4173/>，安装 `assets-base-url.user.js`。
2. 打开或刷新 <https://songe.li/>，查看右上角测试面板。
3. 两个图案应正常显示，八项检查均显示 `PASS`。可在 Tampermonkey、Violentmonkey 中分别测试。

预期 `dist/assets/` 包含两个 SVG 和一个 WASM。脚本头部为它们生成三条 `@resource`，名称使用带哈希的资产路径，地址指向 `http://localhost:4173/assets/`。四个 WASM 引用共用一条资源声明；`?inline` 与 `?raw` 不增加资源声明。`.meta.js` 应包含相同声明。

`answer.wasm` 是本地测试夹具，导出返回整数 `42` 的 `answer()`，不需要额外的 WASM 工具链。具名导入由 Vite 自动初始化，随后直接调用 `answer()`，其 TypeScript 类型由 `answer.d.wasm.ts` 声明。`?url` 和 `new URL` 检查使用 `WebAssembly.instantiateStreaming`，也验证 MIME 类型；`?init` 检查使用 Vite 提供的初始化函数。

修改资源后需要重新构建并重新安装用户脚本，让管理器获取新的资源声明。预览端口固定为 4173，避免资源地址与实际服务端口不一致。此示例的 HTTP 地址仅供本地测试；实际发布请将 `assetsBaseUrl` 改成资源托管目录，并先上传资源。

## 开发模式

```sh
pnpm --filter assets-base-url dev
```

通过开发服务的安装页面安装脚本后，打开或刷新 <https://songe.li/>。资源通过 Vite 开发服务加载，CSS 背景沿用插件现有的开发模式内联处理。切换模式时禁用另一份脚本，避免两个测试面板重叠。

示例设置 `publicDir: false`，所有测试资产通过 JS/CSS 引用进入构建图，不依赖额外的静态测试页面。

匹配页面使用现有的 `https://songe.li/*`，无需另启测试页面服务器。构建模式的 preview 服务仍用于安装脚本和下载 `@resource`；开发模式仍需要 Vite 开发服务。
