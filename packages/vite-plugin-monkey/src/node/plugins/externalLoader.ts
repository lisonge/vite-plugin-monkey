import type { Plugin } from 'vite';
import { miniCode } from '../utils/others';

const cssLoader = (name: string) => {
  // @ts-ignore
  const css = GM_getResourceText(name);
  // @ts-ignore
  GM_addStyle(css);
  return css;
};

const jsonLoader = (name: string): unknown =>
  // @ts-ignore
  JSON.parse(GM_getResourceText(name));

const urlLoader = (name: string, type: string) =>
  // @ts-ignore
  GM_getResourceURL(name, false).replace(
    /^data:application;base64,/,
    `data:${type};base64,`,
  );

const rawLoader = (name: string) =>
  // @ts-ignore
  GM_getResourceText(name);

const loaderCode = [
  `export const cssLoader = ${cssLoader}`,
  `export const jsonLoader = ${jsonLoader}`,
  `export const urlLoader = ${urlLoader}`,
  `export const rawLoader = ${rawLoader}`,
].join(';');

export const externalLoaderFactory = (): Plugin => {
  return {
    name: 'monkey:externalLoader',
    apply: 'build',
    async resolveId(id) {
      if (id == 'virtual:plugin-monkey-loader') {
        return '\0' + id;
      }
    },
    async load(id) {
      if (id == '\0virtual:plugin-monkey-loader') {
        return miniCode(loaderCode, 'js');
      }
    },
  };
};
