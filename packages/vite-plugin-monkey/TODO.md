# TODO

## bug

- pnpm : 当插件被安装在 node_modules 时, 在有 map 文件的情况下, vscode 查看源码, 仍然是构建后的代码

## feature

- 不再依靠挂载 GM_api 到 unsafeWindow, 应该使 import {GM_api} from 'virtual:module'; 的方式使用
