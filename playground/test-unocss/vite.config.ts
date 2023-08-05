import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import solid from 'vite-plugin-solid';
import { unocssStyle } from './plugins/unocss';

export default defineConfig((env) => {
  return {
    plugins: [
      solid(),
      unocssStyle(env),
      monkey({
        entry: 'src/main.tsx',
        userscript: {
          icon: 'https://vitejs.dev/logo.svg',
          namespace: 'npm/vite-plugin-monkey',
          match: ['https://songe.li/*'],
          connect: [`httpbin.org`, `i.pximg.net`],
          noframes: true,
        },
        build: {
          externalGlobals: {
            react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
            'react-dom': cdn.jsdelivr(
              'ReactDOM',
              'umd/react-dom.production.min.js',
            ),
          },
        },
      }),
    ],
  };
});
