import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'esnext',
  outDir: 'dist',
  format: ['esm'],
});
