# CHANGELOG

## 3.1.2

- fix: use custom system instance [231b0c70](https://github.com/lisonge/vite-plugin-monkey/commit/8c5f4fa13404898f35d45cc33663df5f231b0c70)
- fix: systemjs set external globals default export [c1ee2ef1](https://github.com/lisonge/vite-plugin-monkey/commit/12179209554029dec9de000a6e11171ec1ee2ef1) [#70](https://github.com/lisonge/vite-plugin-monkey/issues/70)

## 3.1.1

- fix: export client/global type, [1e3a9954](https://github.com/lisonge/vite-plugin-monkey/commit/eb12ad337a25f6a31988a953864bcbeb1e3a9954) [#69](https://github.com/lisonge/vite-plugin-monkey/issues/69)

## 3.1.0

- feat: support top level await in iife [acddbaf3](https://github.com/lisonge/vite-plugin-monkey/commit/ec2e4fe134bbb8ab09e83c51e7269b21acddbaf3)

## 3.0.3

- fix: wrong function type [#63](https://github.com/lisonge/vite-plugin-monkey/pull/63)

## 3.0.2

- fix: support top level for await of [c4b8f318](https://github.com/lisonge/vite-plugin-monkey/commit/f9087df849647a7e979a3019b791dbd3c4b8f318)
- fix: format key [ea373ea5](https://github.com/lisonge/vite-plugin-monkey/commit/629797857735ee4176727f36dcb4847eea373ea5)
- fix: extra data [7761fcb7](https://github.com/lisonge/vite-plugin-monkey/commit/d6e6b133fd095de464b35e1b9af45b647761fcb7)
- perf: better stringSort [a8593f06](https://github.com/lisonge/vite-plugin-monkey/commit/df8365fbd3a6e24fa12597e9d2940e4ca8593f06)

## 3.0.1

- fix:inline svg asset [fb8000d5](https://github.com/lisonge/vite-plugin-monkey/commit/9c294ee636c2925184a1f6fe4e2fd3f7fb8000d5)

## 3.0.0

- support `top level await` by systemjs
- support `dynamic import` in single file by systemjs
- use original build mode instead of library-mode
- vite legacy is available
- add gm_webRequest, unwrap, copyright, sandbox type hint, others
- redirect client when build
- fix: monkeyWindow.GM may be undefined
- fix: cdn util suport multiple call

plugin@v2 use inlineDynamicImport and not support TopLevelAwait

```mermaid
graph LR;
    A(your code)-- vite build library mode -- others plugins -- vite-plugin-monkey  -->B(iife)
```

---

plugin@v3

```mermaid
graph LR;
    A(your code)-- vite build -- others plugins -->B(esm)
    B -- vite-plugin-monkey -- vite build library mode --> C{has TopLevelAwait\nor DynamicImport}
    C -- yes --> D(systemjs)
    C -- no --> E(iife)
```

## 3.0.0-BreakChanges

- vite-plugin-monkey must be the `last one` of plugin list
- sourcemap is `temporarily` unavailable

## 2.12.1

### 2.12.1-BugFixes

- compatible unocss placeholder [e080da3d](https://github.com/lisonge/vite-plugin-monkey/commit/e930063853628cd3c0f3d14b6b9798e7e080da3d), [#45](https://github.com/lisonge/vite-plugin-monkey/issues/45)

## 2.12.0

### 2.12.0-Features

- new usage for gm api type hint [#44](https://github.com/lisonge/vite-plugin-monkey/issues/44)

### 2.12.0-BugFixes

- not reopen when entry changed [c29d6a55](https://github.com/lisonge/vite-plugin-monkey/commit/fcd032d7a5c34eac1a30c3fe317bfa31c29d6a55)
- dts error [d994c69d](https://github.com/lisonge/vite-plugin-monkey/commit/800d970e2c39f298475e1b5ada0a7ee2d994c69d)
- duplicated client type hint in vscode [a31cd6f1](https://github.com/lisonge/vite-plugin-monkey/commit/5e61aa5f6a61f0593020a2cf8c5d5834a31cd6f1)

## 2.11.1

### 2.11.1-BugFixes

- remove extra space [c365e309](https://github.com/lisonge/vite-plugin-monkey/commit/a2e1112b16ad8acc33130bf7b98c70bcc365e309), [#41](https://github.com/lisonge/vite-plugin-monkey/issues/41)
- node target node14 [8ff87105](https://github.com/lisonge/vite-plugin-monkey/commit/4d2f2f0ddf22123941db15d9e29e9a1e8ff87105), [#42](https://github.com/lisonge/vite-plugin-monkey/issues/42)

## 2.11.0

### 2.11.0-Features

- move mountGmApi code to server [6534c454](https://github.com/lisonge/vite-plugin-monkey/commit/64d1679384d90afeed9e9be8985eaf366534c454)
- match file by assetsInclude [19dbe791](https://github.com/lisonge/vite-plugin-monkey/commit/12d91c6fbeaf7310cd92b89e90063df219dbe791) [b00a1e37](https://github.com/lisonge/vite-plugin-monkey/commit/3acf828dfa3cbfc1807b4a3f00af2170b00a1e37)
- unset server origin [9d1e49d9](https://github.com/lisonge/vite-plugin-monkey/commit/e1afc7b87b9ef46c142abe50150493f99d1e49d9) [2c20e20c](https://github.com/lisonge/vite-plugin-monkey/commit/f5a3d400eccd3d5e83b3965ecccec0902c20e20c)
- set server.open default value by process.platform [2287b45d](https://github.com/lisonge/vite-plugin-monkey/commit/61075edb304e328a260db39ddc5a662b2287b45d)
- iframe tip ui [8340cc80](https://github.com/lisonge/vite-plugin-monkey/commit/a1112f04713f2bf8cd82355e8e3d6d738340cc80)

now vite-plugin-monkey is available at [codesandbox](https://codesandbox.io/), online demo [vite-monkey-test-9e0vbi](https://codesandbox.io/p/sandbox/vite-monkey-test-9e0vbi)

<details open>
  <summary>Sample: vite-monkey-test-9e0vbi</summary>

![image](https://user-images.githubusercontent.com/38517192/212538093-8923ddf5-80f4-483a-bc31-c227681402f0.png)

</details>

note: vite-plugin-monkey is unavailable at online IDE that base [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) like [stackblitz](https://stackblitz.com/)

## 2.10.3

### 2.10.3-Features

- use static entry [ba31e408](https://github.com/lisonge/vite-plugin-monkey/commit/8375485887e7fcf0579a25533591f6c7ba31e408)

## 2.10.2

### 2.10.2-BugFixes

- should modify author instead of name [3bb494ad](https://github.com/lisonge/vite-plugin-monkey/commit/c1b5664291f320f757dc06b097868cfc3bb494ad), [#38](https://github.com/lisonge/vite-plugin-monkey/issues/38)

## 2.10.1

### 2.10.1-BugFixes

- minify css target [fcdeca87](https://github.com/lisonge/vite-plugin-monkey/commit/0d03f407b99d28747b5fae9020c86a02fcdeca87), [#37](https://github.com/lisonge/vite-plugin-monkey/issues/37)

## 2.10.0

### 2.10.0-BugFixes

- clientAlias can not work [d0347a26](https://github.com/lisonge/vite-plugin-monkey/commit/685d5a369a9aa3fcea4ec47701d5136bd0347a26)

### 2.10.0-Features

- support vite@>=3.0.0

## 2.9.4

### 2.9.4-BugFixes

- cdn.unpkg when pathname omitted [3e45e9d8](https://github.com/lisonge/vite-plugin-monkey/commit/5e8c416d2871dac6b4a963756cbdb0833e45e9d8)
- case when prefix=false [cec5e0bd](https://github.com/lisonge/vite-plugin-monkey/commit/f816f13024d49a87de80853cb42199c8cec5e0bd)

## 2.9.3

### 2.9.3-BugFixes

- entry script not executed in order [6c9541b6](https://github.com/lisonge/vite-plugin-monkey/commit/223d8b2a3280876d55deb3e24fd0f8fa6c9541b6)

## 2.9.2

### 2.9.2-BugFixes

- use define `__MONKEY_WINDOW__` [d04cf6b8](https://github.com/lisonge/vite-plugin-monkey/commit/a393287ff9877584e4a665203b3ffc36d04cf6b8)

## 2.9.1

### 2.9.1-BugFixes

- `__MONKEY_WINDOW__` is not defined [a5b8baab](https://github.com/lisonge/vite-plugin-monkey/commit/97ca9a8cb34245472392cc2c6ac5714ca5b8baab)

## 2.9.0

### 2.9.0-Features

- preview support subpath [2461a31d](https://github.com/lisonge/vite-plugin-monkey/commit/e7bb19a5e107d1b655057fb423c8eb112461a31d)
- chang default prefix to "server:" [ea92891a](https://github.com/lisonge/vite-plugin-monkey/commit/5073dccff4d07a778ad21953dac05fd2ea92891a)
- set window by plugin [bedac6cf](https://github.com/lisonge/vite-plugin-monkey/commit/6892db083d1cac70f5ce6df7b71dc9b6bedac6cf)
- complement gm_cookie type [b9ac1593](https://github.com/lisonge/vite-plugin-monkey/commit/dfe1481041664adbb63fcad828de73b7b9ac1593)

### 2.9.0-BugFixes

- error caused by repeated definitions [1c8c35a8](https://github.com/lisonge/vite-plugin-monkey/commit/29fd6d88573d84b2daaf5632b60c38af1c8c35a8)
- fix readyState+response type [bee8b799](https://github.com/lisonge/vite-plugin-monkey/commit/2c77e97fcfaee74995a63d00d437dd94bee8b799)
- del npmmirror, use npmjs [80ae6a9a](https://github.com/lisonge/vite-plugin-monkey/commit/df92f85fe8ff4c567a8ab6e16575404a80ae6a9a)

## 2.8.0

### 2.8.0-Features

- generate correct sourcemap mapping for build.user.js
- metaFileName can be function
- external vite-plugin-monkey/src/client at build mode
- export type MonkeyOption

## 2.7.3

### 2.7.3-BugFixes

- not pre-bundling [30ecb0f9](https://github.com/lisonge/vite-plugin-monkey/commit/30aec15ce74c57c51081a40c3215e67830ecb0f9)

### 2.7.3-Features

- dynamic import use rawId instead of VarName [b9a1cc93](https://github.com/lisonge/vite-plugin-monkey/commit/0efa4fea1f78713bc7920d496bd6b1e6b9a1cc93)

## 2.7.2

### 2.7.2-BugFixes

- can not correctly collect grant, require, resource when `vite build --watch` [bfca5785](https://github.com/lisonge/vite-plugin-monkey/commit/823aa336dc1bba8a78c27fe9e9a078aabfca5785), [issues#27](https://github.com/lisonge/vite-plugin-monkey/issues/27)
- use error name when not found module, [2e6854a4](https://github.com/lisonge/vite-plugin-monkey/commit/41c504bdd6128c271abee70b384218622e6854a4), [issues#29](https://github.com/lisonge/vite-plugin-monkey/issues/29)

### 2.7.2-Features

- externalLoader remove GM_addStyle, [d30218e5](https://github.com/lisonge/vite-plugin-monkey/commit/b6e11888a2a0f2304da4e6fce8683c5dd30218e5)
- remove check cdn, [4a92f9a2](https://github.com/lisonge/vite-plugin-monkey/commit/fedf8dd5fbf53aa69cb8dc64781799954a92f9a2)
- remove node-fetch, [baf56b96](https://github.com/lisonge/vite-plugin-monkey/commit/dc1d12df85d2a43426797411ac1887f9baf56b96)
- add greasespot wiki, [a6314e47](https://github.com/lisonge/vite-plugin-monkey/commit/3fb5506eac780df3a2f28f81080b6c09a6314e47)

## 2.7.1

### 2.7.1-BugFixes

- unstable fix about @formkit/vue [49566846](https://github.com/lisonge/vite-plugin-monkey/commit/ee3e4876de82deb1f9bc4b2be8c8481649566846), [issues#29](https://github.com/lisonge/vite-plugin-monkey/issues/29)

## 2.7.0

### 2.7.0-Features

- virtual html, now we don't need index.html file [48484b95](https://github.com/lisonge/vite-plugin-monkey/commit/86419b55665f91407f7883740173443848484b95)
- remove Reflect api [90e2574a](https://github.com/lisonge/vite-plugin-monkey/commit/83484864104510fe638963be2860c03c90e2574a)

## 2.6.0

### 2.6.0-Features

- addHtml [fc8178e8](https://github.com/lisonge/vite-plugin-monkey/commit/52dc474bf4a0cdc8af5033ad0b9d892ffc8178e8)
- sort userscript key [75adf3df](https://github.com/lisonge/vite-plugin-monkey/commit/604180e3e2501c220749ead5eb2ed31575adf3df)
- rename fn2string [5750afb4](https://github.com/lisonge/vite-plugin-monkey/commit/b0c63a52b6fc6849dbb6b9e2b84d2ad55750afb4)

## 2.5.1

### 2.5.1-BugFixes

- cors pull_script [1355b96e](https://github.com/lisonge/vite-plugin-monkey/commit/417c7dec007033408fcc10b5bfb7b2681355b96e)

## 2.5.0

### 2.5.0-Features

- remove time tag, simplify css inject function code [a477bd49](https://github.com/lisonge/vite-plugin-monkey/commit/2b3bb058ff4446c2a3b4e24720667825a477bd49)
- others

## 2.4.4

### 2.4.4-BugFixes

- ext loader override url/raw loader [f3071c38](https://github.com/lisonge/vite-plugin-monkey/commit/3e89ebda2b3794b5d560377ca6250a52f3071c38)

## 2.4.3

### 2.4.3-Features

- autoGant ignore plugin internal module [77f13cf6](https://github.com/lisonge/vite-plugin-monkey/commit/049040923c505a4825f56958ec1fc09577f13cf6)

### 2.4.3-BugFixes

- externalGlobals support inlineDynamicImports [9d447f61](https://github.com/lisonge/vite-plugin-monkey/commit/75f5cf4127cea99757a22bb3d5e009169d447f61)

## 2.4.2

### 2.4.2-Features

- loader priority and support css?used [f97825f2](https://github.com/lisonge/vite-plugin-monkey/commit/385d694b226e1ca46f9c1892971147dff97825f2)

## 2.4.1

### 2.4.1-Features

- externalGlobals can be array [666934c8](https://github.com/lisonge/vite-plugin-monkey/commit/a66e75f9bf2c2c5707fed2c4ccad5ef7666934c8)

## 2.4.0

### 2.4.0-Features

- externalResource [396da63a](https://github.com/lisonge/vite-plugin-monkey/commit/b72b7f08db13993aef69a80f7dd3e0b3396da63a)

## 2.3.1

### 2.3.1-BugFixes

- not should add url from plugin.build.externalGlobals to userscript.require if code not import [a2a9988c](https://github.com/lisonge/vite-plugin-monkey/commit/22014b3cb7dfc29b12ff3a4c79ce366fa2a9988c)

## 2.3.0

### 2.3.0-Features

- minifyCss [c64decbf](https://github.com/lisonge/vite-plugin-monkey/commit/b1ba2e250dde11a948297f22eeb0d912c64decbf)

## 2.2.0

### 2.2.0-Features

- extend externalGlobals value type [3939cf82](https://github.com/lisonge/vite-plugin-monkey/commit/1019d43f654c1681863d6e268c31b03f3939cf82)

## 2.1.2

### 2.1.2-BugFixes

- config.build.externalGlobals, submodule cannot get correct version, [issues/16](https://github.com/lisonge/vite-plugin-monkey/issues/16) [fe2b159c](https://github.com/lisonge/vite-plugin-monkey/commit/9feef8582cb83bd7ccbeefeaa1c43a26fe2b159c)

## 2.1.1

### 2.1.1-Features

- support meta file [802ce298](https://github.com/lisonge/vite-plugin-monkey/commit/213b84afdb04ace03f9bac5c5a6a714a802ce298), [7164471f](https://github.com/lisonge/vite-plugin-monkey/commit/3fe8a58e52e9abf42de449ff37ffb53e7164471f)

## 2.0.1

### 2.0.1-Features

- add locale type example [a1a6c59d](https://github.com/lisonge/vite-plugin-monkey/commit/d54e363a06e984cb6b0e18178fa6ce09a1a6c59d)
- client export more type [cd7d3ade](https://github.com/lisonge/vite-plugin-monkey/commit/d6b827cb82094a032bd0699203b90585cd7d3ade), [74a0c311](https://github.com/lisonge/vite-plugin-monkey/commit/aad5c166778fd1a018e8fe885bc0ab8174a0c311)
- docs add table and more sample [83caadd9](https://github.com/lisonge/vite-plugin-monkey/commit/6988564a59b65cd220826c96d92dc50883caadd9)

### 2.0.1-BugFixes

- build userscript.include miss `/`, full detail see [issues/14](https://github.com/lisonge/vite-plugin-monkey/issues/14) [174fe00e](https://github.com/lisonge/vite-plugin-monkey/commit/7343aee8bd5712a1675fa6b41f6c31c8174fe00e)
- docs semantic error [91a659a2](https://github.com/lisonge/vite-plugin-monkey/commit/61e922a44fa3ccfd603dae4959bb355891a659a2)

## 2.0.0

### 2.0.0-Features

- support use gm_api and its hints by esm [93a776e8](https://github.com/lisonge/vite-plugin-monkey/commit/a603ae3750a86f3193d8a3cbfb9310d793a776e8)
- vite preview will auto open & install [24df8e14](https://github.com/lisonge/vite-plugin-monkey/commit/04de56f184231c8dcc57755d8d3cdfb924df8e14)
- externalGlobals support multiple url [b778c2ab](https://github.com/lisonge/vite-plugin-monkey/commit/891fc7bca4ebf116e34672c9328970f9b778c2ab)

### 2.0.0-BreakChanges

- no longer default mount gm_api to unsafeWindow, yuo should use gm_api by esm

## 1.1.4

### 1.1.4-BugFixes

- some grant api not mount to unsafeWindow [issues/6](https://github.com/lisonge/vite-plugin-monkey/issues/6) [e46e6f1a](https://github.com/lisonge/vite-plugin-monkey/commit/b81ad20b16ab9a395b760af3007ca794e46e6f1a)

## 1.1.3

### 1.1.3-BugFixes

- prefix not work in serve mode [ed73cf64](https://github.com/lisonge/vite-plugin-monkey/commit/6d8c21f3f9277803c775cf8f54425221ed73cf64)

## 1.1.2

### 1.1.2-BugFixes

- process.env.NODE_ENV not define [0eae47e3](https://github.com/lisonge/vite-plugin-monkey/commit/aabb188475e77278cd65fbfea4f2f1f00eae47e3)

## 1.1.1

### 1.1.1-Features

- now prefix can be false [42fc5c31](https://github.com/lisonge/vite-plugin-monkey/commit/82a43768cccaa971aa56640edb2d4aab42fc5c31)

- css inject simplify [5973acb2](https://github.com/lisonge/vite-plugin-monkey/commit/92157d871328852a8af8d215d51c4a815973acb2)

- locale_type set default value [afc0b476](https://github.com/lisonge/vite-plugin-monkey/commit/e89a64062ab8e01232baf2ea9d2391c6afc0b476)

- new cdn [41266aa3](https://github.com/lisonge/vite-plugin-monkey/commit/aca75a962b827661c230c5d5d8ac216841266aa3)

## 1.1.0

### 1.1.0-Features

- add cdn url util [09cf2d1d](https://github.com/lisonge/vite-plugin-monkey/commit/5d62c904e7690877715e641ff267614d09cf2d1d)

## 1.0.0

### 1.0.0-Features

- support vite@^3 [73cbaed1](https://github.com/lisonge/vite-plugin-monkey/commit/31ed164cd3706ba719cdc0cf2420f28673cbaed1)
- support template create, <https://github.com/lisonge/create-monkey.git>

### 1.0.0-BugFixes

- [can not work with vite plugin @vitejs/plugin-react](https://github.com/lisonge/vite-plugin-monkey/issues/3)
- use fixed port, now will auto detect port [4eba5d4d](https://github.com/lisonge/vite-plugin-monkey/commit/00367eaf64ef713c4cffd39bf040666d4eba5d4d)
- modify ping protocol for vite@3 [055ab211](https://github.com/lisonge/vite-plugin-monkey/commit/9a342f76823e43a33f51231284b7a91f055ab211)
- repeat open at boot [2c3ac266](https://github.com/lisonge/vite-plugin-monkey/commit/1b18448c611acf1fb89b7bc7c829098f2c3ac266)

### 1.0.0-BreakChanges

- change install entry of user.js to `/` [6a954910](https://github.com/lisonge/vite-plugin-monkey/commit/2ee31fb30181e2fe5b069fe2d8ce2bcf6a954910)

## 0.2.14

### 0.2.14-BugFixes

- require not available in esm -> [issues/2](https://github.com/lisonge/vite-plugin-monkey/issues/2) [2dfd5a3d](https://github.com/lisonge/vite-plugin-monkey/commit/dcde9c96216f786aa17b9f3de3711b182dfd5a3d)

## 0.2.13

### 0.2.13-Features

- support run-at document-start [9c7a30ed](https://github.com/lisonge/vite-plugin-monkey/commit/6d73040bfddffd5c8ad5b742a844bf0f9c7a30ed)

## 0.2.12

### 0.2.12-Features

- optimize, remove css_inject_js when without css [ac757555](https://github.com/lisonge/vite-plugin-monkey/commit/3a088d5a27872832911999acac807770ac757555)

- add plugin info to bundle [846c7a81](https://github.com/lisonge/vite-plugin-monkey/commit/2ce308c40e3384661405e33a932b3f28846c7a81)

## 0.2.11

### 0.2.11-BugFixes

- $extra not working [6c7d43eb](https://github.com/lisonge/vite-plugin-monkey/commit/991dae0461b8fa4da5e55eb709b48fcb6c7d43eb)

## 0.2.10

### 0.2.10-Features

- externalGlobals add name [71f4a209](https://github.com/lisonge/vite-plugin-monkey/commit/6a2f5d40664e1a55919eac79fb4099f071f4a209)

### 0.2.10-BugFixes

- userscript LocaleType miss colon [a4b11cc0](https://github.com/lisonge/vite-plugin-monkey/commit/53e501a35a9a08f638dbf9b8df613ba8a4b11cc0)

## 0.2.9

- del preinstall limit [c1517846](https://github.com/lisonge/vite-plugin-monkey/commit/47b9c3f954b73fbd83c9bb9de8956636c1517846)

## 0.2.8

### 0.2.8-Features

- set fixed dependencies [50ebfc58](https://github.com/lisonge/vite-plugin-monkey/commit/ba5d80f2b926bfbff1dc2f6d49f3950150ebfc58)

### 0.2.8-BugFixes

- default value for minify and sourcemap [3c97992d](https://github.com/lisonge/vite-plugin-monkey/commit/6f8a0dcf452cf90a6e5d537796671c8a3c97992d)

- add semi for template2string [08ec4491](https://github.com/lisonge/vite-plugin-monkey/commit/bc6e47df8cf24efeb8ff454559ebf7c408ec4491)

- code replace use g flag [680ca675](https://github.com/lisonge/vite-plugin-monkey/commit/3c332637f2eab738c73ee7c1c873f1e2680ca675)

## 0.2.7

### 0.2.7-Features

- Support TypeScript declaration maps [37010cce](https://github.com/lisonge/vite-plugin-monkey/commit/7d03faa4e7e905b4cd421c7951b11dd137010cce)

## 0.2.5

### 0.2.5-BugFixes

- Cannot find module './package.json' [5b7aa08c](https://github.com/lisonge/vite-plugin-monkey/commit/bd63a06491c46af64109a3f9dcf2202d5b7aa08c)

## 0.2.4

### 0.2.4-Features

- externalGlobals support (version:string)=>string generate cdn url [36e5e0b1](https://github.com/lisonge/vite-plugin-monkey/commit/95b3ea04d3d818d5e49ebfb20e1a21e236e5e0b1)

- support Tampermonkey, Violentmonkey and Greasemonkey merge config [143a10f0](https://github.com/lisonge/vite-plugin-monkey/commit/55c467357c3fdf439c9f51fe7a1280f6143a10f0)
