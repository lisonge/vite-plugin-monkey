import { readFileSync } from 'fs';
import * as path from 'path';

export const delay = async (n = 0) => {
  await new Promise<void>((res) => {
    setTimeout(res, n);
  });
};

/**
 * @link https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
 */
export function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
}

export const validUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u;
  } catch {}
};

const get_vite_start_time = () => {
  // @see https://github.com/vitejs/vite/blob/c703a3348adeaad9dc92d805a381866917f2a03b/packages/vite/src/node/server/index.ts#L741
  // @ts-ignore
  const n: unknown = global.__vite_start_time;
  if (typeof n != 'number') {
    return 0;
  } else {
    return n;
  }
};

export const isRestart = (n = 1000) => get_vite_start_time() > n;

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
      readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')
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
