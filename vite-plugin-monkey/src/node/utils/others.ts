import type { GmAddStyleType } from '../../client/types/addStyle.ts';
declare const GM_addStyle: GmAddStyleType | undefined;
import { Visitor, type ESTree } from 'vite';
import { resolve } from 'import-meta-resolve';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const compatResolve = (id: string, entry: string) => {
  return resolve(id, pathToFileURL(entry).href);
};

export const existFile = async (path: string) => {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
};

export const moduleExportExpressionWrapper = (expression: string) => {
  return `((value)=>({...Object(value),default: value != null && 'default' in Object(value) ? value.default : value}))(${expression})`;
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

export const stringifyFunction = <Args extends unknown[]>(
  fn: (...args: Args) => unknown,
  ...args: NoInfer<Args>
) => {
  return `;(${fn})(${args
    .map((value) =>
      value === undefined
        ? 'void 0'
        : (JSON.stringify(value, (_key, item) => {
            if (['function', 'symbol', 'bigint'].includes(typeof item))
              throw new TypeError(
                '[monkey] Function arguments must be JSON-serializable or undefined',
              );
            return item;
          }) ?? 'void 0'),
    )
    .join(',')});`;
};

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
    return { src, text };
  });
};

import crypto from 'node:crypto';

export const simpleHash = (str: string | undefined): string => {
  return crypto
    .createHash('md5')
    .update(str || '')
    .digest('base64url')
    .substring(0, 16);
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
  node: ESTree.ImportExpression | ESTree.ImportDeclaration;
  value: string;
}

export const getProgramImportNodes = (
  program: ESTree.Program,
): ImportNodeItem[] => {
  const nodes: ImportNodeItem[] = [];
  const collect = (node: ImportNodeItem['node']) => {
    const source = node.source;
    const value =
      source.type === 'Literal'
        ? source.value
        : source.type === 'TemplateLiteral' && !source.expressions.length
          ? source.quasis[0].value.cooked
          : undefined;
    if (typeof value === 'string' && value) nodes.push({ node, value });
  };
  new Visitor({
    'ImportDeclaration:exit': collect,
    'ImportExpression:exit': collect,
  }).visit(program);
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

const defaultCssSideEffects = (c: string) => {
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(c);
  } else {
    // see #262
    (document.head || document.documentElement)
      .appendChild(document.createElement('style'))
      .append(c);
  }
};

export const getCssModuleCode = (
  mode: 'auto' | 'gm' | 'dom' | false,
): string => {
  const f =
    mode === 'auto'
      ? defaultCssSideEffects.toString()
      : mode === 'gm'
        ? '(css)=>GM_addStyle(css)'
        : mode === 'dom'
          ? '(css)=>(document.head||document.documentElement).appendChild(document.createElement("style")).append(css)'
          : '()=>{}';
  return `
const s = new Set;
export const _css = async (t) => {
  if (s.has(t)) return;
  s.add(t);
  ${`(${f})(t);`}
};
`.trimStart();
};
