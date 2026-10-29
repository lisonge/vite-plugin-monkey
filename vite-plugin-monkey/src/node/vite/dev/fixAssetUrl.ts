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
      const [, query = ''] = id.split('?', 2);
      const parameters = query.split('&');
      if (
        parameters.includes('raw') ||
        (!parameters.includes('url') && !viteConfig.assetsInclude(id))
      )
        return;
      const declaration = this.parse(code).body.find(
        (node) => node.type === 'ExportDefaultDeclaration',
      )?.declaration;
      if (
        declaration?.type === 'Literal' &&
        typeof declaration.value === 'string' &&
        declaration.value.startsWith('/')
      ) {
        const ms = new MagicString(code);
        ms.update(
          declaration.start,
          declaration.end,
          `new URL(${JSON.stringify(declaration.value)}, import.meta['url']).href`,
        );
        return { code: ms.toString(), map: ms.generateMap({ hires: true }) };
      }
    },
  };
};
