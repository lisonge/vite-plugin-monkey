import { readFileSync } from 'node:fs';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { normalizePath, transformWithEsbuild } from 'vite';
import { logger } from './_logger';

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

export const GM_keywords = [
  'GM.addElement',
  'GM.addStyle',
  'GM.deleteValue',
  'GM.getResourceUrl',
  'GM.getValue',
  'GM.info',
  'GM.listValues',
  'GM.notification',
  'GM.openInTab',
  'GM.registerMenuCommand',
  'GM.setClipboard',
  'GM.setValue',
  'GM.xmlHttpRequest',
  'GM.cookie',
  'GM_addElement',
  'GM_addStyle',
  'GM_addValueChangeListener',
  'GM_cookie',
  'GM_deleteValue',
  'GM_download',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_getTab',
  'GM_getTabs',
  'GM_getValue',
  'GM_info',
  'GM_listValues',
  'GM_log',
  'GM_notification',
  'GM_openInTab',
  'GM_registerMenuCommand',
  'GM_removeValueChangeListener',
  'GM_saveTab',
  'GM_setClipboard',
  'GM_setValue',
  'GM_unregisterMenuCommand',
  'GM_xmlhttpRequest',
  'unsafeWindow',
  'window.close',
  'window.focus',
  'window.onurlchange',
];
type RawPackageJson = {
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  author?: string | { name: string };
  homepage?: string;
  repository?: string | { url?: string };
  bugs?: string | { url?: string };
};
type PackageJson = {
  name: string;
  version: string;
  description?: string;
  license?: string;
  author?: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
};

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
    version: '1.0.0',
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

export const compatResolve = (() => {
  // see https://github.com/formkit/formkit/blob/c77a28c40bfecb8dbd4dca22f12e980abcaf55d9/packages/vue/package.json#L15
  // `@formkit/vue/package.json` -> `@formkit/vue/dist/package.json`  will error
  // I try solve it by resolvePackageJsonFromPath
  const compatRequire = createRequire(process.cwd() + '/any_filename.js');
  return (id: string) => {
    return compatRequire.resolve(id);
  };
})();

export const lazy = <T extends object>(fn: () => T) => {
  let temp: T | undefined = undefined;
  let o = {
    get k() {
      if (temp === undefined) {
        temp = fn();
      }
      return temp;
    },
  };
  return new Proxy({} as T, {
    get(_, p, receiver) {
      return Reflect.get(o.k, p, receiver);
    },
    set(_, p, newValue, receiver) {
      return Reflect.set(o.k, p, newValue, receiver);
    },
    has(_, p) {
      return Reflect.has(o.k, p);
    },
    ownKeys() {
      return Reflect.ownKeys(o.k);
    },
    isExtensible() {
      return Reflect.isExtensible(o.k);
    },
    deleteProperty(_, p) {
      return Reflect.deleteProperty(o.k, p);
    },
    setPrototypeOf(_, v) {
      return Reflect.setPrototypeOf(o.k, v);
    },
    getOwnPropertyDescriptor(_, p) {
      return Reflect.getOwnPropertyDescriptor(o.k, p);
    },
    defineProperty(_, property, attributes) {
      return Reflect.defineProperty(o.k, property, attributes);
    },
    getPrototypeOf() {
      return Reflect.getPrototypeOf(o.k);
    },
    preventExtensions() {
      return Reflect.preventExtensions(o.k);
    },
    apply(_, thisArg, argArray) {
      // @ts-ignore
      return Reflect.apply(o.k, thisArg, argArray);
    },
    construct(_, argArray, newTarget) {
      // @ts-ignore
      return Reflect.construct(o.k, argArray, newTarget);
    },
  });
};

export const existFile = async (path: string) => {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
};

/**
 * unstable
 */
const resolvePackageJsonFromPath = async (name: string) => {
  const p = normalizePath(process.cwd()).split('/');
  for (let i = p.length; i > 0; i--) {
    const p2 = `${p.slice(0, i).join('/')}/node_modules/${name}/package.json`;
    if (await existFile(p2)) {
      return p2;
    }
  }
};

export const getModuleRealInfo = async (importName: string) => {
  const importName2 = normalizePath(importName.split('?')[0]);
  const resolveName = normalizePath(compatResolve(importName2)).replace(
    /.*\/node_modules\/[^/]+\//,
    '',
  );
  let version: string | undefined = undefined;
  const nameList = importName2.split('/');
  let pkgName = importName2;
  while (nameList.length > 0) {
    pkgName = nameList.join('/');
    const filePath = await (async () => {
      const p = await resolvePackageJsonFromPath(pkgName);
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
      `not found module ${importName2} version, use ${importName2}@latest`,
    );
    pkgName = importName2;
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
