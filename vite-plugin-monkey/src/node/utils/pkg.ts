import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizePath } from 'vite';
import { compatResolve, existFile } from './others.ts';

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
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  author?: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
}

export const getProjectPkg = async (root: string): Promise<PackageJson> => {
  let dir = path.resolve(root);
  let rawPkg: RawPackageJson | undefined;
  while (true) {
    const candidate: RawPackageJson | undefined = await fs
      .readFile(path.join(dir, 'package.json'), 'utf-8')
      .then(JSON.parse)
      .catch(() => {});
    if (candidate) {
      rawPkg = candidate;
      break;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  const pkg: PackageJson = {};
  if (!rawPkg) return pkg;
  Object.entries(rawPkg).forEach(([k, v]) => {
    if (typeof v == 'string') {
      Reflect.set(pkg, k, v);
    }
  });
  if (
    typeof rawPkg.author === 'object' &&
    typeof rawPkg.author?.name == 'string'
  ) {
    pkg.author = rawPkg.author.name;
  }
  if (typeof rawPkg.bugs === 'object' && typeof rawPkg.bugs?.url == 'string') {
    pkg.bugs = rawPkg.bugs.url;
  }
  if (
    typeof rawPkg.repository === 'object' &&
    typeof rawPkg.repository?.url == 'string'
  ) {
    const { url } = rawPkg.repository;
    if (url.startsWith('http')) {
      pkg.repository = url;
    } else if (url.startsWith('git+http')) {
      pkg.repository = url.substring(4);
    }
  }
  return pkg;
};

const isScopePkg = (name: string): boolean => name.startsWith('@');
const resolveModuleFromPath = async (
  subpath: string,
  entry: string,
): Promise<string | undefined> => {
  let dir = path.dirname(entry);
  while (true) {
    const modulePath = path.join(dir, 'node_modules', subpath);
    if (await existFile(modulePath)) return modulePath;
    const parent = path.dirname(dir);
    if (parent === dir) return;
    dir = parent;
  }
};

const compatResolveModulePath = async (
  id: string,
  entry: string,
): Promise<string> => {
  try {
    return compatResolve(id, entry);
  } catch (e) {
    // not defined in pkg/package.json but exist in pkg/subpath
    // https://github.com/lisonge/vite-plugin-monkey/issues/169
    const r = await resolveModuleFromPath(id, entry);
    if (!r) {
      throw e;
    }
    return r;
  }
};

export const getModuleRealInfo = async (importName: string, entry: string) => {
  const nameNoQuery = normalizePath(importName.split('?')[0]);
  const resolveName = await (async () => {
    const n = normalizePath(
      await compatResolveModulePath(nameNoQuery, entry),
    ).replace(/.*\/node_modules\/[^/]+\//, '');
    if (isScopePkg(importName)) {
      return n.split('/').slice(1).join('/');
    }
    return n;
  })();
  let version: string | undefined = undefined;
  const nameList = nameNoQuery.split('/');
  let name = nameNoQuery;
  while (nameList.length > 0) {
    name = nameList.join('/');
    const filePath = await (async () => {
      const p = await resolveModuleFromPath(`${name}/package.json`, entry);
      if (p) {
        return p;
      }
      try {
        return compatResolve(`${name}/package.json`, entry);
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
    console.warn(
      `[plugin-monkey] not found module ${nameNoQuery} version, use ${nameNoQuery}@latest`,
    );
    name = nameNoQuery;
    version = 'latest';
  }
  return { version, name, resolveName };
};
