import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssDiscardComments from 'postcss-discard-comments';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://example.com/*'],
        name: 'CSS PostCSS Test',
        description: 'Test CSS processing with PostCSS',
      },
      build: {
        metaFileName: true,
        cssOnDemand: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNested,
        autoprefixer,
        postcssDiscardComments({ removeAll: true }),
      ],
    },
  },
  build: {
    target: 'chrome80',
  },
});
