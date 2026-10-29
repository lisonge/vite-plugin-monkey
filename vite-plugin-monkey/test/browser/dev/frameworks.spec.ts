import fs from 'node:fs/promises';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import solid from 'vite-plugin-solid';
import { test, expect } from '../../support/browser.ts';

const frameworks = [
  {
    name: 'react',
    entry: 'src/main.tsx',
    component: 'src/App.tsx',
    dependencies: ['react', 'react-dom'],
    plugin: react,
  },
  {
    name: 'vue',
    entry: 'src/main.ts',
    component: 'src/App.vue',
    dependencies: ['vue'],
    plugin: vue,
  },
  {
    name: 'solid',
    entry: 'src/main.tsx',
    component: 'src/App.tsx',
    dependencies: ['solid-js'],
    plugin: solid,
  },
];

for (const { name, entry, component, dependencies, plugin } of frameworks) {
  test(`${name} initializes on an external page and preserves state through HMR`, async ({
    project,
    page,
    diagnostics,
    userscript,
  }) => {
    await project.copy(`frameworks/${name}`);
    await project.linkDependencies(dependencies);
    const { origin } = await project.serve(
      { entry },
      {
        plugins: [plugin()],
        optimizeDeps: { noDiscovery: false, entries: [entry] },
        server: { watch: {}, hmr: true },
      },
    );
    const response = await fetch(
      `${origin}/__vite-plugin-monkey.install.user.js`,
    );
    expect(response.ok).toBe(true);
    await userscript.installDevelopment(await response.text());
    await expect(page.getByRole('heading')).toHaveText('Before update');
    const counter = page.getByRole('button');
    await expect(counter).toHaveText('Count: 0');
    await counter.click();
    await expect(counter).toHaveText('Count: 1');

    const source = await fs.readFile(
      path.join(project.root, component),
      'utf8',
    );
    await project.write({
      [component]: source.replace('Before update', 'After update'),
    });
    await expect(page.getByRole('heading')).toHaveText('After update');
    await expect(counter).toHaveText('Count: 1');
    await counter.click();
    await expect(counter).toHaveText('Count: 2');
    expect(diagnostics.errors).toEqual([]);
  });
}
