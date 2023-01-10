# 历程 {#the-history}

油猴脚本工程化的历程

## 升级编辑器 {#upgrade-editor}

相信绝大多数初学者都是使用 油猴浏览器扩展自带的编辑器 来编写第一个油猴脚本

![image](https://user-images.githubusercontent.com/38517192/210925601-7e0035ff-72bd-4922-9211-d9d95a44bdef.png){data-zoomable}

但对比 vscode/webstorm, 这个编辑器过于简陋

我们进一步使用 `@require file:///path/vm-script.user.js` 或者 安装本地脚本并让油猴扩展 持续跟踪本地文件改动

于是我们现在可以使用 vscode 来编辑 `vm-script.user.js` 了

## 使用构建工具 {#use-build-tool}

当脚本功能越来越多时, 代码也会增多, 单个文件不利于功能的划分, 加大了维护的难度

进一步使用 esbuild/rollup/webpack/vite 来打包代码, 监听源文件改动并持续构建

现在可以在源文件里引用 图片样式 等资源, 也可以使用 typescript/vue/react

这也是大多数 大型脚本 正在使用的开发方案

## 使用模块热替换 {#use-hmr}

当我们正常开发一个 vite+vue web 项目时, 修改源码中的 css/vue 文件 无需刷新页面就能看到效果

这是由于构建工具有 `模块热替换` 的功能, 在 `声明式UI+组件化` 的框架下, `模块热替换` 极大地加快了开发速度, 这是一个非常有用的功能

试想你打开网页, 一番操作之后, 页面上已经有很多状态, 此时更改源代码触发构建, 如果没有 `模块热替换`, 你必须刷新标签页并重复刚才的一番操作才能看到代码更改后的效果

让油猴脚本也有 `模块热替换`, 这正是 vite-plugin-monkey 解决的问题之一

## 如何解决 {#how-solve}

vite 相比 wbepack 有开箱即用, **更友好的插件 API**, 原生 ESM 运行 等特点. 另外 webpack serve 默认不能在两个 host 之间工作, 因此选用 vite 作为构建工具

在 `vite serve` 模式下, vite-plugin-monkey 通过使用 `桥接脚本` 将原来的代码入口注入到宿主标签页

![image](https://user-images.githubusercontent.com/38517192/210956992-3e102395-bb1d-46da-b101-1b349c67ddc4.png){data-zoomable}

于是我们得到了与普通 Web 项目一致的开发体验

![hmr](https://user-images.githubusercontent.com/38517192/191197411-3d6f3795-e842-4cc1-a494-5d5f8425fd15.gif){data-zoomable}
