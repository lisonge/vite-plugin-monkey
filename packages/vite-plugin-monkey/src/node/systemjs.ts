import type systemjsPkgT from 'systemjs/package.json';
const systemjsPkg: typeof systemjsPkgT = module.createRequire(import.meta.url)(
  `systemjs/package.json`,
);
import { jsdelivr } from './cdn';
import module from 'node:module';
import fs from 'node:fs/promises';

export const systemjsSubPaths = [
  'dist/system.min.js',
  'dist/extras/named-register.min.js',
];

export const systemjsRequireUrls = systemjsSubPaths.map((p) => {
  return jsdelivr('', p)[1](systemjsPkg.version, systemjsPkg.name);
});

// export const systemjsRequireTexts = systemjsSubPaths
//   .map((p) => {
//     return module
//       .createRequire(import.meta.url)
//       .resolve(`${systemjsPkg.name}/${p}`);
//   })
//   .map((p) => fs.readFile(p, 'utf-8'));
