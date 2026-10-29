import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { test } from '../support/fixture.ts';
import { nextBuild } from '../support/project.ts';
import monkey from '../../src/node/index.ts';
test(
  'watch rebuild drops removed resource declarations',
  { timeout: 15000 },
  async ({ project }) => {
    const { root } = project;
    await fs.writeFile(path.join(root, 'a.png'), 'image');
    const entry = path.join(root, 'main.js');
    await fs.writeFile(entry, `import a from './a.png'; console.log(a);`);
    const watcher = await project.build({
      build: { watch: {}, write: true },
      plugins: [
        monkey({
          entry: 'main.js',
          userscript: { name: 'Watch fixture' },
          output: { script: 'test.user.js' },
          assets: {
            publicPath: 'https://example.com/',
          },
        }),
      ],
    });

    await nextBuild(watcher);
    assert.match(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@resource/,
    );
    const rebuilt = nextBuild(watcher);
    await fs.writeFile(entry, `console.log('no assets');`);
    await rebuilt;
    assert.match(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@name\s+Watch fixture/,
    );
    assert.doesNotMatch(
      await fs.readFile(path.join(root, 'dist/test.user.js'), 'utf8'),
      /@resource|GM_getResourceURL/,
    );
  },
);
