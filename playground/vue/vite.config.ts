import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { presetMini } from 'unocss';
import monkey, { npmCdn } from 'vite-plugin-monkey';
import { hostPagePlugin, preview, server, userscript } from '../shared.ts';
export default defineConfig(({ mode }) => ({
  plugins: [
    hostPagePlugin(),
    vue(),
    UnoCSS({ presets: [presetMini()] }),
    monkey({
      entry: 'src/main.ts',
      userscript: userscript('Vue'),
      output: { script: 'vue.user.js' },
      dependencies:
        mode === 'external'
          ? {
              vue: {
                kind: 'global',
                global: 'Vue',
                urls: [npmCdn({ path: 'dist/vue.global.prod.js' })],
              },
              pinia: {
                kind: 'global',
                global: 'Pinia',
                urls: [npmCdn({ path: 'dist/pinia.iife.prod.js' })],
              },
              'element-plus': {
                kind: 'global',
                global: 'ElementPlus',
                urls: [npmCdn({ path: 'dist/index.full.min.js' })],
              },
              'element-plus/dist/index.css': {
                kind: 'resource',
                url: npmCdn(),
              },
            }
          : undefined,
    }),
  ],
  server,
  preview,
}));
