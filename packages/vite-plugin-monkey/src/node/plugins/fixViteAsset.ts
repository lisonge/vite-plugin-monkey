import { Plugin, ResolvedConfig } from 'vite';
import type { FinalMonkeyOption } from '../types';

// should use import.meta['url'], becase vite will replace import.meta.url to self.location
const template = `
export default ((()=>{
  try{
    return new URL(__VALUE__, import.meta['url']).href
  }catch(_){
    return __VALUE__
  }
})())
`.trimStart();
// https://github.com/vitejs/vite/blob/9c114c5c72a6af87e3330d5573362554b4511265/packages/vite/src/node/plugins/asset.ts#L172

// TODO the relative path of the *.vue file template does not work

export const fixViteAssetPlugin = (_: FinalMonkeyOption): Plugin => {
  let viteConfig: ResolvedConfig;
  return {
    name: 'monkey:fixViteAsset',
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
        const ast: any = this.parse(code);
        if (ast.type == 'Program') {
          const defaultNode = ast.body?.[0];
          if (defaultNode?.type == 'ExportDefaultDeclaration') {
            const declarationNode = defaultNode?.declaration;
            const value = declarationNode?.value;
            if (
              declarationNode?.type == 'Literal' &&
              typeof value == 'string'
            ) {
              return template.replace(/__VALUE__/g, JSON.stringify(value));
            }
          }
        }
      }
    },
  };
};
