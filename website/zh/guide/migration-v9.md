# 从 8.x 迁移到 9.x

9.x 是不兼容升级，无旧字段别名、自动转换或专用迁移提示。未支持的参数统一按未知参数报错。Vite 自身的 server/build 配置仍正常使用。

## 参数对照

| 8.x 参数                                  | 9.x 替代                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| entry                                     | entry，相对 Vite root                                                    |
| userscript                                | userscript 对象                                                          |
| userscript.grant + build.autoGrant: true  | 省略 userscript.grant 自动检测；需要显式指定时改写完整数组，不再自动补充 |
| userscript.grant + build.autoGrant: false | userscript.grant: Grant[]，删除 build.autoGrant                          |
| userscript.grant: 'none'                  | 保留                                                                     |
| server.open                               | Vite 的 server.open（插件外），默认 false                                |
| server.prefix                             | dev.namePrefix，字符串前缀，空字符串禁用                                 |
| build.fileName                            | output.script，仅字符串                                                  |
| build.metaFileName                        | output.meta，布尔值或字符串                                              |
| build.assetsBaseUrl                       | assets: { publicPath: 'https://…/' }                                     |
| build.externalGlobals                     | dependencies 中 kind: 'global' 的对象                                    |
| build.externalResource                    | dependencies 中 kind: 'resource' 的对象                                  |
| build.cssSideEffects                      | css.inject: auto / gm / dom / false                                      |
| generate                                  | 外层 defineConfig 中计算 userscript 对象                                 |
| align / format.align                      | 删除，内部统一排版                                                       |
| styleImport                               | 删除，?style 始终可用                                                    |
| clientAlias                               | 删除，运行时统一使用 $                                                   |
| server.mountGmApi                         | 删除，不向页面 window 挂载 GM API                                        |

## 新配置

```ts
import monkey, { npmCdn } from 'vite-plugin-monkey';
monkey({
  entry: 'src/main.ts',
  userscript: { name: 'Example', match: ['https://songe.li/*'] },
  dev: { namePrefix: '' },
  output: { script: 'example.user.js', meta: true },
  css: { inject: 'auto' },
  dependencies: {
    vue: {
      kind: 'global',
      global: 'Vue',
      urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
    },
  },
});
```

## 权限和开发

权限唯一入口为 userscript.grant?: 'none' | Grant[]。

| 值     | 生产                                  | 开发           |
| ------ | ------------------------------------- | -------------- |
| 省略   | 自动检测                              | 全部支持的权限 |
| 'none' | @grant none，若代码需要权限则构建报错 | @grant none    |
| 数组   | 严格使用完整列表                      | 同一列表       |
| []     | 不输出 grant                          | 不输出 grant   |

此前 9.x 开发版的 permissions、dev.permissions 和相关 Permissions 类型已删除，也不提供 dev.grant。原 detect 配置改为省略 grant；explicit.grants 移到 userscript.grant；none 改为 userscript.grant: 'none'。additional 自动检测后补充功能取消，需要显式配置时写完整列表。$extra 继续禁止设置 grant。修改显式权限后重新安装开发脚本。

dev.namePrefix 直接加在原名称前，旧 prefix 的布尔值和函数需转换为最终字符串。

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

## 依赖和 CSS

全局依赖字符串/元组改为 `{ kind: 'global', global, urls }`。global 仅接受标识符或点分路径，不接受表达式。URLs 按顺序输出 @require；手动 userscript.require 可配 urls: []。

资源配置改为 `{ kind: 'resource', name?, url, loader? }`。内置 loader 为 `'css' | 'json' | 'raw' | 'url'`；函数/代码字符串改为 `{ entry: './src/loader.ts' }`。模块默认导出接收 ResourceLoaderContext 的浏览器函数，依赖参与打包和权限检测。

旧 `cdn.jsdelivr('Vue', 'path')` 改为 `{ kind: 'global', global: 'Vue', urls: [npmCdn({ path: 'path' })] }`。`cdn` 命名空间和 jsdelivrFastly 名称删除。

