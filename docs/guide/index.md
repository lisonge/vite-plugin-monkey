# 开始 {#getting-started}

注意: 此文档假设您已了解 vite 基本配置, vite 文档: <https://cn.vitejs.dev>

## 快速搭建项目 {#scaffolding-your-first-vite-project}

有以下模板可供你使用

| JavaScript                                                                                                            | TypeSript                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [empty](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-empty) (only js)      | [empty-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-empty-ts) (only ts)      |
| [vanilla](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-vanilla) (js + css) | [vanilla-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-vanilla-ts) (ts + css) |
| [vue](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-vue)                    | [vue-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-vue-ts)                    |
| [react](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-react)                | [react-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-react-ts)                |
| [preact](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-preact)              | [preact-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-preact-ts)              |
| [svelte](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-svelte)              | [svelte-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-svelte-ts)              |
| [solid](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-solid)                | [solid-ts](https://github.com/lisonge/vite-plugin-monkey/tree/main/packages/create-monkey/template-solid-ts)                |

使用 PNPM:

```shell
pnpm create monkey
```

使用 NPM:

```shell
npm create monkey@latest
```

使用 Yarn:

```shell
yarn create monkey
```

然后按照提示操作即可选择你想要的模板

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```shell
# pnpm
pnpm create monkey my-vue-app --template vue
# npm 6.x
npm create monkey@latest my-vue-app --template vue
# npm 7+, extra double-dash is needed:
npm create monkey@latest my-vue-app -- --template vue
# yarn
yarn create monkey my-vue-app --template vue
```

## 单独安装

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

需自行 [配置](./)

## 命令行界面 {#command-line-interface}

插件适配了 vite 的三种启动模式

<!-- prettier-ignore -->
```json5
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，会在默认浏览器打开桥接脚本安装页面, 别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview", // 在默认浏览器打开之前构建脚本的安装页面
  }
}
```
