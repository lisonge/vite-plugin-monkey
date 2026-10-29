import { normalizePath, type Plugin } from 'vite';
import type { MonkeyContext, PackageContext } from '../utils/types.ts';
import { getModuleRealInfo } from '../utils/pkg.ts';
export const externalGlobalsFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  return {
    name: 'monkey:externalGlobals',
    enforce: 'pre',
    apply: 'build',
    config: {
      order: 'post',
      async handler(config) {
        context = await getContext(config.root);
        const entries = Object.entries(context.config.dependencies).filter(
          ([, v]) => v.kind === 'global',
        );
        return {
          build: {
            rolldownOptions: { external: entries.map(([name]) => name) },
          },
        };
      },
    },
    buildStart() {
      for (const [name, dependency] of Object.entries(
        context.config.dependencies,
      )) {
        if (dependency.kind === 'global')
          context.state.globalsPkg2VarName[name] = dependency.global;
      }
    },
    async generateBundle() {
      const used = new Set(Array.from(this.getModuleIds()).map(normalizePath));
      const urls: string[] = [];
      for (const [moduleName, external] of Object.entries(
        context.config.dependencies,
      )) {
        if (external.kind !== 'global' || !used.has(moduleName)) continue;
        let pkg: PackageContext | undefined;
        for (const url of external.urls) {
          urls.push(
            typeof url === 'string'
              ? url
              : await url(
                  (pkg ??= {
                    ...(await getModuleRealInfo(
                      moduleName,
                      context.config.entry,
                    )),
                    importName: moduleName,
                  }),
                ),
          );
        }
      }
      context.state.collectRequireUrls = urls;
    },
  };
};
