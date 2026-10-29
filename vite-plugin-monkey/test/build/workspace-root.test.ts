import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from '../support/fixture.ts';
import { resolveConfig } from 'vite';
import monkey from '../../src/node/index.ts';
import { createContext } from '../../src/node/config/context.ts';
import { getModuleRealInfo } from '../../src/node/utils/pkg.ts';
test('resolves project data and modules from Vite root', async ({
  project,
}) => {
  const { root } = project;
  const entry = path.join(root, 'src/main.ts');
  const packageDir = path.join(root, 'node_modules/fixture-pkg');
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
  const option = await createContext({ entry: 'src/main.ts' }, root);
  assert.equal(option.config.entry, entry);
  assert.equal(option.config.output.script, 'workspace-child.user.js');
  const sourceRootOption = await createContext(
    { entry: 'main.ts' },
    path.dirname(entry),
  );
  assert.equal(sourceRootOption.config.entry, entry);
  assert.equal(sourceRootOption.config.output.script, 'monkey.user.js');
  assert.deepEqual(sourceRootOption.config.userscript.name, undefined);
  const nestedPackageOption = await createContext(
    { entry: 'src/nested/main.ts' },
    root,
  );
  assert.equal(
    nestedPackageOption.config.output.script,
    'workspace-child.user.js',
  );
  const sharedEntryOption = await createContext(
    { entry: 'shared/main.ts' },
    root,
  );
  assert.equal(
    sharedEntryOption.config.output.script,
    'workspace-child.user.js',
  );
  const moduleInfo = await getModuleRealInfo(
    'fixture-pkg/private.js',
    option.config.entry,
  );
  assert.deepEqual(moduleInfo, {
    name: 'fixture-pkg',
    version: '4.5.6',
    resolveName: 'private.js',
  });
});
test('refreshes project data when a plugin instance is reused', async ({
  project,
}) => {
  const { root } = project;
  const fixtureDir = root;
  const firstRoot = path.join(fixtureDir, 'first');
  const secondRoot = path.join(fixtureDir, 'second');
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
    (
      firstConfig as {
        build: {
          rolldownOptions: {
            input: string;
          };
        };
      }
    ).build.rolldownOptions.input,
    path.join(firstRoot, 'src/main.ts'),
  );
  assert.equal(
    (
      secondConfig as {
        build: {
          rolldownOptions: {
            input: string;
          };
        };
      }
    ).build.rolldownOptions.input,
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
});
