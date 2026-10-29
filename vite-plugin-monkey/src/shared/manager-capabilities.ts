export const managerCapabilities = {
  common: { legacy: false, excludedLegacy: [] },
  tampermonkey: { legacy: true, excludedLegacy: [] },
  violentmonkey: {
    legacy: true,
    excludedLegacy: [
      'GM_audio',
      'GM_log',
      'GM_webRequest',
      'GM_getTab',
      'GM_getTabs',
      'GM_saveTab',
    ],
  },
  greasemonkey: { legacy: false, excludedLegacy: [] },
} as const;

export type ManagerProfile = keyof typeof managerCapabilities;
export type ExcludedLegacyApi<P extends ManagerProfile> =
  (typeof managerCapabilities)[P]['excludedLegacy'][number];

export function supportsManagerExport(
  profile: ManagerProfile,
  name: string,
): boolean {
  const capabilities = managerCapabilities[profile];
  return (
    !name.startsWith('GM_') ||
    (capabilities.legacy &&
      !(capabilities.excludedLegacy as readonly string[]).includes(name))
  );
}
