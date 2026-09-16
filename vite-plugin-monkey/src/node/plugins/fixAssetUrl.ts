import type { Plugin, ResolvedConfig } from 'vite';
import { Visitor } from 'vite';
import MagicString from 'magic-string';

/**
 * convert `export default "/src/assets/a.png"` to `export default new URL("/src/assets/a.png", import.meta['url']).href`
 */
export const fixAssetUrlFactory = (): Plugin => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:fixAssetUrl',
    apply: 'serve',
    async configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async transform(code, id, options) {
      if (id === '\0vite/wasm-helper.js' && !options?.ssr) {
        const ms = new MagicString(code);
        new Visitor({
          CallExpression(node) {
            if (
              node.callee.type === 'Identifier' &&
              node.callee.name === 'fetch' &&
              node.arguments[0]?.type !== 'SpreadElement' &&
              node.arguments[0]
            ) {
              const url = node.arguments[0];
              // fetch otherwise resolves relative URLs against the host page.
              ms.appendLeft(url.start, 'new URL(');
              ms.appendRight(url.end, ", import.meta['url'])");
            }
          },
        }).visit(this.parse(code));
        if (ms.hasChanged())
          return { code: ms.toString(), map: ms.generateMap({ hires: true }) };
        return;
      }
      const [_, query = 'url'] = id.split('?', 2);
      if (
        (query.split('&').includes('url') || viteConfig.assetsInclude(id)) &&
        code.match(/^\s*export\s+default/)
      ) {
        const ast = this.parse(code);
        const defaultNode = ast.body[0];
        if (defaultNode?.type == 'ExportDefaultDeclaration') {
          const childNode = defaultNode?.declaration;
          if (
            childNode?.type == 'Literal' &&
            typeof childNode.value == 'string' &&
            childNode.value[0] === '/'
          ) {
            const p0 = JSON.stringify(childNode.value);
            return `export default new URL(${p0}, import.meta['url']).href`;
          }
        }
      }
    },
  };
};
