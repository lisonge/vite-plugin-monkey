# 配置

9.x 不保留旧 API 兼容，未知参数直接报错。端口、HMR、target、minify、outDir 等仍使用 Vite 配置。

```ts
import monkey, { npmCdn } from 'vite-plugin-monkey';
monkey({
  entry: 'src/main.ts',
  userscript: { name: 'Example', match: ['https://songe.li/*'] },
  dev: { namePrefix: '[dev] ' },
  output: { script: 'example.user.js', meta: true },
  dependencies: {
    vue: {
      kind: 'global',
      global: 'Vue',
      urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
    },
    'normalize.css': {
      kind: 'resource',
      url: npmCdn(),
      loader: 'css',
    },
  },
  css: { inject: 'auto' },
});
```

| 参数           | 含义与默认值                                     |
| -------------- | ------------------------------------------------ |
| entry          | 必填，相对 Vite root 的入口文件                  |
| userscript     | 元数据对象，grant 可省略、为 none 或权限数组     |
| dev.namePrefix | 默认 '[dev] '；空字符串禁用前缀                  |
| output.script  | 包名加 .user.js；作用域包名的 / 转为 -           |
| output.meta    | 默认不生成；true 推导 .meta.js，字符串指定文件名 |
| assets         | 省略 publicPath 时内联；设置后使用 @resource     |
| dependencies   | 仅生产生效；开发使用本地依赖                     |
| css.inject     | auto、gm、dom 或 false；默认 auto                |

输出文件名必须位于 outDir 内。注释使用统一内部对齐。公开配置对象具有具名类型，可从 vite-plugin-monkey 导入。

开发入口 URL 保留文件路径中的空格、Unicode 和 `%`。Vite root 外的入口使用 `/@fs/`，仍受 `server.fs.allow` 限制。Vite 的模块加载器目前不支持源码文件名中的 `#`，即使 URL 已编码为 `%23` 也无法加载。

## 动态元数据

userscript 只接受对象。动态或异步逻辑放在 Vite 的 defineConfig 中：

```ts
import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        description: command === 'serve' ? 'Development' : mode,
        match: ['https://songe.li/*'],
      },
    }),
  ],
}));
```

包信息默认填充仍保留，.user.js 与 .meta.js 共用元数据。普通源码 watch 重建只重置构建收集状态，不重新计算配置；修改配置后由 Vite 重新加载。$extra 可添加自定义字段，但不能设置 grant。

## 权限

唯一入口是 userscript.grant，类型为 'none' | Grant[]。

- 省略：生产自动检测；开发申请全部已支持权限。
- 'none'：开发和生产输出 @grant none；生产检测到需要权限的 API 时构建失败。
- 数组：开发和生产严格使用完整列表，不合并自动检测结果；[] 不输出 @grant。

不再提供顶层 permissions 或 dev.permissions/dev.grant。修改显式权限后需重新安装开发脚本。$extra 不能设置 grant。

## 依赖和资源

全局依赖使用 `{ kind: 'global', global, urls }`。global 是标识符或点分路径，urls 按顺序输出 @require，也可为空并手动配置 userscript.require。URL 为字符串或异步函数，接收 `{ name, version, importName, resolveName }`。

资源依赖使用 `{ kind: 'resource', name?, url, loader? }`。loader 可按后缀推断，或明确配置：

```ts
loader: 'css'; // css | json | raw | url
loader: {
  entry: './src/load-resource.ts';
}
```

模块 loader 默认导出浏览器函数，接收 ResourceLoaderContext（包信息、resourceName、resourceUrl、dynamic）。其依赖参与打包和权限检测，异步结果会被等待。动态导入返回含 default 的模块命名空间。

`npmCdn({ provider?, path? })` 返回 `DependencyUrlResolver`。provider 默认为 `jsdelivr`，也支持 `unpkg` 和 `jsdelivr-fastly`；path 默认为依赖解析出的文件名。它不返回完整依赖描述。

`assets: { publicPath: 'https://example.com/releases/v1/' }` 将图片、字体、WASM 和 Worker 模块分块输出为 @resource。publicPath 必须是无认证信息、查询和片段的绝对 HTTP(S) 目录 URL。发布脚本前上传资源；资源的 ?inline 和 ?raw 保持显式语义。

