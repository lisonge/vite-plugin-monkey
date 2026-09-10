# vite-plugin-monkey

<p>
  <a href="https://www.npmjs.com/package/vite-plugin-monkey"><img src="https://img.shields.io/npm/v/vite-plugin-monkey.svg" alt="npm package"></a>
  <a href="https://github.com/lisonge/vite-plugin-monkey/releases/"><img src="https://img.shields.io/node/v/vite-plugin-monkey.svg" alt="node compatibility"></a>
</p>

Develop and build userscripts for [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), [Greasemonkey](https://www.greasespot.net/), [ScriptCat](https://docs.scriptcat.org/), and other userscript engines with Vite.

Documentation: <https://vite-plugin-monkey.pages.dev/>

## Features

- Support Tampermonkey, Violentmonkey, Greasemonkey, ScriptCat, and other userscript engines
- Inject userscript metadata into the build output
- Open the development userscript in the default browser when its metadata changes
- Load external dependencies through userscript `@require` entries
- Load external modules through userscript `@resource` entries
- Import GM APIs through ESM with type hints
- Collect the GM APIs used by the code and configure `@grant` automatically
- Support top-level await and dynamic imports in a single userscript file
- Open the built userscript automatically when running Vite preview
- Support TypeScript and Vite features

## Quick Start

Create a userscript project with the scaffolding tool:

```shell
pnpm create monkey
# npm create monkey
# yarn create monkey
```

Choose one of the included templates:

| JavaScript                                            | TypeScript                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| [empty](/create-monkey/template-empty) (only js)      | [empty-ts](/create-monkey/template-empty-ts) (only ts)      |
| [vanilla](/create-monkey/template-vanilla) (js + css) | [vanilla-ts](/create-monkey/template-vanilla-ts) (ts + css) |
| [vue](/create-monkey/template-vue)                    | [vue-ts](/create-monkey/template-vue-ts)                    |
| [react](/create-monkey/template-react)                | [react-ts](/create-monkey/template-react-ts)                |
| [preact](/create-monkey/template-preact)              | [preact-ts](/create-monkey/template-preact-ts)              |
| [svelte](/create-monkey/template-svelte)              | [svelte-ts](/create-monkey/template-svelte-ts)              |
| [solid](/create-monkey/template-solid)                | [solid-ts](/create-monkey/template-solid-ts)                |

<details open>
  <summary>Initializing a Template</summary>

![vue-ts](https://user-images.githubusercontent.com/38517192/191197238-214abda1-f54f-4042-a046-2d7e6cf697a2.gif)

</details>

<details open>
  <summary>Hot Module Replacement</summary>

![hmr](https://user-images.githubusercontent.com/38517192/191197411-3d6f3795-e842-4cc1-a494-5d5f8425fd15.gif)

</details>

<details open>
  <summary>Build and Preview</summary>

![build and preview](https://user-images.githubusercontent.com/38517192/191197542-9c763af0-de2e-4a85-88c6-75a6d5924af9.gif)

</details>

## Installation

Install the plugin in an existing Vite project:

```shell
pnpm add -D vite-plugin-monkey
# npm i -D vite-plugin-monkey
# yarn add -D vite-plugin-monkey
```

Add `vite-plugin-monkey` as the last item in the Vite plugin list. See the [Getting Started guide](https://vite-plugin-monkey.pages.dev/guide/getting-started) for the basic configuration.
