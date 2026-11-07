import type { Rolldown } from 'vite';
import type { NormalizedConfig } from '../config/resolved.ts';
import type { BuildState } from './state.ts';
import { finalMonkeyOptionToComment } from '../metadata/index.ts';
import { collectGrant } from '../permissions/detect.ts';
import type { PreparedBuild } from './prepare.ts';
import { cssModuleId } from '../runtime/css.ts';

export function emitUserscript(
  plugin: Rolldown.PluginContext,
  config: NormalizedConfig,
  state: Readonly<BuildState>,
  bundle: Rolldown.OutputBundle,
  input: PreparedBuild,
  code: string,
) {
  for (const { key } of input.outputModules.values())
    if (input.firstEntryChunk !== bundle[key]) delete bundle[key];
  const grants = Array.isArray(config.userscript.grant)
    ? new Set<string>()
    : collectGrant(
        plugin,
        input.chunks,
        input.virtualModules.get(cssModuleId) ?? '',
      );
  if (
    config.assets.publicPath &&
    Object.keys(state.collectResource).some(
      (name) => bundle[name]?.type === 'asset',
    )
  )
    grants.add('GM_getResourceURL');
  const comment = finalMonkeyOptionToComment(
    { config, state },
    grants,
    'build',
  );
  const source = [comment, code].filter(Boolean).join('\n\n').trimEnd() + '\n';
  if (input.firstEntryChunk) {
    input.firstEntryChunk.fileName = config.output.script;
    input.firstEntryChunk.code = source;
  } else
    plugin.emitFile({
      type: 'asset',
      fileName: config.output.script,
      source,
    });
  if (config.output.meta)
    plugin.emitFile({
      type: 'asset',
      fileName: config.output.meta,
      source: comment,
    });
}
