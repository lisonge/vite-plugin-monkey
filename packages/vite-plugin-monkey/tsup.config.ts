import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/node/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: 'dist/node',
    format: ['cjs', 'esm'],
    target: 'node14',
  },
  {
    entry: ['src/client/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    target: 'esnext',
    outDir: 'dist/client',
    format: ['esm'],
  },
]);
