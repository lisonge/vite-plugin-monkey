import path from 'node:path';
import { validateShape, validateUserscript } from './validate.ts';
import { getProjectPkg } from '../utils/pkg.ts';
import type { MonkeyOptions, NormalizedConfig } from '../utils/types.ts';
function clone<T>(value: T): T {
  if (value instanceof RegExp) return new RegExp(value) as T;
  if (Array.isArray(value)) return value.map(clone) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, clone(v)]),
    ) as T;
  return value;
}
function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}
export async function normalizeConfig(
  input: MonkeyOptions,
  root: string,
): Promise<NormalizedConfig> {
  validateShape(input);
  if (!input.entry || typeof input.entry !== 'string')
    throw new Error('[monkey] entry must be a file path');
  const project = await getProjectPkg(root);
  const userscript = input.userscript === undefined ? {} : input.userscript;
  validateUserscript(userscript);
  let publicPath: string | undefined;
  if (input.assets?.publicPath !== undefined) {
    const url = new URL(input.assets.publicPath);
    if (
      !['http:', 'https:'].includes(url.protocol) ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    )
      throw new Error(
        '[monkey] assets.publicPath must be an absolute HTTP(S) directory URL without credentials, query or fragment',
      );
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    publicPath = url.href;
  }
  const script =
    input.output?.script ??
    (project.name?.replace(/^@/, '').replaceAll('/', '-') ?? 'monkey') +
      '.user.js';
  const meta =
    input.output?.meta === true
      ? script.replace(/(?:\.user)?\.js$/, '') + '.meta.js'
      : typeof input.output?.meta === 'string'
        ? input.output.meta
        : undefined;
  for (const file of [script, meta])
    if (file && (path.isAbsolute(file) || file.split(/[\\/]/).includes('..')))
      throw new Error('[monkey] Output filename must stay inside outDir');
  if (script === meta)
    throw new Error('[monkey] output.meta must differ from script');
  return freeze(
    clone({
      entry: path.resolve(root, input.entry),
      userscript,
      project,
      dev: {
        namePrefix: input.dev?.namePrefix ?? '[dev] ',
      },
      output: { script, meta },
      assets: { publicPath },
      dependencies: input.dependencies ?? {},
      css: { inject: input.css?.inject ?? 'auto' },
    }),
  );
}
