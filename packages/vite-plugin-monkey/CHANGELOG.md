# CHANGELOG

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