assets.publicPath 是托管完整输出目录的绝对 HTTP(S) URL，默认内联。css.inject 不接受函数或代码文本。自定义注入用 ?inline；?style 导出创建函数，调用后返回独立元素，需手动插入。

## Worker 构建

生产 Worker 使用 Classic Worker + SystemJS 执行 ESM 模块图，支持动态导入、分包、循环依赖、live bindings 和顶层 await。插件接管中间构建格式，无需配置 `worker.format`。入口支持 `?worker`、`?worker&inline` 和静态 `new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })`。

省略 `assets.publicPath` 时 内嵌模块和资源；resource 模式将 Worker 分块及内部图片/WASM 注册为 `@resource`，发布时上传全部产物。父级脚本读取资源，再经每个实例独立的消息端口传给 Worker，由 Worker 创建本地 Blob URL。使用显式 userscript.grant 数组时需包含 `GM_getResourceURL`。无需在 Worker 内导入 GM API。

`?worker&inline` 内嵌 Worker 代码图，内部资源仍遵循 assets 模式。Worker 的资源命名可通过 `worker.rolldownOptions.output` 设置，默认平铺。生产 `SharedWorker`、`?worker&url` 和嵌套 Worker 暂不支持，构建时明确报错。开发仍使用 Vite 原生模块服务。

## GM 类型入口

运行时从 `$` 导入。统一使用 `vite-plugin-monkey/client` 加载全量 API 声明，包括 `GM`、同步 `GM_*` 导出、`monkeyWindow` 和 `unsafeWindow`：

```json
{
  "compilerOptions": {
    "types": ["vite/client", "vite-plugin-monkey/client"]
  }
}
```

该入口仅提供类型，不可运行时导入。此前使用管理器专用声明路径的项目也改为上述统一入口。管理器差异通过从 `$` 导入的 `TampermonkeyGM`、`ViolentmonkeyGM`、`GreasemonkeyGM` 及对应的 `*Info`、`*Window` 具名类型表达。`GM.info` 通过 `scriptHandler` 区分管理器，专属字段不再混为可选字段。插件不补齐管理器缺失的 API。

`gmAutoImportPreset()` 默认只导入共有运行时绑定；传入 `{ manager: 'tampermonkey' }`、`{ manager: 'violentmonkey' }` 或 `{ manager: 'greasemonkey' }` 筛选名称。每次调用返回独立 preset，均使用 `$` 和统一声明入口。它不检测运行环境，也不改变类型声明。

## 不再支持

插件 server/build 分组、函数式输出文件名、format、align、styleImport、clientAlias、mountGmApi、字符串式 generate、自定义 CSS 注入代码、旧 CDN 元组、资源 loader 函数均已移除。bundled dev 不支持，开发使用普通 Vite 模块服务。

此前 9.x 开发中的 grants、externals、styles、hooks、output.fileName、output.metaFile、output.assets、output.metadata.align 和 dev.open 也已删除，见[配置参考](./configuration)。桥接协议已更新，升级后重新安装开发脚本；缺失、版本或项目不匹配会报错，不回退到宿主页面。

resource 模式默认使用 `[name]-[hash][extname]` 将资源平铺到输出目录。只需将 `publicPath` 设置为 GitHub Release 下载目录（例如 `https://github.com/OWNER/REPO/releases/download/v1.0.0/`），然后把脚本与资源分别上传到该 Release。用户设置的 `build.rolldownOptions.output.assetFileNames` 优先，包括字符串和函数；自定义目录时需确保托管地址与输出路径一致。

## 公共导出迁移

| 旧导出                               | 新 API                                                         |
| ------------------------------------ | -------------------------------------------------------------- |
| MonkeyOption                         | MonkeyOptions                                                  |
| util.dataUrl(code / fn, ...args)     | scriptDataUrl(code / fn, ...args)                              |
| util.unimportPreset                  | gmAutoImportPreset()                                           |
| util.unimportPresets.tampermonkey 等 | gmAutoImportPreset({ manager: 'tampermonkey' }) 等             |
| cdn.jsdelivr(options)                | npmCdn(options)                                                |
| cdn.unpkg(options)                   | npmCdn({ ...options, provider: 'unpkg' })                      |
| cdn.fastly(options)                  | npmCdn({ ...options, provider: 'jsdelivr-fastly' })            |
| URLResolver（开发版）                | DependencyUrl（字符串或函数）；DependencyUrlResolver（仅函数） |

