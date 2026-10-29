import { spawn } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const cli = path.join(
  path.dirname(require.resolve('playwright/package.json')),
  'cli.js',
);
const root = fileURLToPath(new URL('../../', import.meta.url));
const args = process.argv.slice(2);
const selected =
  args[0] && ['dev', 'build', 'contracts'].includes(args[0])
    ? args.shift()
    : undefined;
const suites = selected ? [selected] : ['dev', 'build'];
if (
  suites.length > 1 &&
  args.some((arg) => arg === '--ui' || arg === '--debug')
) {
  throw new Error(
    'Choose test:browser:dev or test:browser:build for interactive debugging.',
  );
}
let exitCode = 0;
for (const suite of suites) {
  const child = spawn(
    process.execPath,
    [cli, 'test', '--config', path.join(root, 'playwright.config.ts'), ...args],
    {
      cwd: root,
      stdio: 'inherit',
      env: {
        ...process.env,
        MONKEY_BROWSER_SUITE: suite,
        NODE_ENV: suite === 'dev' ? 'development' : 'production',
      },
    },
  );
  let interrupted = false;
  const interrupt = () => {
    interrupted = true;
    child.kill('SIGINT');
  };
  process.once('SIGINT', interrupt);
  process.once('SIGTERM', interrupt);
  try {
    const code = await new Promise<number>((resolve, reject) => {
      child.once('error', reject);
      child.once('exit', (code) => resolve(code ?? 1));
    });
    if (code !== 0) exitCode = code;
  } finally {
    process.removeListener('SIGINT', interrupt);
    process.removeListener('SIGTERM', interrupt);
  }
  if (interrupted) {
    exitCode = 130;
    break;
  }
}
process.exitCode = exitCode;
