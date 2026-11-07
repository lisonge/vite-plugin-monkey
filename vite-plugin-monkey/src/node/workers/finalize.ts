import type { Rolldown } from 'vite';
import { Visitor } from 'vite';
import MagicString from 'magic-string';
import type { MonkeyContext } from '../config/context.ts';
import { getSafeIdentifier } from '../utils/code.ts';
import { assetMarker, registerAssetResource } from '../assets/resolve.ts';
import { type WorkerBuildGraph } from './build.ts';
import { chunkModuleId } from '../modules/compile.ts';
import {
  decodeWorkerGraph,
  hasWorkerGraph,
  getWorkerUrl,
  workerRuntimeId,
  type WorkerDefinition,
} from './graph.ts';

/** Collect only referenced Worker graphs, including graphs cached by Vite watch. */
export function finalizeWorkers(
  pluginContext: Rolldown.PluginContext,
  context: MonkeyContext,
  bundle: Rolldown.OutputBundle,
): boolean {
  const graphs = new Map<string, WorkerBuildGraph>();
  const candidates = new Set<string>();
  const kept = new Set<string>();
  const definitions = new Map<string, WorkerDefinition>();
  let used = false;
  const remember = (graph: WorkerBuildGraph) => {
    graphs.set(graph.entry, graph);
    Object.keys(graph.chunks).forEach((name) => candidates.add(name));
    Object.keys(graph.assets).forEach((name) => candidates.add(name));
  };
  for (const item of Object.values(bundle)) {
    if (item.type !== 'asset' || typeof item.source !== 'string') continue;
    const graph = decodeWorkerGraph(item.source);
    if (graph) remember(graph);
  }
  const definition = (graph: WorkerBuildGraph, inline: boolean) => {
    const key = graph.entry + (inline ? ':inline' : ':resource');
    const existing = definitions.get(key);
    if (existing) return existing;
    remember(graph);
    const resource = (name: string) => {
      // Reuse asset registration, conflict checks and permission validation.
      registerAssetResource(name, context, bundle);
      kept.add(name);
      return name;
    };
    const value: WorkerDefinition = {
      registerName: graph.registerName,
      assetName: graph.assetName,
      entry: chunkModuleId(graph.entry),
      modules: Object.fromEntries(
        Object.entries(graph.chunks).map(([name, source]) => [
          chunkModuleId(name),
          {
            ...(context.config.assets.publicPath && !inline
              ? { resource: resource(name) }
              : { source: Buffer.from(source).toString('base64') }),
          },
        ]),
      ),
      assets: Object.fromEntries(
        Object.entries(graph.assets).map(([name, file]) => [
          name,
          {
            mime: file.mime,
            ...(context.config.assets.publicPath
              ? { resource: resource(name) }
              : { source: Buffer.from(file.source).toString('base64') }),
          },
        ]),
      ),
    };
    definitions.set(key, value);
    return value;
  };
  for (const chunk of Object.values(bundle)) {
    if (chunk.type !== 'chunk') continue;
    const code = chunk.code;
    if (!code.includes('__MONKEY_WORKER_')) continue;
    const result = new MagicString(code);
    const createName = getSafeIdentifier('__monkeyCreateWorker', code);
    let changed = false;
    new Visitor({
      NewExpression(node) {
        if (node.callee.type !== 'Identifier') return;
        if (node.callee.name === 'SharedWorker') {
          throw new Error(
            '[monkey] SharedWorker is not supported in userscript builds',
          );
        }
        if (node.callee.name !== 'Worker') return;
        const argument = node.arguments[0];
        if (!argument) return;
        const expression = code.slice(argument.start, argument.end);
        const inline = decodeWorkerGraph(expression);
        const filename = getWorkerUrl(expression);
        const graph = inline ?? (filename ? graphs.get(filename) : undefined);
        if (!graph) {
          if (filename)
            throw new Error(`[monkey] Missing Worker graph: ${filename}`);
          return;
        }
        const options = node.arguments[1];
        result.update(
          node.start,
          node.end,
          `${createName}(${JSON.stringify(definition(graph, !!inline))}, ${options ? code.slice(options.start, options.end) : 'undefined'})`,
        );
        changed = used = true;
      },
    }).visit(pluginContext.parse(code));
    if (changed) {
      result.prepend(
        `import { createWorker as ${createName} } from ${JSON.stringify(workerRuntimeId)};\n`,
      );
      chunk.code = result.toString();
    }
    if (getWorkerUrl(chunk.code) || hasWorkerGraph(chunk.code))
      throw new Error(
        '[monkey] Worker URL escaped its constructor; use ?worker or new Worker(new URL(...))',
      );
  }
  for (const name of candidates) {
    const item = bundle[name];
    if (item?.type !== 'asset') continue;
    if (kept.has(name)) {
      const source = graphs.get(name)?.chunks[name];
      if (source !== undefined) item.source = source;
      continue;
    }
    // Main-thread imports may also reference the same resource asset.
    if (
      Object.values(bundle).some(
        (chunk) =>
          chunk.type === 'chunk' && chunk.code.includes(assetMarker(name)),
      )
    )
      continue;
    delete bundle[name];
  }
  return used;
}
