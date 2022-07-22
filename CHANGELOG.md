# CHANGELOG

## 1.1.3

### Bug Fixes

- prefix not work in serve mode [ed73cf64](https://github.com/lisonge/vite-plugin-monkey/commit/6d8c21f3f9277803c775cf8f54425221ed73cf64)

## 1.1.2

### Bug Fixes

- process.env.NODE_ENV not define [0eae47e3](https://github.com/lisonge/vite-plugin-monkey/commit/aabb188475e77278cd65fbfea4f2f1f00eae47e3)

## 1.1.1

### Features

- now prefix can be false [42fc5c31](https://github.com/lisonge/vite-plugin-monkey/commit/82a43768cccaa971aa56640edb2d4aab42fc5c31)

- css inject simplify [5973acb2](https://github.com/lisonge/vite-plugin-monkey/commit/92157d871328852a8af8d215d51c4a815973acb2)

- locale_type set default value [afc0b476](https://github.com/lisonge/vite-plugin-monkey/commit/e89a64062ab8e01232baf2ea9d2391c6afc0b476)

- new cdn [41266aa3](https://github.com/lisonge/vite-plugin-monkey/commit/aca75a962b827661c230c5d5d8ac216841266aa3)

## 1.1.0

### Features

- add cdn url util [09cf2d1d](https://github.com/lisonge/vite-plugin-monkey/commit/5d62c904e7690877715e641ff267614d09cf2d1d)

## 1.0.0

### Features

- support vite@^3 [73cbaed1](https://github.com/lisonge/vite-plugin-monkey/commit/31ed164cd3706ba719cdc0cf2420f28673cbaed1)
- support template create, <https://github.com/lisonge/create-monkey.git>

### Bug Fixes

- [can not work with vite plugin @vitejs/plugin-react](https://github.com/lisonge/vite-plugin-monkey/issues/3)
- use fixed port, now will auto detect port [4eba5d4d](https://github.com/lisonge/vite-plugin-monkey/commit/00367eaf64ef713c4cffd39bf040666d4eba5d4d)
- modify ping protocol for vite@3 [055ab211](https://github.com/lisonge/vite-plugin-monkey/commit/9a342f76823e43a33f51231284b7a91f055ab211)
- repeat open at boot [2c3ac266](https://github.com/lisonge/vite-plugin-monkey/commit/1b18448c611acf1fb89b7bc7c829098f2c3ac266)

### Break Changes

- change install entry of user.js to `/` [6a954910](https://github.com/lisonge/vite-plugin-monkey/commit/2ee31fb30181e2fe5b069fe2d8ce2bcf6a954910)

## 0.2.14

### Bug Fixes

- require not available in esm -> [issues/2](https://github.com/lisonge/vite-plugin-monkey/issues/2) [2dfd5a3d](https://github.com/lisonge/vite-plugin-monkey/commit/dcde9c96216f786aa17b9f3de3711b182dfd5a3d)

## 0.2.13

### Features

- support run-at document-start [9c7a30ed](https://github.com/lisonge/vite-plugin-monkey/commit/6d73040bfddffd5c8ad5b742a844bf0f9c7a30ed)

## 0.2.12

### Features

- optimize, remove css_inject_js when without css [ac757555](https://github.com/lisonge/vite-plugin-monkey/commit/3a088d5a27872832911999acac807770ac757555)

- add plugin info to bundle [846c7a81](https://github.com/lisonge/vite-plugin-monkey/commit/2ce308c40e3384661405e33a932b3f28846c7a81)

## 0.2.11

### Bug Fixes

- $extra not working [6c7d43eb](https://github.com/lisonge/vite-plugin-monkey/commit/991dae0461b8fa4da5e55eb709b48fcb6c7d43eb)

## 0.2.10

### Features

- externalGlobals add name [71f4a209](https://github.com/lisonge/vite-plugin-monkey/commit/6a2f5d40664e1a55919eac79fb4099f071f4a209)

### Bug Fixes

- userscript LocaleType miss colon [a4b11cc0](https://github.com/lisonge/vite-plugin-monkey/commit/53e501a35a9a08f638dbf9b8df613ba8a4b11cc0)

## 0.2.9

- del preinstall limit [c1517846](https://github.com/lisonge/vite-plugin-monkey/commit/47b9c3f954b73fbd83c9bb9de8956636c1517846)

## 0.2.8

### Features

- set fixed dependencies [50ebfc58](https://github.com/lisonge/vite-plugin-monkey/commit/ba5d80f2b926bfbff1dc2f6d49f3950150ebfc58)

### Bug Fixes

- default value for minify and sourcemap [3c97992d](https://github.com/lisonge/vite-plugin-monkey/commit/6f8a0dcf452cf90a6e5d537796671c8a3c97992d)

- add semi for template2string [08ec4491](https://github.com/lisonge/vite-plugin-monkey/commit/bc6e47df8cf24efeb8ff454559ebf7c408ec4491)

- code replace use g flag [680ca675](https://github.com/lisonge/vite-plugin-monkey/commit/3c332637f2eab738c73ee7c1c873f1e2680ca675)

## 0.2.7

### Features

- Support TypeScript declaration maps [37010cce](https://github.com/lisonge/vite-plugin-monkey/commit/7d03faa4e7e905b4cd421c7951b11dd137010cce)

## 0.2.5

### Bug Fixes

- Cannot find module './package.json' [5b7aa08c](https://github.com/lisonge/vite-plugin-monkey/commit/bd63a06491c46af64109a3f9dcf2202d5b7aa08c)

## 0.2.4

### Features

- externalGlobals support (version:string)=>string generate cdn url [36e5e0b1](https://github.com/lisonge/vite-plugin-monkey/commit/95b3ea04d3d818d5e49ebfb20e1a21e236e5e0b1)

- support Tampermonkey, Violentmonkey and Greasemonkey merge config [143a10f0](https://github.com/lisonge/vite-plugin-monkey/commit/55c467357c3fdf439c9f51fe7a1280f6143a10f0)
