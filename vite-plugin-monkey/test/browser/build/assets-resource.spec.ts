import monkey from '../../../src/node/index.ts';
import { expect, test } from '../../support/browser.ts';
import { buildOutput, userScript } from '../../support/project.ts';

for (const resourceFormat of ['blob', 'data'] as const) {
  test(`loads exact resource names with nested and URL-encoded paths (${resourceFormat})`, async ({
    project,
    page,
    userscript,
    diagnostics,
  }) => {
    const sources = {
      'root.svg':
        '<svg xmlns="http://www.w3.org/2000/svg"><text>root</text></svg>',
      'nested.svg':
        '<svg xmlns="http://www.w3.org/2000/svg"><text>nested</text></svg>',
      'encoded.svg':
        '<svg xmlns="http://www.w3.org/2000/svg"><text>encoded</text></svg>',
    };
    const resourceNames: Record<string, string> = {
      'root.svg': 'a.svg',
      'nested.svg': 'media/a.svg',
      'encoded.svg': '图片#图标.svg',
    };
    const publicPath = 'https://releases.invalid/assets/v1/';
    await project.write({
      ...sources,
      'main.js': `
        import root from './root.svg?url';
        import nested from './nested.svg?url';
        const encoded = new URL('./encoded.svg#icon', import.meta.url).href;
        globalThis.assetHash = new URL(encoded).hash;
        globalThis.assetContents = Promise.all(
          [root, nested, encoded].map(async url => (await fetch(url)).text()),
        );
      `,
    });
    const result = await project.build({
      plugins: [
        monkey({
          entry: 'main.js',
          assets: { publicPath },
        }),
      ],
      build: {
        rolldownOptions: {
          output: {
            assetFileNames: (asset) => resourceNames[asset.names[0]],
          },
        },
      },
    });
    const output = buildOutput(result);
    const script = userScript(result);
    const resources = Object.fromEntries(
      [...script.code.matchAll(/^\/\/ @resource\s+(\S+)\s+(\S+)/gm)].map(
        ([, name, url]) => [name, url],
      ),
    );
    expect(resources).toEqual({
      'a.svg': publicPath + 'a.svg',
      'media/a.svg': publicPath + 'media/a.svg',
      '图片#图标.svg': publicPath + encodeURIComponent('图片#图标.svg'),
    });
    // Put a.svg before media/a.svg to expose ambiguous suffix lookups.
    const orderedOutput = [...output].sort((a, b) =>
      a.fileName.localeCompare(b.fileName),
    );
    const manager = await userscript.runBuilt(script, orderedOutput, {
      resourceFormat,
    });
    const contents = await page.evaluate(
      () =>
        (window as typeof window & { assetContents: Promise<string[]> })
          .assetContents,
    );
    expect(contents).toEqual(Object.values(sources));
    expect(
      await page.evaluate(
        () => (window as typeof window & { assetHash: string }).assetHash,
      ),
    ).toBe('#icon');
    expect(await manager.calls()).toEqual(Object.values(resourceNames));
    expect(diagnostics.errors).toEqual([]);
    expect(
      diagnostics.requests.filter((url) => url.startsWith(publicPath)),
    ).toEqual([]);
  });
}
