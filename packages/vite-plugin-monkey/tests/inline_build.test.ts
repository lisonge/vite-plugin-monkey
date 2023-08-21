import fs from 'node:fs/promises';
import path from 'node:path';
import { RollupOutput } from 'rollup';
import { build, Plugin } from 'vite';

const cacheEntryDirFp = path.join(process.cwd(), `./node_modules/.vite/`);
const cacheEntryFp = path.join(
  cacheEntryDirFp,
  `__vite-plugin-monkey.entry.js`,
);

console.log({ cacheEntryDirFp, cacheEntryFp });
if (
  await fs
    .stat(cacheEntryDirFp)
    .then(() => false)
    .catch(() => true)
) {
  await fs.mkdir(cacheEntryDirFp, { recursive: true });
}

await fs.writeFile(cacheEntryFp, `import './xxx'`, 'utf-8');

const mock: Plugin = {
  name: 'mokey:mock',
  enforce: 'pre',
  resolveId(source, importer, options) {
    console.log({ source, importer, options });
    // if (!importer && options.isEntry) {
    //   return `\0` + __entry_name;
    // }
  },
  load(id, options) {
    // if (id.endsWith(id)) {
    //   return `console.log('hello-world')`;
    // }
    console.log({ id, options });
  },
};

const __entry_name = `__entry-${Math.random().toString(16).substring(2, 6)}.js`;

const buildResult = (await build({
  logLevel: 'error',
  configFile: false,
  esbuild: false,
  plugins: [mock],
  build: {
    write: false,
    minify: false,
    target: 'esnext',
    rollupOptions: {
      // external(source) {
      //   return source in finalOption.globalsPkg2VarName;
      // },
      // output: {
      //   globals: finalOption.globalsPkg2VarName,
      // },
    },
    lib: {
      entry: cacheEntryFp,
      formats: ['iife'],
      name: '__expose__',
      // formats: [finalOption.useSystemJs ? 'system' : 'iife'] as any,
      // name: finalOption.useSystemJs ? undefined : '__expose__',
      fileName: () => __entry_name,
    },
  },
})) as RollupOutput[];

// console.log(buildResult[0].output);
