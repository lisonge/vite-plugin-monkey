import assert from 'node:assert/strict';
import path from 'node:path';
import { bundleModules } from '../modules/bundle.ts';
import type { PreparedBuild } from './prepare.ts';

export async function renderRegistry(
  input: PreparedBuild,
  globals: Readonly<Record<string, string>>,
): Promise<string> {
  const sources = new Map(
    Array.from(input.outputModules, ([name, { chunk }]) => [name, chunk.code]),
  );
  for (const [id, code] of input.virtualModules) sources.set(id, code);
  const entry = input.firstEntryChunk;
  assert.ok(entry, 'Expected a userscript entry chunk');
  const imports = input.entryDependencies.map((id) => {
    const specifier = input.virtualModules.has(id)
      ? id
      : './' + path.posix.relative(path.posix.dirname(entry.fileName), id);
    return `import ${JSON.stringify(specifier)};`;
  });
  sources.set(entry.fileName, [...imports, entry.code].join('\n'));
  return bundleModules(sources, entry.fileName, globals);
}
