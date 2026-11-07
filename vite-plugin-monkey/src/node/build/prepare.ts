import type { ResolvedConfig, Rolldown } from 'vite';
import type { MonkeyContext } from '../config/context.ts';
import {
  assetStringExpression,
  replaceAssetMarkers,
} from '../assets/resolve.ts';
import {
  getCssModuleCode,
  getCssRuntimeCode,
  cssModuleId,
} from '../runtime/css.ts';
import { finalizeWorkers } from '../workers/finalize.ts';
import { workerRuntimeId } from '../workers/graph.ts';
import { workerBootstrap, workerRuntimeModule } from '../workers/runtime.ts';
import { minifyScript } from './minify.ts';

const cssModuleEntryId = cssModuleId + '-entry';
const polyfillId = '\0vite/legacy-polyfills';

export async function prepareBuild(
  plugin: Rolldown.PluginContext,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
  config: Pick<ResolvedConfig, 'build' | 'root'>,
) {
  const hasWorkers = finalizeWorkers(plugin, context, bundle);
  for (const chunk of Object.values(bundle)) {
    if (chunk.type === 'chunk')
      chunk.code = replaceAssetMarkers(plugin, chunk.code, context, bundle);
  }
  const entryDependencies: string[] = [];
  const chunks: Rolldown.OutputChunk[] = [];
  const outputModules = new Map<
    string,
    { key: string; chunk: Rolldown.OutputChunk }
  >();
  for (const [key, chunk] of Object.entries(bundle)) {
    if (chunk.type !== 'chunk') continue;
    outputModules.set(chunk.fileName, { key, chunk });
    if (chunk.facadeModuleId !== polyfillId) chunks.push(chunk);
    if (chunk.isEntry && chunk.facadeModuleId === polyfillId)
      entryDependencies.push(chunk.fileName);
  }
  const firstEntryChunk = chunks.find((chunk) => chunk.isEntry);
  const cssCode = Object.entries(bundle)
    .flatMap(([name, item]) => {
      if (
        item.type !== 'asset' ||
        !name.endsWith('.css') ||
        (context.config.assets.publicPath &&
          context.state.collectResource[name])
      )
        return [];
      delete bundle[name];
      return [item.source.toString()];
    })
    .join('')
    .trim();
  if (cssCode) entryDependencies.push(cssModuleEntryId);
  const virtualModules = new Map<string, string>();
  const cssInjection = cssCode
    ? `_css(${assetStringExpression(' ' + cssCode + ' ', context, bundle)});`
    : '';
  if (cssCode || chunks.some((chunk) => chunk.code.includes(cssModuleId)))
    virtualModules.set(
      cssModuleId,
      getCssModuleCode(context.config.css.inject),
    );
  if (cssCode)
    virtualModules.set(
      cssModuleEntryId,
      `import { _css } from '${cssModuleId}'; ${cssInjection}`,
    );
  if (hasWorkers)
    virtualModules.set(
      workerRuntimeId,
      workerRuntimeModule(await minifyScript(workerBootstrap(), config)),
    );
  const cssPrelude = cssCode
    ? `(function () {\n${getCssRuntimeCode(context.config.css.inject)}\n${cssInjection}\n})();\n`
    : '';
  return {
    chunks,
    firstEntryChunk,
    entryDependencies,
    outputModules,
    virtualModules,
    cssPrelude,
  };
}
export type PreparedBuild = Awaited<ReturnType<typeof prepareBuild>>;
