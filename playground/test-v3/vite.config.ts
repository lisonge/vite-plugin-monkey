import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: './src/main.ts',
      userscript: {
        match: [`https://lisonge.com/*`],
        resource: {
          // test stringSort
          resource3: `https://github.com/3`,
          resource1: `https://github.com/1`,
          resource2: `https://github.com/2`,
          resource4: `https://github.com/4`,
        },
        antifeature: [
          {
            tag: 'tag1',
            type: 'tracking',
            description: 'test_h',
          },
          {
            tag: 'tag1',
            type: 'tracking',
            description: 'test',
          },
          {
            tag: 'tag2',
            type: 'miner',
            description: 'hello',
          },
        ],
        $extra: [
          ['tag1', ['sub_tag1', 'sub_tag1']],
          ['tag0', ['sub_tag2', 'sub_tag1']],
          ['tag1', ['sub_tag0', 'sub_tag1', 'sub_tag1']],
        ],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
        systemjs: 'inline',
      },
    }),
  ],
});
