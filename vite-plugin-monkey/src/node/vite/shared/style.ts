import type { PluginFactory } from '../../utils/types.ts';

export const styleFactory: PluginFactory = () => {
  let isServe: boolean;
  return {
    name: 'monkey:style',
    enforce: 'pre',
    config(_, env) {
      isServe = env.command === 'serve';
    },
    async resolveId(source, importer, options) {
      if (source.endsWith(styleQuery)) {
        const cssId = source.slice(0, -styleQuery.length);
        const resolveId = (await this.resolve(cssId, importer, options))?.id;
        if (!resolveId) return;
        return resolveId + cssIdSuffix;
      }
    },
    load(id) {
      if (id.endsWith(cssIdSuffix)) {
        const cssId = id.substring(0, id.length - cssIdSuffix.length);
        return getStyleModule(cssId, isServe);
      }
    },
  };
};

const styleQuery = '?style';

const cssIdSuffix = '.plugin-monkey-style';

const getStyleModule = (cssId: string, isServe: boolean): string => {
  const source = JSON.stringify(cssId + '?inline');
  return `
import css from ${source};
${isServe ? 'let currentCss = css; const nodes = new Set();' : ''}
export default function createStyle() {
  const style = document.createElement('style');
  style.textContent = ${isServe ? 'currentCss' : 'css'};
  ${isServe ? 'nodes.add(style);' : ''}
  return style;
}
${
  isServe
    ? `if (import.meta.hot) {
  import.meta.hot.accept(${source}, (module) => {
    currentCss = module.default;
    for (const style of nodes) style.textContent = currentCss;
  });
}`
    : ''
}
`.trimStart();
};
