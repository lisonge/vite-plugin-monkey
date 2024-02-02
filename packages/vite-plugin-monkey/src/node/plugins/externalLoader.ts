import { Plugin, transformWithEsbuild } from 'vite';
import type { FinalMonkeyOption } from '../types';

const cssLoader = (resourceName: string) => {
  // @ts-ignore
  const css = GM_getResourceText(resourceName);
  // @ts-ignore
  GM_addStyle(css);
  return css;
};

const jsonLoader = (resourceName: string): unknown =>
  // @ts-ignore
  JSON.parse(GM_getResourceText(resourceName));

const urlLoader = (resourceName: string, mediaType: string) =>
  // @ts-ignore
  GM_getResourceURL(resourceName, false).replace(
    /^data:application;base64,/,
    `data:${mediaType};base64,`,
  );

const rawLoader = (resourceName: string) =>
  // @ts-ignore
  GM_getResourceText(resourceName);

const moduleSourceCode = [
  `export const cssLoader = ${cssLoader}`,
  `export const jsonLoader = ${jsonLoader}`,
  `export const urlLoader = ${urlLoader}`,
  `export const rawLoader = ${rawLoader}`,
].join(';');

export const externalLoaderPlugin = (
  finalOption: FinalMonkeyOption,
): Plugin => {
  return {
    name: 'monkey:externalLoader',
    enforce: 'pre',
    apply: 'build',
    async resolveId(id) {
      if (id == 'virtual:plugin-monkey-loader') {
        return '\0' + id;
      }
    },
    async load(id) {
      if (id == '\0virtual:plugin-monkey-loader') {
        return transformWithEsbuild(
          moduleSourceCode,
          '/virtual/plugin-monkey-loader/index.js',
          {
            minify: true,
            sourcemap: true,
            legalComments: 'none',
          },
        );
      }
    },
  };
};
