import { readFileSync } from 'node:fs';
import path from 'node:path';

export const delay = async (n = 0) => {
  await new Promise<void>((res) => {
    setTimeout(res, n);
  });
};

/**
 * @link https://stackoverflow.com/questions/7616461/
 */
export const hashCode = (str = '', seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const validUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u;
  } catch {}
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
  'GM_addElement',
  'GM_addStyle',
  'GM_addValueChangeListener',
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

export const packageJson = (() => {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target[k] = v;
    }
  });
  if (
    rawTarget.author instanceof Object &&
    typeof rawTarget.author?.name == 'string'
  ) {
    target.name = rawTarget.author?.name;
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

import { createRequire } from 'module';

export const compatResolve = (() => {
  const hostRequire = createRequire(process.cwd() + '/any_filename.js');
  return (id: string) => {
    return hostRequire.resolve(id);
  };
})();

export const lazy = <T extends object>(fn: () => T) => {
  let temp: object | undefined = undefined;
  return new Proxy<T>({} as T, {
    set(_, p, value, receiver) {
      if (!temp) {
        temp = fn();
      }
      return Reflect.set(temp, p, value, receiver);
    },
    get(_, p, receiver) {
      if (!temp) {
        temp = fn();
      }
      return Reflect.get(temp, p, receiver);
    },
    apply(_, thisArg, argArray) {
      if (!temp) {
        temp = fn();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Reflect.apply(temp, thisArg, argArray);
    },
    ownKeys() {
      if (!temp) {
        temp = fn();
      }
      return Reflect.ownKeys(temp);
    },
  });
};

export const traverse = <T>(
  target: T,
  getChildren: (target: T) => T[],
  action: (target: T) => void | true,
) => {
  const stack = [target];
  while (stack.length > 0) {
    const top = stack.pop();
    if (!top) break;
    if (action(top)) {
      break;
    }
    stack.push(...getChildren(top));
  }
};

import fs from 'fs/promises';
export const existFile = async (path: string) => {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
};
