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
    format: ['cjs', 'esm'],
    target: 'node14',
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
    format: ['esm'],
    platform: 'browser',
    outExtension,
    metafile: true,
  },
  {
    entry: ['src/native/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    target: 'esnext',
    outDir: 'dist/native',
    format: ['esm'],
    platform: 'browser',
    outExtension,
    metafile: true,
  },
]);
