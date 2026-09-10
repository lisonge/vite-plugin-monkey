---
layout: home

hero:
  name: vite-plugin-monkey
  text: 使用 Vite 构建用户脚本
  tagline: 为 Tampermonkey、Violentmonkey、Greasemonkey、ScriptCat 等用户脚本引擎提供开发、预览和构建支持。
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/guide/getting-started
    - theme: alt
      text: 配置
      link: /zh/guide/configuration
    - theme: alt
      text: GitHub
      link: https://github.com/lisonge/vite-plugin-monkey

features:
  - title: Vite 开发体验
    details: 使用快速启动、模块热替换、TypeScript、顶层 await 和动态导入开发用户脚本。
    link: /zh/guide/getting-started
  - title: 用户脚本元数据
    details: 自动生成用户脚本头部，并收集使用到的 GM API 来配置 @grant。
    link: /zh/guide/configuration
  - title: 外部依赖
    details: 通过 @require 和 @resource 加载 JavaScript 及其他资源，减小最终产物体积。
    link: /zh/guide/cdn-and-minification
  - title: 带类型的 GM API
    details: 通过 ESM、全局变量或自动导入使用带类型提示的 GM API。
    link: /zh/guide/gm-api
---
