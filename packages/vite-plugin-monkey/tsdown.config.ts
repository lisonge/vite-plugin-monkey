import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/node/index.ts'],
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: 'dist/node',
    format: 'esm',
    target: 'node20',
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
  },
]);
