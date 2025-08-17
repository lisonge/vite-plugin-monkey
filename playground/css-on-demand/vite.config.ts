import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://example.com/*'],
        name: 'CSS On-Demand Test',
        description: 'Test CSS on-demand loading functionality',
      },
      build: {
        metaFileName: true,
        cssOnDemand: true,
      },
    }),
  ],
  build: {
    target: 'chrome80',
  },
});
