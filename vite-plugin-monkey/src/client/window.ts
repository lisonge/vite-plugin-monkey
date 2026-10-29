import {
  monkeyWindowKey,
  bridgeVersion,
  bridgeProject,
} from 'virtual:monkey-config';
import type { MonkeyWindow } from './types/_context.ts';
import type { SandboxDocument } from '../shared/sandbox.ts';
export const monkeyWindow: MonkeyWindow = (() => {
  const bridge = (document as SandboxDocument)[monkeyWindowKey];
  const reinstall =
    'Reinstall the development userscript from the running Vite server, then reload this page.';
  if (bridge == null)
    throw new Error(
      '[vite-plugin-monkey] Userscript sandbox bridge not found. ' + reinstall,
    );
  if (bridge.version !== bridgeVersion)
    throw new Error(
      '[vite-plugin-monkey] Userscript sandbox bridge version mismatch. ' +
        reinstall,
    );
  if (bridge.project !== bridgeProject)
    throw new Error(
      '[vite-plugin-monkey] Userscript sandbox bridge project mismatch. ' +
        reinstall,
    );
  if (!bridge.sandbox)
    throw new Error(
      '[vite-plugin-monkey] Userscript sandbox bridge has no sandbox. ' +
        reinstall,
    );
  return bridge.sandbox;
})();
