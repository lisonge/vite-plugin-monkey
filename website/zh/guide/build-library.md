# 构建使用 GM API 的库 {#build-a-library-using-gm-api}

面向 vite-plugin-monkey 项目的库，从 `$` 导入 GM API，并在库的 ESM 产物中将 `$` 保留为外部依赖：

```ts
// src/index.ts
import { GM_setValue } from '$';

export const setValue = (name: string, value: unknown) => {
  GM_setValue(name, value);
};
```

例如使用 tsup：

```ts
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'browser',
  dts: true,
  external: ['$'],
});
```

在 TypeScript 的 `types` 配置中加载 `vite-plugin-monkey/client`，为 `$` 提供声明；它不是运行时导入入口。详见 [GM API](./gm-api)。

使用者安装库后正常导入，由应用的 vite-plugin-monkey 解析 `$`：开发时通过用户脚本沙箱桥接读取 API，生产时生成直接引用管理器 GM 全局变量的虚拟模块。库无需打包开发客户端。

如果还要发布通过 `@require` 加载的独立 IIFE，请提供直接读取 GM 全局变量的入口或适配模块。旧的 `vite-plugin-monkey/dist/native` 入口已不再提供。该产物不能残留未解析的 `$` 导入，所需权限由使用它的用户脚本配置。
