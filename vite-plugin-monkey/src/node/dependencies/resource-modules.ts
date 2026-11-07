import { getCssModuleCode } from '../runtime/css.ts';
export const loaderModuleCode = (
  inject: import('../config/resolved.ts').NormalizedConfig['css']['inject'],
) => `
import { GM_getResourceText, GM_getResourceURL } from '$';
${getCssModuleCode(inject)}
export const cssLoader = (name) => { const css = GM_getResourceText(name); _css(css); return css; };
export const jsonLoader = (name) => JSON.parse(GM_getResourceText(name));
export const rawLoader = (name) => GM_getResourceText(name);
export const urlLoader = (name, type) => {
  return GM_getResourceURL(name, false).replace(
    /^data:application;base64,/,
    'data:' + type + ';base64,',
  );
};
`;
export const loaderModId = 'virtual:monkey-loader';
export const virtualloaderModId = '\0' + loaderModId;

interface ResourceModuleOptions {
  imports: string;
  expression: string;
  dynamic: boolean;
  awaitResult?: boolean;
}
export const resourceModuleCode = ({
  imports,
  expression,
  dynamic,
  awaitResult = false,
}: ResourceModuleOptions): string =>
  [
    imports,
    dynamic
      ? `let cache; export const _ = () => cache ??= Promise.resolve().then(() => ${expression}).then(value => ({default: value}))`
      : `export const _ = ${awaitResult ? 'await ' : ''}${expression}`,
    'export default _',
  ].join(';');

export const getExportModuleCode = (
  name: string,
  dynamic: boolean,
  params: unknown[],
): string => {
  return resourceModuleCode({
    imports: `import {${name}} from '${loaderModId}'`,
    expression: `${name}(${params.map((v) => JSON.stringify(v)).join(',')})`,
    dynamic,
  });
};

const resPrefix = 'virtual:monkey-resource-';
const resDynamicPrefix = 'virtual:monkey-resource-dynamic-';
export const isRawResId = (id: string): boolean => {
  return id.startsWith(resPrefix);
};
export const getValueResId = (value: string, dynamic = false): string => {
  return (dynamic ? resDynamicPrefix : resPrefix) + encodeURIComponent(value);
};
export const getVirtualResId = (id: string): string => {
  // append end \0 or encodeURIComponent to prevent handler that other plugin, such as css plugin
  return '\0' + id + '\0';
};

export const getResNameTuple = (
  id: string,
): [name: string, dynamic: boolean] | undefined => {
  if (id.startsWith('\0') && id.endsWith('\0')) {
    if (id.startsWith(resDynamicPrefix, 1)) {
      return [
        decodeURIComponent(id.slice(resDynamicPrefix.length + 1, -1)),
        true,
      ];
    } else if (id.startsWith(resPrefix, 1)) {
      return [decodeURIComponent(id.slice(resPrefix.length + 1, -1)), false];
    }
  }
};
