# CDN 与压缩

```ts
import { npmCdn } from 'vite-plugin-monkey';

const dependencies = {
  vue: {
    kind: 'global',
    global: 'Vue',
    urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
  },
  'element-plus/dist/index.css': {
    kind: 'resource',
    url: npmCdn({ provider: 'unpkg' }),
  },
};
```

`npmCdn({ provider, path })` 返回使用已安装包版本的 URL resolver。provider 默认为 `jsdelivr`，也支持 `unpkg` 和 `jsdelivr-fastly`；path 可覆盖包解析出的文件路径。其他 CDN 可使用接收 `PackageContext` 的 `DependencyUrlResolver` 函数。

WASM、图片、字体产物需要外置时，设置 assets 为 { publicPath: 'https://example.com/releases/v1/' }。先上传资源再发布脚本；资源名使用产物文件名，冲突或空白字符会报错。显式 ?inline、?raw 保持原有语义。这些设置仅作用于生产构建。

压缩由 Vite build.minify 控制，插件默认 false。发布站要求可读源码时请保持关闭。

resource 模式默认使用 `[name]-[hash][extname]` 将资源平铺到输出目录。只需将 `publicPath` 设置为 GitHub Release 下载目录（例如 `https://github.com/OWNER/REPO/releases/download/v1.0.0/`），然后把脚本与资源分别上传到该 Release。用户设置的 `build.rolldownOptions.output.assetFileNames` 优先，包括字符串和函数；自定义目录时需确保托管地址与输出路径一致。
