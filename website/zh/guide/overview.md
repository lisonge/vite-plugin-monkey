# 概览 {#overview}

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

一个 vite 插件，用来辅助开发 [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), [ScriptCat](https://docs.scriptcat.org/) 等脚本引擎 的脚本

## 主要特性 {#feature}

- 支持 Tampermonkey、Violentmonkey、Greasemonkey、ScriptCat 等脚本引擎的辅助开发
- 打包自动注入脚本配置头部注释
- 当第一次启动或脚本配置注释改变时自动在默认浏览器打开脚本安装
- 利用 @require 配置库的 CDN 的方案，减少构建脚本大小
- 利用 @resource 配置外部资源 CDN 的方案，额外减少构建脚本大小
- 通过 ESM 导入的方式使用 GM_api，附带类型提示
- 智能收集使用到的 GM_api，自动配置 @grant 注释
- 支持 `top level await` 和单文件下的 `dynamic import`
- 预览模式下自动打开浏览器安装构建好的脚本
- 完全的 Typescript 和 Vite 的开发体验，比如模块热替换，秒启动
