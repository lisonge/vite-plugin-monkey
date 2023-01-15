import { PluginOption, transformWithEsbuild } from 'vite';
import type { FinalMonkeyOption } from '../types';

const GM_getResourceText = (name: string) => document.title;
const GM_getResourceURL = (name: string, isBlobUrl?: boolean) => document.title;

const cssLoader = (resourceName: string) => {
  const css = GM_getResourceText(resourceName);
  const style = document.createElement('style');
  style.innerText = css;
  document.head.append(style);
  return css;
};

const jsonLoader = (resourceName: string): unknown =>
  JSON.parse(GM_getResourceText(resourceName));

const urlLoader = (resourceName: string, mediaType: string) =>
  GM_getResourceURL(resourceName, false).replace(
    /^data:application;base64,/,
    `data:${mediaType};base64,`,
  );

const rawLoader = (resourceName: string) => GM_getResourceText(resourceName);

const moduleSourceCode = [
  `export const cssLoader = ${cssLoader}`,
  `export const jsonLoader = ${jsonLoader}`,
  `export const urlLoader = ${urlLoader}`,
  `export const rawLoader = ${rawLoader}`,
].join(';');

export const externalLoaderPlugin = (
  finalPluginOption: FinalMonkeyOption,
): PluginOption => {
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
