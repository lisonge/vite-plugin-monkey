import { getUpperCaseName } from '../utils/others';
import type { MonkeyPluginFactory } from '../utils/types';

export const styleFactory: MonkeyPluginFactory = (_getOption, pluginOption) => {
  if (pluginOption.styleImport === false) return;
  let isServe: boolean;
  return {
    name: 'monkey:style',
    enforce: 'pre',
    async config(_, env) {
      isServe = env.command === 'serve';
    },
    async resolveId(source, importer, options) {
      if (source === toolsModId) return resolvedToolsModId;
      if (source.endsWith(styleQuery)) {
        const cssId = source.slice(0, -styleQuery.length);
        const resolveId = (await this.resolve(cssId, importer, options))?.id;
        if (!resolveId) return;
        return resolveId + cssIdSuffix;
      }
    },
    load(id) {
      if (id === resolvedToolsModId) return toolsTemplate;
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
  const name = getUpperCaseName(cssId.split('/').at(-1));
  return (isServe ? styleDevTemplate : styleBuildTemplate)
    .replaceAll('{0}', JSON.stringify(cssId + '?inline'))
    .replaceAll('{1}', name || '_');
};

const toolsModId = 'virtual:monkey-style-tools';
const resolvedToolsModId = '\0' + toolsModId;
const toolsTemplate = `
var a;
export default (b) => ((a = document.createElement('style')), a.append(b), a);
`.trimStart();

const styleBuildTemplate = `
import {1} from {0};
import d from '${toolsModId}';
export default d({1});
`.trimStart();

const styleDevTemplate = `
import css from {0};
import createStyle from '${toolsModId}';
const style = createStyle(css);
export default style;
if (import.meta.hot) {
  style.setAttribute('data-vite-dev-id', {0});
  const nodes = [style];
  const cloneNode = style.cloneNode;
  style.cloneNode = function (...args) {
    const s = cloneNode.call(this, ...args);
    nodes.push(s);
    return s;
  };
  import.meta.hot.accept({0}, (v) => {
    const t = String(v.default || '');
    nodes.forEach((s) => {
      s.textContent = t;
    });
  });
}`.trimStart();
