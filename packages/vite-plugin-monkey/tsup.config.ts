import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  onSuccess: 'tsc --emitDeclarationOnly --declaration',
});
