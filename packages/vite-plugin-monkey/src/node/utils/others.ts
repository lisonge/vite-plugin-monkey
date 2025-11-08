import * as acornWalk from 'acorn-walk';
import { resolve } from 'import-meta-resolve';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { ProgramNode } from 'rollup';
import { transformWithEsbuild } from 'vite';
import type { Thenable } from './types';

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

export const miniCode = async (
  code: Thenable<string>,
  type: 'css' | 'js' = 'js',
) => {
  return (
    await transformWithEsbuild(await code, 'any_name.' + type, {
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

import type { ImportDeclaration, ImportExpression } from 'acorn';
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

export const getSafeIdentifier = (
  prefix: string,
  code: string,
  others?: string[],
): string => {
  let n = 0;
  let identifier = prefix;
  while (
    code.includes(identifier) ||
    (others && others.some((c) => c.includes(identifier)))
  ) {
    n++;
    identifier = `${prefix}${n.toString(16)}`;
  }
  return identifier;
};

export interface ImportNodeItem {
  node: ImportExpression | ImportDeclaration;
  value: string;
}

export const getProgramImportNodes = (
  program: ProgramNode,
): ImportNodeItem[] => {
  const nodes: ImportNodeItem[] = [];
  acornWalk.simple(program, {
    ImportDeclaration(node) {
      const s = node.source;
      if (s.type === 'Literal') {
        const value = s.value;
        if (!value) return;
        if (typeof value !== 'string') return;
        nodes.push({
          node,
          value,
        });
      }
    },
    ImportExpression(node) {
      const s = node.source;
      if (s.type === 'Literal') {
        const value = s.value;
        if (!value) return;
        if (typeof value !== 'string') return;
        nodes.push({
          node,
          value,
        });
      } else if (s.type === 'TemplateLiteral') {
        if (s.expressions.length) return;
        if (s.quasis.length !== 1) return;
        const value = s.quasis[0].value.cooked;
        if (!value) return;
        if (typeof value !== 'string') return;
        nodes.push({
          node,
          value,
        });
      }
    },
  });
  return nodes;
};

const nameReg = /[0-9a-zA-Z_]+/g;
const autoPreUnderline = (v: string): string => {
  if (!v) return '_';
  return Number.isInteger(Number(v[0])) ? `_${v}` : v;
};

export const getUpperCaseName = (
  value: string | undefined,
): string | undefined => {
  if (!value) return;
  const list = value.match(nameReg);
  if (!list?.length) return;
  return list
    .map((v, i) => {
      if (i === 0) return autoPreUnderline(v);
      return v[0].toUpperCase() + v.substring(1);
    })
    .join('');
};

const defaultCssSideEffects = (css: string) => {
  // @ts-ignore
  if (typeof GM_addStyle === 'function') {
    // @ts-ignore
    GM_addStyle(css);
  } else {
    // see #262
    (document.head || document.documentElement)
      .appendChild(document.createElement('style'))
      .append(css);
  }
};

export const getCssModuleCode = (
  f: string | ((css: string) => void) | undefined,
): string => {
  f ??= defaultCssSideEffects;
  return `
const set = new Set();
export default async (css) => {
  if (set.has(css)) return;
  set.add(css);
  ${`(${f})(css);`}
};
`;
};

export const removeComment = async (code: string): Promise<string> => {
  if (!(code.includes('/*') || code.includes('//'))) return code;
  const ranges: [number, number][] = [];
  (await import('acorn')).parse(code, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    onComment(_isBlock, text, start, end) {
      // https://esbuild.github.io/api/#legal-comments
      // remove /*! #__NO_SIDE_EFFECTS__ */
      if (text.includes('@license')) return;
      if (text.includes('@preserve')) return;
      while (start > 0 && !code[start - 1].trim()) {
        start--;
      }
      while (end < code.length && !code[end].trim()) {
        end++;
      }
      ranges.push([start, end]);
    },
  });
  if (!ranges.length) return code;
  const getSeparator = (start: number, end: number): string => {
    while (start < end) {
      if (code[start] === '\n') return '\n';
      start++;
    }
    return '\x20';
  };
  let newCode = '';
  let lastIndex = 0;
  for (const [start, end] of ranges) {
    newCode += code.slice(lastIndex, start) + getSeparator(start, end);
    lastIndex = end;
  }
  newCode += code.slice(lastIndex);
  return newCode;
};
