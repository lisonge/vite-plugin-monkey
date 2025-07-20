import { resolve } from 'import-meta-resolve';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { OutputBundle } from 'rollup';
import { transformWithEsbuild } from 'vite';
import type { ResolvedMonkeyOption } from './types';

export const isFirstBoot = (): boolean => {
  return (Reflect.get(globalThis, '__vite_start_time') ?? 0) < 1000;
};

export const compatResolve = (id: string) => {
  return resolve(id, pathToFileURL(process.cwd() + '/any.js').href);
};

export const existFile = async (path: string) => {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
};

export const miniCode = async (code: string, type: 'css' | 'js' = 'js') => {
  return (
    await transformWithEsbuild(code, 'any_name.' + type, {
      minify: true,
      sourcemap: false,
      legalComments: 'none',
    })
  ).code.trimEnd();
};

export const moduleExportExpressionWrapper = (expression: string) => {
  let n = 0;
  let identifier = ``;
  while (expression.includes(identifier)) {
    identifier = `_${(n || ``).toString(16)}`;
    n++;
  }
  // https://github.com/lisonge/vite-plugin-monkey/issues/70
  return `(()=>{const ${identifier}=${expression};('default' in ${identifier})||(${identifier}.default=${identifier});return ${identifier}})()`;
};

export async function* walk(dirPath: string) {
  const pathnames = (await fs.readdir(dirPath)).map((s) =>
    path.join(dirPath, s),
  );
  while (pathnames.length > 0) {
    const pathname = pathnames.pop()!;
    const state = await fs.lstat(pathname);
    if (state.isFile()) {
      yield pathname;
    } else if (state.isDirectory()) {
      pathnames.push(
        ...(await fs.readdir(pathname)).map((s) => path.join(pathname, s)),
      );
    }
  }
}

export const getInjectCssCode = async (
  option: ResolvedMonkeyOption,
  bundle: OutputBundle,
) => {
  const cssTexts: string[] = [];
  Object.entries(bundle).forEach(([k, v]) => {
    if (v.type == 'asset' && k.endsWith('.css')) {
      cssTexts.push(v.source.toString());
      delete bundle[k];
    }
  });
  const css = cssTexts.join('').trim();
  if (css) {
    // use \x20 to compat unocss, see https://github.com/lisonge/vite-plugin-monkey/issues/45
    return await option.cssSideEffects(`\x20` + css + `\x20`);
  }
};

export const stringifyFunction = <T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
) => {
  return `;(${fn})(${args.map((v) => JSON.stringify(v)).join(',')});`;
};

export const dataJsUrl = (code: string): string => {
  return 'data:application/javascript,' + encodeURIComponent(code);
};

/**
 * string -> javascript data url
 * @example
 * dataUrl('console.log("hello world")')
 * // => data:application/javascript,console.log(%22hello%20world%22)
 */
export function dataUrl(code: string): string;
/**
 * function and it parameters -> iife -> mini_iife -> javascript data url
 *
 * @example
 * dataUrl((a)=>{console.log(a)}, 'world')
 * // => data:application/javascript,((z)%3D%3E%7Bconsole.log(a)%7D)('world')
 */
export function dataUrl<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): Promise<string>;
export function dataUrl(p0: any, ...args: any[]): string | Promise<string> {
  if (typeof p0 == 'string') {
    return dataJsUrl(p0);
  }
  return miniCode(stringifyFunction(p0, ...args)).then(dataJsUrl);
}

import { DomUtils, ElementType, parseDocument } from 'htmlparser2';

interface ScriptResult {
  src: string;
  text: string;
}

export const parserHtmlScriptResult = (html: string): ScriptResult[] => {
  const doc = parseDocument(html);
  type Element =
    ReturnType<typeof DomUtils.findAll> extends Array<infer T> ? T : never;
  const scripts = DomUtils.getElementsByTagType(
    ElementType.Script,
    doc,
  ) as Element[];
  return scripts.map<ScriptResult>((p) => {
    const src = p.attribs.src ?? '';
    const textNode = p.firstChild;
    let text = '';
    if (textNode?.type == ElementType.Text) {
      text = textNode.data ?? '';
    }
    if (src) {
      return { src, text };
    } else {
      return {
        src: '',
        text,
      };
    }
  });
};

import crypto from 'node:crypto';

export const simpleHash = (str = ''): string => {
  return crypto
    .createHash('md5')
    .update(str || '')
    .digest('base64url')
    .substring(0, 8);
};

export const safeURL = (
  url: string | URL | undefined | null,
  base?: string | URL,
): URL | undefined => {
  if (!url) return undefined;
  try {
    return new URL(url, base);
  } catch {}
};
