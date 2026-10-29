import { defineConfig } from 'playwright/test';

const suite = process.env.MONKEY_BROWSER_SUITE ?? 'dev';
if (!['dev', 'build', 'contracts'].includes(suite)) {
  throw new Error(`Unknown browser test suite: ${suite}`);
}
const nodeEnv = suite === 'dev' ? 'development' : 'production';
if (process.env.NODE_ENV && process.env.NODE_ENV !== nodeEnv) {
  throw new Error(
    `The ${suite} suite requires NODE_ENV=${nodeEnv}. Use pnpm test:browser:${suite}.`,
  );
}
// The launcher sets this before process startup; direct Playwright CLI usage
// also sets it before test modules (and framework plugins) are imported.
process.env.NODE_ENV = nodeEnv;

export default defineConfig({
  testDir: `./vite-plugin-monkey/test/browser/${suite}`,
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 2,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  outputDir: `./test-results/${suite}`,
  reporter: [
    ['list'],
    ['html', { outputFolder: `playwright-report/${suite}`, open: 'never' }],
  ],
  use: {
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: `chromium-${suite}` }],
});
