import module from 'node:module';
import type systemjsPkgT from 'systemjs/package.json';
import { ModuleToUrlFc } from './types';
import fs from 'node:fs/promises';
import { lazyValue } from './_lazy';
import { dataUrl } from './util';

const _require = module.createRequire(import.meta.url);

const systemjsPkg: typeof systemjsPkgT = _require(`systemjs/package.json`);

const systemjsSubPaths = [
  'dist/system.min.js',
  'dist/extras/named-register.min.js',
];

// https://github.com/systemjs/systemjs/blob/main/docs/api.md#systemconstructor
const customSystemInstanceCode = `;(typeof System!='undefined')&&(System=new System.constructor());`;

const systemjsAbsolutePaths = systemjsSubPaths.map((s) => {
  return _require.resolve(`systemjs/` + s);
});

export const systemjsTexts = lazyValue(() => {
  return Promise.all(
    systemjsAbsolutePaths
      .map((s) =>
        fs.readFile(s, 'utf-8').then((s) =>
          s
            .trim()
            .replace(/^\/\*[\s\S]*?\*\//, '')
            .replace(/\/\/.*map$/, '')
            .trim(),
        ),
      )
      .concat([Promise.resolve(customSystemInstanceCode)]),
  );
});

export const getSystemjsRequireUrls = (fn: ModuleToUrlFc) => {
  return systemjsSubPaths
    .map((p) => {
      return fn(systemjsPkg.version, systemjsPkg.name, p, p);
    })
    .concat([dataUrl(customSystemInstanceCode)]);
};
