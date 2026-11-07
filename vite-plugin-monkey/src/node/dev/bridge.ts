import crypto from 'node:crypto';
import { normalizePath } from 'vite';

const simpleHash = (str: string): string => {
  return crypto
    .createHash('md5')
    .update(str || '')
    .digest('base64url')
    .substring(0, 16);
};

export function createDevBridge(entry: string) {
  const bridgeProject = normalizePath(entry);
  return {
    monkeyWindowKey: `__monkeyWindow-${simpleHash(bridgeProject)}`,
    bridgeProject,
    bridgeVersion: 1,
  };
}
export type DevBridge = ReturnType<typeof createDevBridge>;

export function bridgeModuleCode({
  monkeyWindowKey,
  bridgeVersion,
  bridgeProject,
}: DevBridge) {
  return `export const monkeyWindowKey = ${JSON.stringify(monkeyWindowKey)}; export const bridgeVersion = ${bridgeVersion}; export const bridgeProject = ${JSON.stringify(bridgeProject)};`;
}