resource 模式默认使用 `[name]-[hash][extname]` 将资源平铺到输出目录。只需将 `publicPath` 设置为 GitHub Release 下载目录（例如 `https://github.com/OWNER/REPO/releases/download/v1.0.0/`），然后把脚本与资源分别上传到该 Release。用户设置的 `build.rolldownOptions.output.assetFileNames` 优先，包括字符串和函数；自定义目录时需确保托管地址与输出路径一致。

## Worker

生产构建支持以下 Dedicated Worker 入口：

```ts
import TaskWorker from './worker.ts?worker';
import InlineTaskWorker from './worker.ts?worker&inline';

const worker = new TaskWorker({ name: 'task' });
const inlineWorker = new InlineTaskWorker();
const urlWorker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
});
```

Worker 源码使用 ESM，可包含静态导入、动态导入和顶层 await。生产构建统一运行在 Classic Worker 中，每个实例拥有独立的 SystemJS 模块注册表。动态导入保留延迟执行和缓存，循环依赖与 live bindings 可跨分块工作。插件接管 Worker 的中间构建格式，`worker.format` 不再决定运行时格式；Vite 的 Worker 插件和输出命名配置仍可使用。

| 资源模式         | Worker 代码                          | Worker 内部图片、字体、WASM            |
| ---------------- | ------------------------------------ | -------------------------------------- |
| `inline`（默认） | 完整模块图内嵌到用户脚本             | 内嵌资源                               |
| `resource`       | 模块分块输出为 `@resource`，按需加载 | 输出为 `@resource`，入口执行前准备完成 |

`?worker&inline` 始终内嵌 Worker 模块图，其内部资源仍遵循 `assets.publicPath`；要生成包含全部资源的单文件，使用默认的 inline 模式。resource 模式发布时需同时上传全部 Worker 分块和内部资源。Worker 输出命名使用 `worker.rolldownOptions.output`，目录和基本名称遵循配置，转换后的模块文件统一使用 `.system.js` 后缀；默认资源输出平铺。

父级用户脚本通过 `GM_getResourceURL` 读取资源字节，再经每个 Worker 独立的 `MessageChannel` 传递。Worker 在自己的上下文中创建 Blob URL，无需访问 GM API，也不会直接使用脚本沙箱创建的 Blob URL。静态资源导入、`?url`、`new URL('./asset', import.meta.url)` 和 WASM `?init` 均可使用这些本地 URL。resource 模式需要 `GM_getResourceURL`；使用显式 userscript.grant 数组时需包含该权限。

构造后立即发送的消息会排队，直到入口准备完成。初始化失败通过 Worker 的 `error` 事件报告；启动后的动态导入加载失败会拒绝 import Promise。缺失模块或资源不会回退到网络加载。使用完毕后调用 `terminate()` 释放 Worker 和桥接。

生产构建暂不支持 `SharedWorker`、`?worker&url` 和嵌套 Worker，会明确报错。资源桥接不会向 Worker 开放通用 GM API。开发仍使用 Vite 模块服务，SystemJS 仅用于生产。Worker 与 Blob 的创建仍受浏览器 CSP 和脚本管理器限制。

## CSS 与运行时

css.inject 的 auto 优先 GM_addStyle，缺失时用 DOM；gm 强制 GM_addStyle；dom 创建 style；false 关闭自动注入。?style 默认导出创建函数，调用 createStyle() 得到独立 HTMLStyleElement，由调用方插入。开发时工厂创建的元素共享 HMR 更新；原生 cloneNode() 副本不跟随更新。自定义注入使用 ?inline 文本。

GM API 从 `$` 导入，统一使用 `vite-plugin-monkey/client` 声明入口。该入口声明全量 API，管理器差异通过 `TampermonkeyGM`、`ViolentmonkeyGM`、`GreasemonkeyGM` 等具名类型表达；使用方式和自动导入预设见 [GM API](./gm-api)。开发仅使用普通 Vite 模块服务，不支持 bundled dev。桥接缺失、版本或项目不匹配直接报错，不回退到页面 window。

自动打开开发安装页面使用 Vite 的 `server.open`，例如 `defineConfig({ server: { open: true }, plugins: [monkey({ entry: "src/main.ts" })] })`。

开发时，插件在 Vite 编译 CSS 后将本地 `url()` 资源内联为 Data URL，支持 PostCSS、Lightning CSS、CSS Modules、`?inline` 和 `?style`。保留用户的 PostCSS 配置，不设置 `server.origin`，CSS 资源无需向固定开发端口另发请求。资源文件变更参与 HMR；生产资源仍遵循 `assets.publicPath`。
