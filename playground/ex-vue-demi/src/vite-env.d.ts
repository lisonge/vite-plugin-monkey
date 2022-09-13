/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/**
 * alias of vite-plugin-monkey/dist/client
 */
declare module '$' {
  export * from 'vite-plugin-monkey/dist/client';
}
