import type { ResolvedConfig } from 'vite';
import type { PreparedBuild } from './prepare.ts';
import { renderRegistry } from './registry.ts';
import { wrapChunk } from '../modules/wrap.ts';
import { minifyScript } from './minify.ts';

export async function renderScript(
  input: PreparedBuild,
  globals: Readonly<Record<string, string>>,
  config: Pick<ResolvedConfig, 'build' | 'root'>,
): Promise<string> {
  const only =
    input.outputModules.size === 1
      ? input.outputModules.values().next().value
      : undefined;
  const wrapped =
    only && (await wrapChunk(only.chunk.code, input.cssPrelude, globals));
  const code =
    wrapped === undefined ? await renderRegistry(input, globals) : wrapped;
  return minifyScript(code, config);
}
