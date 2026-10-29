# GM API 使用

```ts
import { GM_getValue, GM_setValue, monkeyWindow, unsafeWindow } from '$';

const value = GM_getValue('count', 0);
GM_setValue('count', value + 1);
```

`$` 模块适用于开发模式和生产。monkeyWindow 对应用户脚本沙箱，unsafeWindow 对应宿主页面。在 `tsconfig.json` 中配置 `"types": ["vite/client", "vite-plugin-monkey/client"]` 加载 `$` 的声明，由插件负责运行时解析。`vite-plugin-monkey/client` 仅用于类型声明，不能作为运行时导入。GM API 不再挂载到页面 window。

省略 userscript.grant 时生产自动检测、开发开放全部支持的权限；动态调用使用 userscript.grant 数组指定完整列表。none 输出 @grant none，[] 不输出 grant。

```ts
import AutoImport from 'unplugin-auto-import/vite';
import { gmAutoImportPreset } from 'vite-plugin-monkey';

AutoImport({ imports: [gmAutoImportPreset({ manager: 'tampermonkey' })] });
```

## 脚本管理器差异

类型声明覆盖多个管理器的 API，但插件不会为管理器缺失的 API 提供实现。请按目标管理器选择调用方式。

- [Violentmonkey](https://violentmonkey.github.io/api/gm/) 支持菜单图标、资源 URL 的 isBlobUrl 参数、Firefox 数字容器 ID，以及请求的 upload 事件和 withCredentials。
- [Greasemonkey](https://wiki.greasespot.net/Greasemonkey_Manual:API) 使用 GM.\*；GM.xmlHttpRequest、GM.registerMenuCommand、GM.openInTab 和 GM.notification 可能不返回句柄或 Promise。跨管理器代码可使用请求回调，不应假定返回值总有 abort 或 then。
- GM.info 通过 scriptHandler 区分 Tampermonkey、Violentmonkey 和 Greasemonkey，再访问对应字段。

Violentmonkey 的 userscript['top-level-await'] 会输出无值标记，不能与 unwrap 同时启用。插件本身仍处理源码中的顶层 await，不要求用户设置这个标记。Greasy Fork 的 compatible / incompatible 可传字符串或数组；installURL 也可输出，但 [Greasy Fork 会在分发时移除更新地址](https://greasyfork.org/en/help/meta-keys)。

## 类型与自动导入

`vite-plugin-monkey/client` 是唯一声明入口，统一声明 `$` 的全量 API，包括 `GM`、同步 `GM_*` 导出、`monkeyWindow` 和 `unsafeWindow`。运行时可用的 API 仍由脚本管理器决定。

管理器差异通过从 `$` 导入的具名类型表达：

```ts
import type { TampermonkeyGM, ViolentmonkeyGM, GreasemonkeyGM } from '$';
```

这些 interface 描述各管理器的方法与返回值；对应的 `TampermonkeyInfo`、`ViolentmonkeyInfo`、`GreasemonkeyInfo` 和 `*Window` 类型描述元信息与沙箱对象，`CommonGM` 描述共有方法。类型不会改变运行时对象，也不会补齐缺失的 API。

`gmAutoImportPreset()` 自动导入共有运行时绑定；通过 manager 选择 tampermonkey、violentmonkey 或 greasemonkey。筛选只影响运行时导入名称，不改变统一声明入口。
