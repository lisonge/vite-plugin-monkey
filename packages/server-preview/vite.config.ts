import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  return {
    plugins: [solid()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    build: {
      minify: false,
      assetsDir: './',
      lib: {
        formats: ['es'],
        entry: './src/main.tsx',
        fileName: () => {
          return 'index.mjs';
        },
      },
    },
  };
});
