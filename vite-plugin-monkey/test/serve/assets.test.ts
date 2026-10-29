import assert from 'node:assert/strict';
import { test } from '../support/fixture.ts';

test('dev asset rewriting preserves ordinary modules, other exports and source maps', async ({
  project,
}) => {
  await project.write({
    'main.js': '',
    'route.js': 'export default "/api"; export const version = 1;',
    'path.txt': '/api',
    'icon.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>',
  });
  const { origin } = await project.serve(
    {},
    {
      base: '/dev/',
      assetsInclude: ['**/*.txt'],
      build: { assetsInlineLimit: 0 },
      plugins: [
        {
          name: 'test-asset-exports',
          enforce: 'pre',
          transform(code, id) {
            if (id.endsWith('/icon.svg'))
              return 'export const version = 2;\n' + code;
          },
        },
      ],
    },
  );
  const route = await fetch(origin + '/dev/route.js');
  assert.equal(route.status, 200);
  const routeModule = await import(
    'data:text/javascript;base64,' +
      Buffer.from(await route.text()).toString('base64')
  );
  assert.equal(routeModule.default, '/api');
  assert.equal(routeModule.version, 1);

  const raw = await fetch(origin + '/dev/path.txt?raw&import');
  assert.equal(raw.status, 200);
  const rawModule = await import(
    'data:text/javascript;base64,' +
      Buffer.from(await raw.text()).toString('base64')
  );
  assert.equal(rawModule.default, '/api');

  for (const pathname of ['/dev/icon.svg?import', '/dev/route.js?url&import']) {
    const response = await fetch(origin + pathname);
    assert.equal(response.status, 200);
    const code = await response.text();
    assert.match(code, /export default new URL\(/);
    const module = await import(
      'data:text/javascript;base64,' +
        Buffer.from(
          code.replaceAll("import.meta['url']", JSON.stringify(response.url)),
        ).toString('base64')
    );
    assert.equal(module.default, origin + pathname.split('?')[0]);
    if (pathname.includes('icon.svg')) assert.equal(module.version, 2);
    const map = code.match(
      /sourceMappingURL=data:application\/json;base64,([^\s]+)/,
    );
    assert.ok(map, 'Asset rewriting retains a source map');
    assert.ok(JSON.parse(Buffer.from(map[1], 'base64').toString()).mappings);
  }
});
