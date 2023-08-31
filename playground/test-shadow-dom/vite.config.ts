import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import monkey from 'vite-plugin-monkey';
import unocss from 'unocss/vite';

export default defineConfig({
  plugins: [
    solid(),
    unocss(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://songe.li/'],
      },
    }),
  ],
});
