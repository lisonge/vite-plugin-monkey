# GM API Usage

```ts
import { GM_getValue, GM_setValue, monkeyWindow, unsafeWindow } from '$';

const value = GM_getValue('count', 0);
GM_setValue('count', value + 1);
```

The `$` module works in development and production. `monkeyWindow` refers to the userscript sandbox; `unsafeWindow` refers to the host page. Load its declaration with `"types": ["vite/client", "vite-plugin-monkey/client"]` in `tsconfig.json`. The plugin resolves `$` at runtime. `vite-plugin-monkey/client` is only a type declaration entry, not a runtime module. GM APIs are not mounted onto the page window.

Omit userscript.grant for production detection and all supported development grants. For dynamic calls, specify the complete grant array. The string none emits @grant none; [] emits no grant.

```ts
import AutoImport from 'unplugin-auto-import/vite';
import { gmAutoImportPreset } from 'vite-plugin-monkey';

AutoImport({ imports: [gmAutoImportPreset({ manager: 'tampermonkey' })] });
```

## Userscript manager differences

The declarations cover APIs from multiple managers. The plugin does not implement APIs missing from a manager; choose calls supported by your target.

- [Violentmonkey](https://violentmonkey.github.io/api/gm/) supports menu icons, the resource URL isBlobUrl argument, numeric Firefox container IDs, and request upload events and withCredentials.
- [Greasemonkey](https://wiki.greasespot.net/Greasemonkey_Manual:API) uses GM.\*. GM.xmlHttpRequest, GM.registerMenuCommand, GM.openInTab, and GM.notification may return neither a handle nor a Promise. Use request callbacks for cross-manager code instead of assuming abort or then exists.
- GM.info is a discriminated union: narrow scriptHandler to Tampermonkey, Violentmonkey or Greasemonkey before accessing manager-specific fields.

Violentmonkey's userscript['top-level-await'] emits a flag and cannot be combined with unwrap. The plugin still handles top-level await in source code without requiring this flag. Greasy Fork's compatible / incompatible accept a string or array. installURL is also emitted, although [Greasy Fork removes update URLs when distributing scripts](https://greasyfork.org/en/help/meta-keys).

## Types and auto-imports

`vite-plugin-monkey/client` is the single declaration entry. It declares the complete `$` API, including `GM`, synchronous `GM_*` exports, `monkeyWindow` and `unsafeWindow`. The available runtime APIs still depend on the userscript manager.

Manager differences are expressed through named types imported from `$`:

```ts
import type { TampermonkeyGM, ViolentmonkeyGM, GreasemonkeyGM } from '$';
```

These interfaces describe each manager's methods and return values. Corresponding `TampermonkeyInfo`, `ViolentmonkeyInfo`, `GreasemonkeyInfo` and `*Window` types describe metadata and sandbox objects. `CommonGM` describes shared methods. These types do not change the runtime object or supply missing APIs.

`gmAutoImportPreset()` imports shared runtime bindings. Pass `{ manager: 'tampermonkey' }`, `{ manager: 'violentmonkey' }` or `{ manager: 'greasemonkey' }` to select runtime names. Every call returns a fresh preset using the same declaration entry; it does not detect the running manager.
