import type { Options as ExecaOptions } from 'execa';
import { execa } from 'execa';
import minimist from 'minimist';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import colors from 'picocolors';

export const args = minimist(process.argv.slice(2));

const isDryRun = !!args.dry;

const compatRequire = createRequire(process.cwd() + '/any_filename.js');

if (isDryRun) {
  console.log(colors.inverse(colors.yellow(' DRY RUN ')));
  console.log();
}

interface Pkg {
  name: string;
  version: string;
  private?: boolean;
}
export function getPackageInfo(pkgName: string): {
  pkg: Pkg;
  pkgName: string;
  pkgDir: string;
  pkgPath: string;
  currentVersion: string;
} {
  const pkgDir = path.resolve(import.meta.dirname, '../packages/' + pkgName);

  if (!existsSync(pkgDir)) {
    throw new Error(`Package ${pkgName} not found`);
  }

  const pkgPath = path.resolve(pkgDir, 'package.json');
  const pkg: Pkg = compatRequire(pkgPath);
  const currentVersion = pkg.version;

  if (pkg.private) {
    throw new Error(`Package ${pkgName} is private`);
  }

  return {
    pkg,
    pkgName,
    pkgDir,
    pkgPath,
    currentVersion,
  };
}

export async function run(
  bin: string,
  args: string[],
  opts: ExecaOptions = {},
) {
  return execa(bin, args, { stdio: 'inherit', ...opts });
}

export async function dryRun(
  bin: string,
  args: string[],
  opts?: ExecaOptions,
): Promise<void> {
  return console.log(
    colors.blue(`[dryrun] ${bin} ${args.join(' ')}`),
    opts || '',
  );
}

export const runIfNotDry = isDryRun ? dryRun : run;

export function step(msg: string): void {
  return console.log(colors.cyan(msg));
}

export async function publishPackage(
  pkdDir: string,
  tag?: string,
): Promise<void> {
  // --no-git-checks, we use tag publish instead of branch
  const publicArgs = ['publish', '--access', 'public', '--no-git-checks'];
  if (tag) {
    publicArgs.push(`--tag`, tag);
  }
  await runIfNotDry('pnpm', publicArgs, {
    cwd: pkdDir,
  });
}
