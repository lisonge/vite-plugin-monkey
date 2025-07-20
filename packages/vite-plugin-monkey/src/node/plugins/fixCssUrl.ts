import type { Plugin } from 'vite';

export const fixCssUrlFactory = (): Plugin => {
  // https://github.com/lisonge/vite-plugin-monkey/issues/214
  return {
    name: 'monkey:fixCssUrl',
    apply: 'serve',
    async config() {
      const postUrl = (await import('postcss-url')).default;
      return {
        css: {
          postcss: {
            plugins: [postUrl({ url: 'inline' })],
          },
        },
      };
    },
  };
};
