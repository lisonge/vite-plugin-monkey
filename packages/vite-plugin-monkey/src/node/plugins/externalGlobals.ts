import { normalizePath } from 'vite';
import type { ResolvedMonkeyOption } from '../utils/types';
import { getModuleRealInfo } from '../utils/pkg';
import type { Plugin } from 'vite';

export const externalGlobalsFactory = (
  getOption: () => Promise<ResolvedMonkeyOption>,
): Plugin => {
  let option: ResolvedMonkeyOption;
  return {
    name: 'monkey:externalGlobals',
    enforce: 'pre',
    apply: 'build',
    async config() {
      option = await getOption();
      for (const [moduleName, varName2LibUrl] of option.build.externalGlobals) {
        const { name, version } = await getModuleRealInfo(moduleName);
        if (typeof varName2LibUrl == 'string') {
          option.globalsPkg2VarName[moduleName] = varName2LibUrl;
        } else if (typeof varName2LibUrl == 'function') {
          option.globalsPkg2VarName[moduleName] = await varName2LibUrl(
            version,
            name,
            moduleName,
          );
        } else if (varName2LibUrl instanceof Array) {
          const [varName, ...libUrlList] = varName2LibUrl;
          if (typeof varName == 'string') {
            option.globalsPkg2VarName[moduleName] = varName;
          } else if (typeof varName == 'function') {
            option.globalsPkg2VarName[moduleName] = await varName(
              version,
              name,
              moduleName,
            );
          }
          for (const libUrl of libUrlList) {
            // keep add order
            if (typeof libUrl == 'string') {
              option.requirePkgList.push({ url: libUrl, moduleName });
            } else if (typeof libUrl == 'function') {
              option.requirePkgList.push({
                url: await libUrl(version, name, moduleName),
                moduleName,
              });
            }
          }
        }
      }
      return {
        build: {
          rollupOptions: {
            external(source, _importer, _isResolved) {
              return source in option.globalsPkg2VarName;
            },
          },
        },
      };
    },
    async generateBundle() {
      const usedModIdSet = new Set(
        Array.from(this.getModuleIds()).map((s) => normalizePath(s)),
      );
      option.collectRequireUrls = option.requirePkgList
        .filter((p) => usedModIdSet.has(p.moduleName))
        .map((p) => p.url);
    },
  };
};
