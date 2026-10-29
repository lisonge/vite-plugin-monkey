# 项目约定

## vite-plugin-monkey 的 TypeScript 导入

- `vite-plugin-monkey` 包内引用本地 TypeScript 模块时，必须使用显式 `.ts` 后缀，包括 `import`、`import type`、`export ... from` 和动态 `import()`。
- 路径应指向实际源码文件，例如 `./core/context.ts`、`./types/index.ts`；不要省略后缀、仅引用目录，或将 `.ts` 写成 `.js` / `.mjs`。
- npm 包名及 Node.js 内置模块保持原有写法，例如 `vite`、`node:path`，不要追加 `.ts`。引用其他类型文件时使用其实际后缀。

## GM API 导入

- 运行时必须使用 `import { ... } from '$'` 导入 GM API，不得从 `vite-plugin-monkey/client` 导入。
- `vite-plugin-monkey/client` 仅是 `client.d.ts` 的类型声明入口，用于声明 `$` 模块；可配置到 `tsconfig.json` 的 `compilerOptions.types`，或通过三斜线 `reference types` 加载。它不是可导入的运行时模块。
- 插件负责在普通开发和生产构建中解析 `$`；示例、测试和自动导入预设都应遵守这一约定，不得通过测试专用 alias 掩盖解析问题。

## 本地开发与发布

- workspace 中 `vite-plugin-monkey` 通过 `main` 指向 `src/node/index.ts`，Vite 可以直接加载 TypeScript 源码。不要添加顶层 `exports` 或 `publishConfig.exports`。
- 本地 playground 开发无需先执行 `pnpm --filter vite-plugin-monkey build`。不要为本地开发添加依赖 `dist` 的入口或预构建步骤。
- 安装依赖后，可以直接运行 `pnpm --filter @playground/lab dev` 启动开发示例。
- 发布产物通过 `publishConfig` 使用 `dist` 入口。保留本地源码入口与发布产物入口的区别；发布构建和打包验证仍需生成构建产物。
