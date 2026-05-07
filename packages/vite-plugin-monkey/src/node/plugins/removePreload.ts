import type { Plugin } from 'vite';

export const removePreloadFactory = (): Plugin => {
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/importAnalysisBuild.ts#L561
  // vite will replace import('id') to __vitePreload(()=> import('id'), [])
  // this plugin will disable this behavior
  return {
    name: 'monkey:removeVitePreload',
    apply: 'build',
    config() {
      return {
        build: {
          modulePreload: false,
        },
      };
    },
    configResolved(config) {
      const plugin = config.plugins.find(
        (p) => p.name === 'native:import-analysis-build',
      );
      if (plugin) {
        plugin.applyToEnvironment = undefined;
      }
    },
  };
};
