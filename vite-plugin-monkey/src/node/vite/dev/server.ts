import { fileURLToPath } from 'node:url';
import { normalizePath, type Plugin } from 'vite';
import { existFile } from '../../utils/files.ts';
import {
  createDevBridge,
  bridgeModuleCode,
  type DevBridge,
} from '../../dev/bridge.ts';
import {
  configModuleId,
  resolvedConfigModuleId,
  localHost,
} from '../../dev/paths.ts';
import { attachDevRoutes } from '../../dev/routes.ts';
import type { MonkeyContext } from '../../config/context.ts';

export const serverFactory = (
  getContext: (root?: string) => Promise<MonkeyContext>,
): Plugin => {
  let context: MonkeyContext;
  let bridge: DevBridge;
  return {
    name: 'monkey:server',
    apply: 'serve',
    async resolveId(source) {
      if (source === configModuleId) return resolvedConfigModuleId;
      if (source !== '$') return;
      // Workspace loads source; published builds resolve the sibling client bundle.
      const sourceEntry = fileURLToPath(
        new URL('../../../client/index.ts', import.meta.url),
      );
      return normalizePath(
        (await existFile(sourceEntry))
          ? sourceEntry
          : fileURLToPath(new URL('../client/index.js', import.meta.url)),
      );
    },
    load(id) {
      if (id === resolvedConfigModuleId) return bridgeModuleCode(bridge);
    },
    config: {
      order: 'post',
      async handler(userConfig) {
        context = await getContext(userConfig.root);
        bridge = createDevBridge(context.config.entry);
        return {
          optimizeDeps: { exclude: ['$', configModuleId] },
          preview: { host: userConfig.preview?.host ?? localHost, cors: true },
          server: { host: userConfig.server?.host ?? localHost, cors: true },
        };
      },
    },
    configureServer(server) {
      attachDevRoutes(server, context, bridge);
    },
  };
};
