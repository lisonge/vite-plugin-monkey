import * as acornWalk from 'acorn-walk';
import { resolve } from 'import-meta-resolve';
import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { OutputBundle, PluginContext, OutputChunk } from 'rollup';
import { normalizePath, transformWithEsbuild } from 'vite';
import { logger } from './_logger';
import { FinalMonkeyOption } from './types';
import { grantNames } from './gm_api';

export const delay = async (n = 0) => {
  await new Promise<void>((res) => {
    setTimeout(res, n);
  });
};

const get_vite_start_time = () => {
  // @see https://github.com/vitejs/vite/blob/c703a3348adeaad9dc92d805a381866917f2a03b/packages/vite/src/node/server/index.ts#L741
  const n: unknown = Reflect.get(globalThis, '__vite_start_time') ?? 0;
  if (typeof n != 'number') {
    return 0;
  } else {
    return n;
  }
};

export const isFirstBoot = (n = 1000) => get_vite_start_time() < n;

interface RawPackageJson {
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  author?: string | { name: string };
  homepage?: string;
  repository?: string | { url?: string };
  bugs?: string | { url?: string };
}
interface PackageJson {
  name: string;
  version?: string;
  description?: string;
  license?: string;
  author?: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export const projectPkg = (() => {
  let rawTarget: RawPackageJson = {};
  try {
    rawTarget = JSON.parse(
      readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8'),
    );
  } catch {
    rawTarget = {};
  }

  const target: PackageJson = {
    name: 'monkey',
  };
  Object.entries(rawTarget).forEach(([k, v]) => {
    if (typeof v == 'string') {
      Reflect.set(target, k, v);
    }
  });
  if (
    rawTarget.author instanceof Object &&
    typeof rawTarget.author?.name == 'string'
  ) {
    target.author = rawTarget.author?.name;
  }
  if (
    rawTarget.bugs instanceof Object &&
    typeof rawTarget.bugs?.url == 'string'
  ) {
    target.bugs = rawTarget.bugs?.url;
  }
  if (
    rawTarget.repository instanceof Object &&
    typeof rawTarget.repository?.url == 'string'
  ) {
    const { url } = rawTarget.repository;
    if (url.startsWith('http')) {
      target.repository = url;
    } else if (url.startsWith('git+http')) {
      target.repository = url.slice(4);
    }
  }
  return target;
})();

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

const resolveModuleFromPath = async (subpath: string) => {
  const p = normalizePath(process.cwd()).split('/');
  for (let i = p.length; i > 0; i--) {
    const p2 = `${p.slice(0, i).join('/')}/node_modules/${subpath}`;
    if (await existFile(p2)) {
      return p2;
    }
  }
};

const compatResolveModulePath = async (id: string): Promise<string> => {
  try {
    return compatResolve(id);
  } catch (e) {
    // not defined in pkg/package.json but exist in pkg/subpath
    // https://github.com/lisonge/vite-plugin-monkey/issues/169
    const r = await resolveModuleFromPath(id);
    if (!r) {
      throw e;
    }
    return r;
  }
};

const isScopePkg = (name: string) => name.startsWith('@');

export const getModuleRealInfo = async (importName: string) => {
  const nameNoQuery = normalizePath(importName.split('?')[0]);
  const resolveName = await (async () => {
    const n = normalizePath(await compatResolveModulePath(nameNoQuery)).replace(
      /.*\/node_modules\/[^/]+\//,
      '',
    );
    if (isScopePkg(importName)) {
      return n.split('/').slice(1).join('/');
    }
    return n;
  })();
  let version: string | undefined = undefined;
  const nameList = nameNoQuery.split('/');
  let pkgName = nameNoQuery;
  while (nameList.length > 0) {
    pkgName = nameList.join('/');
    const filePath = await (async () => {
      const p = await resolveModuleFromPath(`${pkgName}/package.json`);
      if (p) {
        return p;
      }
      try {
        return compatResolve(`${pkgName}/package.json`);
      } catch {
        return undefined;
      }
    })();
    if (filePath === undefined || !(await existFile(filePath))) {
      nameList.pop();
      continue;
    }
    const modulePack: PackageJson = JSON.parse(
      await fs.readFile(filePath, 'utf-8'),
    );
    version = modulePack.version;
    break;
  }
  if (version === undefined) {
    logger.warn(
      `not found module ${nameNoQuery} version, use ${nameNoQuery}@latest`,
    );
    pkgName = nameNoQuery;
    version = 'latest';
  }
  return { version, name: pkgName, resolveName };
};

export const mergeObj = <T, S>(target: T | undefined, source: S) => {
  if (target === undefined) return { ...source } as T & S;
  const obj = { ...target };
  for (const k in source) {
    // @ts-ignore
    if (obj[k] === undefined) {
      // @ts-ignore
      obj[k] = source[k];
    }
  }
  return obj as T & S;
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

export const toValidURL = (url: unknown) => {
  if (typeof url != 'string') return;
  try {
    return new URL(url);
  } catch {}
};

export const isTopLevelAwaitAvailableTarget = async (
  target?: string | string[],
) => {
  target = getFinalTarget(target);
  return transformWithEsbuild(`await 1`, 'any.js', {
    target,
    logLevel: 'silent',
  })
    .then(() => true)
    .catch(() => false);
};

// https://github.com/vitejs/vite/blob/b9511f1ed8e36a618214944c69e2de6504ebcb3c/packages/vite/src/node/constants.ts#L20
export const ESBUILD_MODULES_TARGET = [
  'es2020',
  'edge88',
  'firefox78',
  'chrome87',
  'safari14',
];

export const getFinalTarget = (target?: string | string[]) => {
  if (target === 'modules') {
    target = ESBUILD_MODULES_TARGET;
  }
  return target;
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

// https://stackoverflow.com/questions/7616461
export const cyrb53hash = (str = ``, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0))
    .toString(36)
    .substring(0, 8);
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

export const collectGrant = (
  context: PluginContext,
  chunks: OutputChunk[],
  injectCssCode: string | undefined,
  minify: boolean,
): Set<string> => {
  const codes = new Set<string>();
  if (injectCssCode) {
    codes.add(injectCssCode);
  }
  for (const chunk of chunks) {
    if (minify) {
      // https://github.com/lisonge/vite-plugin-monkey/issues/166
      const modules = Object.values(chunk.modules);
      modules.forEach((m) => {
        const code = m.code;
        if (code) {
          codes.add(code);
        }
      });
    }
    codes.add(chunk.code);
  }
  const unusedMembers = new Set<string>(
    grantNames.filter((s) => s.includes(`.`)),
  );
  const endsWithWin = (a: string, b: string): boolean => {
    if (a.endsWith(b)) {
      return a === 'monkeyWindow.' + b || a === '_monkeyWindow.' + b;
    }
    return false;
  };
  const memberHandleMap = Object.fromEntries(
    grantNames
      .filter((s) => s.startsWith('window.'))
      .map((name) => [name, (v: string) => endsWithWin(v, name.split('.')[1])]),
  );
  const unusedIdentifiers = new Set<string>(
    grantNames.filter((s) => !s.includes(`.`)),
  );
  const usedGm = new Set<string>();
  const matchIdentifier = (name: string): boolean => {
    if (unusedIdentifiers.has(name)) {
      usedGm.add(name);
      unusedIdentifiers.delete(name);
      return true;
    }
    return false;
  };
  const matchMember = (name: string): boolean => {
    for (const unusedName of unusedMembers.values()) {
      if (name.endsWith(unusedName) || memberHandleMap[unusedName]?.(name)) {
        usedGm.add(unusedName);
        unusedMembers.delete(unusedName);
        return true;
      }
    }
    return false;
  };
  for (const code of codes) {
    if (!code.trim()) continue;
    const ast = context.parse(code);
    acornWalk.simple(
      ast,
      {
        MemberExpression(node) {
          if (unusedMembers.size === 0) return;
          if (
            node.computed ||
            node.object.type !== 'Identifier' ||
            node.property.type !== 'Identifier'
          ) {
            return;
          }
          if (
            node.object.name === 'monkeyWindow' ||
            node.object.name === '_monkeyWindow'
          ) {
            if (matchIdentifier(node.property.name)) {
              return;
            }
          }
          const name = node.object.name + '.' + node.property.name;
          matchMember(name);
        },
        Identifier(node) {
          // only one layer
          matchIdentifier(node.name);
        },
      },
      { ...acornWalk.base },
    );
    if (unusedMembers.size == 0 && unusedIdentifiers.size == 0) {
      break;
    }
  }
  return usedGm;
};

export const getInjectCssCode = async (
  finalOption: FinalMonkeyOption,
  rawBundle: OutputBundle,
) => {
  const cssTexts: string[] = [];
  Object.entries(rawBundle).forEach(([k, v]) => {
    if (v.type == 'asset' && k.endsWith('.css')) {
      cssTexts.push(v.source.toString());
      delete rawBundle[k];
    }
  });
  const css = cssTexts.join('').trim();
  if (css) {
    // use \x20 to compat unocss, see https://github.com/lisonge/vite-plugin-monkey/issues/45
    return await finalOption.cssSideEffects(`\x20` + css + `\x20`);
  }
};
