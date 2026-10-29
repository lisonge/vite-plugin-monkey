import fs from 'node:fs/promises';
import module from 'node:module';

const _require = module.createRequire(import.meta.url);

const systemjsSubPaths = [
  'dist/system.min.js',
  'dist/extras/named-register.min.js',
];

// https://github.com/systemjs/systemjs/blob/main/docs/api.md#systemconstructor
const customSystemInstanceCode = `;(typeof System!='undefined')&&(System=new System.constructor());`;

const systemjsAbsolutePaths = systemjsSubPaths.map((s) => {
  return _require.resolve(`systemjs/` + s);
});

let source: Promise<string> | undefined;
export const getSystemjsSource = (): Promise<string> =>
  (source ??= Promise.all(
    systemjsAbsolutePaths.map(async (path) =>
      (await fs.readFile(path, 'utf-8'))
        .trim()
        .replace(/^\/\*[\s\S]*?\*\//, '')
        .replace(/\/\/.*map$/, '')
        .trim(),
    ),
  ).then((texts) => [...texts, customSystemInstanceCode].join('\n')));