这些 helper 均从 vite-plugin-monkey 根入口具名导入；旧 util、cdn 和类型别名不再导出。默认导出仍是 monkey。新增配置 interface 为 NpmCdnOptions、GmAutoImportOptions 和返回值 GmAutoImportPreset。

scriptDataUrl 返回 JavaScript Data URL。函数重载会序列化函数和参数，函数不能捕获配置文件中的闭包变量；所需数据必须显式作为参数传入。

函数参数支持 JSON 可序列化值及顶层 `undefined`；后者保留参数位置、数量和默认参数语义。嵌套值遵循 JSON 序列化规则；函数、Symbol、BigInt 和循环引用会在生成时抛错。

## ?style 改为样式元素工厂

默认导出从单个 HTMLStyleElement 改为 createStyle 函数，不保留旧返回值兼容：

```ts
// 旧写法
import style from './panel.css?style';
shadowRoot.append(style);

// 新写法
import createStyle from './panel.css?style';
shadowRoot.append(createStyle());
otherShadowRoot.append(createStyle());
```

每次调用创建独立元素，避免同一个 DOM 节点在多个挂载位置之间移动。导入模块本身不创建元素，也不自动挂载，不受 css.inject 控制。

开发模式更新所有工厂创建的元素；更新之后创建的元素使用最新 CSS。原有 cloneNode 重写已删除，需要支持热更新的副本时再次调用 createStyle()。原生 cloneNode() 副本保持浏览器默认行为，不自动跟随 CSS 更新。生产模式仅保留 CSS 与创建函数。

只需要字符串时继续使用 ?inline；普通 CSS 导入仍自动注入。

UserscriptFactory 和 UserscriptContext 已删除；此前 9.x 开发版的 userscript 函数配置需移到外层 defineConfig，插件不再传入 command、mode 或 package 上下文。需要显式使用包信息时，在配置文件中自行读取 package.json。

## 9.x 开发版配置精简

- 删除 dev.install.open 和 DevInstallOptions，改用插件外的 Vite server.open。
- 删除 assets.mode、InlineAssets 和 ResourceAssets；AssetsOptions 仅保留可选 publicPath。省略 publicPath 时内联，设置时使用资源模式。
- 内置 loader 从 { kind: 'builtin', name: 'raw' } 改为 'raw'，自定义 loader 从 { kind: 'module', entry: './loader.ts' } 改为 { entry: './loader.ts' }。BuiltinResourceLoader 删除，ModuleResourceLoader 仅保留 entry。省略 loader 时仍按文件后缀推断。

旧字段不提供兼容转换，按未知参数处理。

## 类型收紧

运行时 API 行为不变，部分公共声明不再使用宽泛的 any：

- XMLHttpRequest 的 JSON 响应默认为 unknown；第三个泛型参数指定 JSON 结构，前两个参数仍分别是 responseType 和 context。例如 `GM_xmlhttpRequest<'json', undefined, { answer: number }>({ url, responseType: 'json', onload(event) { console.log(event.response.answer); } })`。异步和管理器专属请求类型使用相同参数顺序。该类型参数不执行运行时数据校验。
- 请求 context 的默认类型为 undefined，传入 context 时仍可自动推断。
- Cookie 错误回调、开放的元素属性值改为 unknown；访问其属性前需收窄类型。日志参数使用 unknown[]。
- urlchange 的添加和移除监听器共用 GmUrlChangeListener。
- GmAnyFuntion 使用参数元组和返回值泛型，例如 `GmAnyFuntion<[number], string>`，默认参数为 unknown[]、返回值为 unknown。

scriptDataUrl 保留函数参数检查，包括可选参数、默认参数和 rest 参数；模板内的 GM 类型引用不会生成运行时导入。
