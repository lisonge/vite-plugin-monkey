import { defineConfig } from 'vitepress';

export default defineConfig({
  vite: {
    server: {
      host: '0.0.0.0',
      port: 8100,
    },
  },
  title: 'vite-plugin-monkey',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: 'https://vitejs.dev/logo.svg',
      },
    ],
  ],
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: `指引`,
          items: [
            {
              text: '历程',
              link: '/guide/history',
            },
            {
              text: '开始',
              link: '/guide/',
            },
            {
              text: '功能',
              link: '/guide/features',
            },
          ],
        },
      ],
    },
    footer: {
      message: `Released under the MIT License`,
      // copyright: 'Copyright © 2019-present Evan You & Vite Contributors',
    },
  },
});

// https://cn.vitejs.dev/guide/features.html
// https://github.com/vitejs/docs-cn/blob/main/guide/why.md?plain=1
