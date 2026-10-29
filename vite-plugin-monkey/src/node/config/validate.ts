import type { MonkeyOptions, Userscript } from './types.ts';
import { grantNames } from '../permissions/names.ts';
import { fields } from '../metadata/schema.ts';
export const keys = (value: unknown, allowed: string[], name: string) => {
  if (value === undefined) return;
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('[monkey] ' + name + ' must be an object');
  for (const key of Object.keys(value))
    if (!allowed.includes(key))
      throw new Error('[monkey] Unknown ' + name + '.' + key);
};
export function validateUserscript(userscript: Userscript) {
  if (
    !userscript ||
    typeof userscript !== 'object' ||
    Array.isArray(userscript)
  )
    throw new Error('[monkey] userscript must be an object');
  const grant = userscript.grant;
  if (
    grant !== undefined &&
    grant !== 'none' &&
    (!Array.isArray(grant) ||
      grant.some((value) => !grantNames.includes(value)))
  )
    throw new Error(
      '[monkey] userscript.grant must be none or an array of supported grant names',
    );
  for (const key of Object.keys(userscript))
    if (!Object.hasOwn(fields, key))
      throw new Error('[monkey] Unknown userscript.' + key);
  if (userscript.unwrap && userscript['top-level-await'])
    throw new Error(
      '[monkey] userscript.top-level-await cannot be combined with unwrap',
    );
  const extraKeys = Array.isArray(userscript.$extra)
    ? userscript.$extra.map(([name]) => name)
    : Object.keys(userscript.$extra ?? {});
  if (extraKeys.includes('grant'))
    throw new Error('[monkey] $extra cannot set grant; use userscript.grant');
}
export function validateShape(input: MonkeyOptions) {
  keys(
    input,
    ['entry', 'userscript', 'dev', 'output', 'assets', 'dependencies', 'css'],
    'options',
  );
  if (!input) throw new Error('[monkey] options must be an object');
  const scalar = (value: unknown, type: string, name: string) => {
    if (value !== undefined && typeof value !== type)
      throw new Error('[monkey] Invalid ' + name);
  };
  scalar(input.dev?.namePrefix, 'string', 'dev.namePrefix');
  scalar(input.output?.script, 'string', 'output.script');
  if (input.output?.script === '')
    throw new Error('[monkey] output.script cannot be empty');
  if (
    input.output?.meta !== undefined &&
    typeof input.output.meta !== 'boolean' &&
    (typeof input.output.meta !== 'string' || !input.output.meta)
  )
    throw new Error('[monkey] Invalid output.meta');
  keys(input.dev, ['namePrefix'], 'dev');
  keys(input.output, ['script', 'meta'], 'output');
  keys(input.assets, ['publicPath'], 'assets');
  scalar(input.assets?.publicPath, 'string', 'assets.publicPath');
  keys(input.css, ['inject'], 'css');
  if (
    input.css?.inject !== undefined &&
    !['auto', 'gm', 'dom', false].includes(input.css.inject)
  )
    throw new Error('[monkey] Invalid css.inject');
  if (
    input.dependencies !== undefined &&
    (!input.dependencies ||
      typeof input.dependencies !== 'object' ||
      Array.isArray(input.dependencies))
  )
    throw new Error('[monkey] dependencies must be an object');
  const url = (value: unknown) =>
    typeof value === 'function' ||
    (typeof value === 'string' && value.length > 0);
  for (const [name, value] of Object.entries(input.dependencies ?? {})) {
    keys(
      value,
      value?.kind === 'global'
        ? ['kind', 'global', 'urls']
        : ['kind', 'name', 'url', 'loader'],
      'dependencies.' + name,
    );
    if (!value) throw new Error('[monkey] Invalid dependency ' + name);
    if (value.kind === 'global') {
      if (
        typeof value.global !== 'string' ||
        !/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/.test(value.global) ||
        !Array.isArray(value.urls) ||
        value.urls.some((item) => !url(item))
      )
        throw new Error('[monkey] Invalid global dependency ' + name);
    } else if (value.kind === 'resource') {
      if (!url(value.url))
        throw new Error('[monkey] Missing resource URL ' + name);
      const loader = value.loader;
      if (loader !== undefined) {
        if (typeof loader === 'string') {
          if (!['css', 'json', 'raw', 'url'].includes(loader))
            throw new Error('[monkey] Invalid resource loader ' + name);
        } else {
          keys(loader, ['entry'], 'dependencies.' + name + '.loader');
          if (typeof loader.entry !== 'string' || !loader.entry.length)
            throw new Error('[monkey] Invalid resource loader ' + name);
        }
      }
    } else throw new Error('[monkey] Invalid dependency ' + name);
  }
}
