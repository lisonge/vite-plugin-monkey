import type { Plugin, ResolvedConfig } from 'vite';

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
    async transform(code, id) {
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
