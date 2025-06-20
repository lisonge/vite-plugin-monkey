import type { Plugin } from 'vite';
import type { FinalMonkeyOption } from '../types';
import { getModuleRealInfo } from '../_util';

export const externalModulesPlugin = (
  finalOption: FinalMonkeyOption,
): Plugin => {
  const { importsList } = finalOption;
  return {
    name: 'monkey:externalModules',
    enforce: 'pre',
    apply: 'build',
    async config() {
      for (const [moduleName, varName2LibUrl] of finalOption.build
        .externalModules) {
        const { name, version } = await getModuleRealInfo(moduleName);

        if (typeof varName2LibUrl == 'string') {
          importsList[moduleName] = varName2LibUrl;
        } else if (typeof varName2LibUrl == 'function') {
          importsList[moduleName] = await varName2LibUrl(
            version,
            name,
            moduleName,
          );
        }
      }
      return {
        build: {
          rollupOptions: {
            external(source, _importer, _isResolved) {
              return (
                source in finalOption.globalsPkg2VarName ||
                source in finalOption.importsList
              );
            },
          },
        },
      };
    },
  };
};
