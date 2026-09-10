---
layout: home

hero:
  name: vite-plugin-monkey
  text: Build userscripts with Vite
  tagline: Develop, preview, and bundle userscripts for Tampermonkey, Violentmonkey, Greasemonkey, ScriptCat, and other userscript engines.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Configuration
      link: /guide/configuration
    - theme: alt
      text: GitHub
      link: https://github.com/lisonge/vite-plugin-monkey

features:
  - title: Vite development experience
    details: Use fast startup, hot module replacement, TypeScript, top-level await, and dynamic imports while building userscripts.
    link: /guide/getting-started
  - title: Userscript metadata
    details: Generate the userscript header and collect used GM APIs to configure @grant automatically.
    link: /guide/configuration
  - title: External dependencies
    details: Load JavaScript and other resources through @require and @resource to keep the final bundle smaller.
    link: /guide/cdn-and-minification
  - title: Typed GM APIs
    details: Import GM APIs through ESM with type hints, global bindings, or automatic imports.
    link: /guide/gm-api
---
