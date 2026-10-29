import { afterEach, expect, test, vi } from 'vitest';

vi.mock('virtual:monkey-config', () => ({
  monkeyWindowKey: 'expected-bridge',
  bridgeVersion: 1,
  bridgeProject: 'fixture',
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

test('missing sandbox bridge throws instead of using the page window', async () => {
  vi.stubGlobal('document', { 'old-bridge': { GM_getValue: () => 42 } });
  vi.stubGlobal('window', { GM_getValue: () => 'page value' });

  await expect(import('../../src/client/window.ts')).rejects.toThrow(
    '[vite-plugin-monkey] Userscript sandbox bridge not found. Reinstall the development userscript from the running Vite server, then reload this page.',
  );
});

test('matching sandbox bridge returns the userscript sandbox', async () => {
  const sandbox = { GM_getValue: () => 42 };
  vi.stubGlobal('document', {
    'expected-bridge': { version: 1, project: 'fixture', sandbox },
  });
  vi.stubGlobal('window', { GM_getValue: () => 'page value' });

  const { monkeyWindow } = await import('../../src/client/window.ts');
  expect(monkeyWindow).toBe(sandbox);
  expect(monkeyWindow.GM_getValue('answer')).toBe(42);
});

for (const [bridge, message] of [
  [{ version: 0, project: 'fixture' }, 'version mismatch'],
  [{ version: 1, project: 'other' }, 'project mismatch'],
  [{ version: 1, project: 'fixture' }, 'no sandbox'],
] as const)
  test('rejects bridge ' + message, async () => {
    vi.stubGlobal('document', { 'expected-bridge': bridge });
    await expect(import('../../src/client/window.ts')).rejects.toThrow(message);
  });
