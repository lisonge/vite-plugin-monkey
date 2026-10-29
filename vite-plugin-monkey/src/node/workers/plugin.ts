import type { Plugin, Rolldown } from 'vite';
import { Visitor } from 'vite';
import MagicString from 'magic-string';
import type { MonkeyContext } from '../utils/types.ts';
import { getSafeIdentifier } from '../utils/others.ts';
import { assetMarker, registerAssetResource } from '../assets/resolve.ts';
import { createWorkerBuildPlugin, type WorkerBuildGraph } from './build.ts';
import {
  encodeWorkerGraph,
  decodeWorkerGraph,
  getWorkerGraphMarker,
  hasWorkerGraph,
  getWorkerUrl,
  workerUrlMarker,
  workerRuntimeId,
  type WorkerDefinition,
} from './graph.ts';

export function workerFactory(): Plugin {
  const wrappers = new Set<string>();
  return {
    name: 'monkey:worker',
    apply: 'build',
    enforce: 'post',
    config: {
      order: 'post',
      handler(config) {
        wrappers.clear();
        const plugins = config.worker?.plugins;
        const renderBuiltUrl = config.experimental?.renderBuiltUrl;
        return {
          worker: {
            format: 'es',
            plugins: () => [
              ...(plugins?.() ?? []),
              createWorkerBuildPlugin((graph) => {
                wrappers.add(graph.wrapper);
                return encodeWorkerGraph(graph);
              }),
            ],
          },
          experimental: {
            renderBuiltUrl(filename, context) {
              if (context.type === 'asset' && wrappers.has(filename))
                return workerUrlMarker(filename);
              return renderBuiltUrl?.(filename, context);
            },
          },
        };
      },
    },
    load: {
      order: 'pre',
      handler(id) {
        const query = new URLSearchParams(id.split('?')[1]);
        if (query.has('sharedworker'))
          throw new Error(
            '[monkey] SharedWorker is not supported in userscript builds',
          );
        if (query.has('worker') && query.has('url'))
          throw new Error(
            '[monkey] ?worker&url cannot initialize the resource bridge; import ?worker instead',
          );
      },
    },
    transform: {
      order: 'post',
      handler(code, id) {
        const query = new URLSearchParams(id.split('?')[1]);
        if (!query.has('worker') || !query.has('inline')) return;
        const graph = getWorkerGraphMarker(code);
        if (!graph) throw new Error('[monkey] Missing inline Worker graph');
        // Replace Vite's module-Worker inline wrapper, including import.meta.url.
        return {
          code: `export default function WorkerWrapper(options) { return new Worker(${JSON.stringify(graph)}, options); }`,
          map: { mappings: '' },
        };
      },
    },
  };
}

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
    graphs.set(graph.wrapper, graph);
    candidates.add(graph.wrapper);
    Object.keys(graph.chunks).forEach((name) => candidates.add(name));
    Object.keys(graph.assets).forEach((name) => candidates.add(name));
  };
  for (const item of Object.values(bundle)) {
    if (item.type !== 'asset' || typeof item.source !== 'string') continue;
    const graph = decodeWorkerGraph(item.source);
    if (graph) remember(graph);
  }
  const definition = (graph: WorkerBuildGraph, inline: boolean) => {
    const key = graph.wrapper + (inline ? ':inline' : ':resource');
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
      entry: graph.entry,
      modules: Object.fromEntries(
        Object.entries(graph.chunks).map(([name, source]) => [
          name,
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
    // Main-thread imports may also reference the same resource asset.
    if (kept.has(name)) continue;
    const item = bundle[name];
    if (item?.type !== 'asset') continue;
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
