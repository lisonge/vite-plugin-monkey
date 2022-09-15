import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'https://github.com/lisonge',
        icon: 'https://vitejs.dev/logo.svg',
        match: 'https://i.songe.li/*',
        description: 'default_description',
      },
      build: {
        externalGlobals: {
          md5: cdn.jsdelivr('MD5', 'dist/md5.min.js'),
        },
        externalResource: {
          'animate.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
}));
