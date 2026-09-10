import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { resolveConfig } from 'vite';
import monkey from '../src/node/index.ts';
import { resolvedOption } from '../src/node/utils/option.ts';
import { getModuleRealInfo } from '../src/node/utils/pkg.ts';

test('resolves project data and modules from Vite root', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-root-'));
  const entry = path.join(root, 'src/main.ts');
  const packageDir = path.join(root, 'node_modules/fixture-pkg');

  try {
    await fs.mkdir(path.dirname(entry), { recursive: true });
    await fs.mkdir(packageDir, { recursive: true });
    await fs.writeFile(
      path.join(root, 'package.json'),
      JSON.stringify({ name: 'workspace-child', version: '1.2.3' }),
    );
    await fs.writeFile(entry, 'export {};');
    await fs.writeFile(
      path.join(packageDir, 'package.json'),
      JSON.stringify({
        name: 'fixture-pkg',
        version: '4.5.6',
        type: 'module',
        exports: { '.': './index.js' },
      }),
    );
    await fs.writeFile(path.join(packageDir, 'index.js'), 'export {};');
    await fs.writeFile(path.join(packageDir, 'private.js'), 'export {};');
    await fs.mkdir(path.join(root, 'src/nested'), { recursive: true });
    await fs.writeFile(
      path.join(root, 'src/package.json'),
      JSON.stringify({ type: 'module' }),
    );
    await fs.mkdir(path.join(root, 'shared'), { recursive: true });
    await fs.writeFile(
      path.join(root, 'shared/package.json'),
      JSON.stringify({ name: 'shared-package', version: '9.9.9' }),
    );

    const option = await resolvedOption({ entry: 'src/main.ts' }, root);
    assert.equal(option.entry, entry);
    assert.equal(option.build.fileName, 'workspace-child.user.js');

    const sourceRootOption = await resolvedOption(
      { entry: 'main.ts' },
      path.dirname(entry),
    );
    assert.equal(sourceRootOption.entry, entry);
    assert.equal(sourceRootOption.build.fileName, 'monkey.user.js');
    assert.deepEqual(sourceRootOption.userscript.name, {});

    const nestedPackageOption = await resolvedOption(
      { entry: 'src/nested/main.ts' },
      root,
    );
    assert.equal(nestedPackageOption.build.fileName, 'workspace-child.user.js');

    const sharedEntryOption = await resolvedOption(
      { entry: 'shared/main.ts' },
      root,
    );
    assert.equal(sharedEntryOption.build.fileName, 'workspace-child.user.js');

    const moduleInfo = await getModuleRealInfo(
      'fixture-pkg/private.js',
      option.entry,
    );
    assert.deepEqual(moduleInfo, {
      name: 'fixture-pkg',
      version: '4.5.6',
      resolveName: 'private.js',
    });
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});

test('refreshes project data when a plugin instance is reused', async () => {
  const fixtureDir = await fs.mkdtemp(path.join(os.tmpdir(), 'monkey-reuse-'));
  const firstRoot = path.join(fixtureDir, 'first');
  const secondRoot = path.join(fixtureDir, 'second');

  try {
    for (const root of [firstRoot, secondRoot]) {
      await fs.mkdir(path.join(root, 'src'), { recursive: true });
      await fs.writeFile(
        path.join(root, 'package.json'),
        JSON.stringify({ name: path.basename(root), version: '1.0.0' }),
      );
      await fs.writeFile(path.join(root, 'src/main.ts'), 'export {};');
    }

    const plugins = monkey({ entry: 'src/main.ts' });
    const rootPlugin = plugins.find((plugin) => plugin.name === 'monkey:root');
    const configPlugin = plugins.find(
      (plugin) => plugin.name === 'monkey:config',
    );
    assert.ok(rootPlugin);
    assert.ok(configPlugin);

    const configEnv = { command: 'build', mode: 'production' } as const;
    const runConfigHook = async (
      plugin: typeof rootPlugin,
      root: string,
    ): Promise<Record<string, unknown> | null | void> => {
      const hook =
        typeof plugin.config === 'function'
          ? plugin.config
          : plugin.config?.handler;
      assert.ok(hook);
      return hook.call({} as never, { root }, configEnv);
    };

    await runConfigHook(rootPlugin, firstRoot);
    const firstConfig = await runConfigHook(configPlugin, firstRoot);
    await runConfigHook(rootPlugin, secondRoot);
    const secondConfig = await runConfigHook(configPlugin, secondRoot);

    assert.equal(
      (firstConfig as { build: { rolldownOptions: { input: string } } }).build
        .rolldownOptions.input,
      path.join(firstRoot, 'src/main.ts'),
    );
    assert.equal(
      (secondConfig as { build: { rolldownOptions: { input: string } } }).build
        .rolldownOptions.input,
      path.join(secondRoot, 'src/main.ts'),
    );

    const resolvedConfig = await resolveConfig(
      {
        configFile: false,
        root: firstRoot,
        plugins: [
          ...monkey({ entry: 'src/main.ts' }),
          {
            name: 'set-root',
            config: () => ({ root: secondRoot }),
          },
        ],
      },
      'build',
    );
    assert.equal(resolvedConfig.root, secondRoot.replaceAll('\\', '/'));
    assert.equal(
      resolvedConfig.build.rolldownOptions.input,
      path.join(secondRoot, 'src/main.ts'),
    );
  } finally {
    await fs.rm(fixtureDir, { recursive: true, force: true });
  }
});
