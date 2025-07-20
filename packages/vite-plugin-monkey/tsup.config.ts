import { defineConfig } from 'tsup';

const outExtension = (ctx: { format: 'esm' | 'cjs' | 'iife' }) => ({
  js: { esm: '.mjs', cjs: '.cjs', iife: '.js' }[ctx.format],
});

export default defineConfig([
  {
    entry: ['src/node/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: 'dist/node',
    format: 'esm',
    target: 'node20',
    shims: true,
    outExtension,
  },
  {
    entry: ['src/client/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    target: 'esnext',
    outDir: 'dist/client',
    format: 'esm',
    platform: 'browser',
    outExtension,
    metafile: true,
  },
]);
