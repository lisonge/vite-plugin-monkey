import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig(async ({ command, mode }) => ({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: {
          // '': 'default_name', // if not set, will get from package.json
          ja: 'hentai',
          zh: '测试_',
        },
        namespace: 'https://github.com/lisonge',
        version: '1.0.1',
        icon: 'https://vitejs.dev/logo.svg',
        description: {
          '': 'default description zh', // if not set, will get from package.json
          zh: '描述',
          en: 'description',
          ja: '説明z',
          'zh-CN': '描述',
        },
        match: ['https://i.songe.li/'],
        include: [/^https:\/\/i\.songe\.li\/.*/],
      },
      build: {
        metaFileName: true,
        externalGlobals: {
          'blueimp-md5': cdn.jsdelivr('md5'),
          prettier: cdn.jsdelivr('prettier', 'standalone.js'),
          'prettier/parser-babel': [
            'prettierPlugins.babel',
            async (version, name, moduleName) => {
              // name == `prettier`
              // moduleName == `prettier/parser-babel`
              const subpath = `${moduleName.split('/').at(-1)}.js`;
              return `https://cdn.jsdelivr.net/npm/${name}@${version}/${subpath}`;
            },
          ],
        },
        externalResource: {
          'element-plus/dist/index.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
  build: {
    // if you want to minify xxx.user.js, set true
    // minify: true,
    sourcemap: 'inline',
  },
}));
