import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.google.com/', 'https://github.com/*'],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
        externalResource: {
          'base64-img/test/img/car.svg': cdn.jsdelivr(),
          'base64-img/test/img/car.svg?url': cdn.jsdelivr(),
          'element-plus/dist/index.css': cdn.jsdelivr(),
          'element-plus/dist/index.css?url': cdn.jsdelivr(),
        },
      },
    }),
    {
      name: 'test:log',
      apply: 'serve',
      transform(code, id) {
        if (id.includes(`.svg`) && code.match(/^\s*export\s+default/)) {
          return `export default ((assertUrl) => {
            return new URL(assertUrl, new URL(import.meta['url']).origin).href
          })(${code.replace(/^\s*export\s+default/, '')});`;
        }
      },
    },
  ],
});
