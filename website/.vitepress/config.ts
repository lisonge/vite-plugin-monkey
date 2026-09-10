import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { mermaidMarkdownPlugin } from './markdown/mermaid.ts';

const base = process.env.DOCS_BASE ?? '/';
const viteConfigPath = fileURLToPath(
  new URL('../vite.config.ts', import.meta.url),
);

const englishSidebar = [
  {
    text: 'Getting Started',
    items: [
      { text: 'Overview', link: '/guide/overview' },
      { text: 'Getting Started', link: '/guide/getting-started' },
    ],
  },
  {
    text: 'Guide',
    items: [
      { text: 'Configuration', link: '/guide/configuration' },
      { text: 'CDN and Minification', link: '/guide/cdn-and-minification' },
      { text: 'GM API Usage', link: '/guide/gm-api' },
    ],
  },
  {
    text: 'More',
    items: [
      { text: 'Examples', link: '/guide/examples' },
      { text: 'Notes', link: '/guide/notes' },
      { text: 'Build a Library', link: '/guide/build-library' },
    ],
  },
];

const chineseSidebar = [
  {
    text: '开始使用',
    items: [
      { text: '概览', link: '/zh/guide/overview' },
      { text: '开始使用', link: '/zh/guide/getting-started' },
    ],
  },
  {
    text: '指南',
    items: [
      { text: '配置', link: '/zh/guide/configuration' },
      { text: 'CDN 与压缩', link: '/zh/guide/cdn-and-minification' },
      { text: 'GM API 用法', link: '/zh/guide/gm-api' },
    ],
  },
  {
    text: '更多',
    items: [
      { text: '示例', link: '/zh/guide/examples' },
      { text: '注意事项', link: '/zh/guide/notes' },
      { text: '构建使用 GM API 的库', link: '/zh/guide/build-library' },
    ],
  },
];

export default defineConfig({
  base,
  title: 'vite-plugin-monkey',
  description: 'Develop and build userscripts with Vite.',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: 'https://vite.dev/logo-without-border.svg',
      },
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  markdown: {
    config: mermaidMarkdownPlugin,
  },
  vite: {
    configFile: viteConfigPath,
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'vite-plugin-monkey',
      description: 'Develop and build userscripts with Vite.',
      themeConfig: {
        nav: [{ text: 'Guide', link: '/guide/getting-started' }],
        sidebar: englishSidebar,
        outline: { label: 'On this page', level: [2, 4] },
        editLink: {
          pattern:
            'https://github.com/lisonge/vite-plugin-monkey/edit/main/website/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'medium',
            timeStyle: 'short',
          },
        },
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
        notFound: {
          title: 'Page not found',
          quote: 'This documentation page does not exist.',
          linkLabel: 'Go to documentation home',
          linkText: 'Back to vite-plugin-monkey',
        },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'vite-plugin-monkey',
      description: '使用 Vite 开发并构建用户脚本。',
      themeConfig: {
        nav: [{ text: '指南', link: '/zh/guide/getting-started' }],
        sidebar: chineseSidebar,
        outline: { label: '本页内容', level: [2, 4] },
        editLink: {
          pattern:
            'https://github.com/lisonge/vite-plugin-monkey/edit/main/website/:path',
          text: '在 GitHub 上编辑此页',
        },
        lastUpdated: {
          text: '最后更新',
          formatOptions: {
            dateStyle: 'medium',
            timeStyle: 'short',
          },
        },
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        notFound: {
          title: '页面不存在',
          quote: '这个文档页面不存在。',
          linkLabel: '返回文档首页',
          linkText: '返回 vite-plugin-monkey',
        },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳到正文',
      },
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lisonge/vite-plugin-monkey',
        ariaLabel: 'vite-plugin-monkey on GitHub',
      },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Escape',
                },
              },
            },
          },
        },
      },
    },
  },
});
