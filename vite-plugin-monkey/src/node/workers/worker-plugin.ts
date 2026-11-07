import type { Plugin } from 'vite';
import { createWorkerBuildPlugin } from './build.ts';
import {
  encodeWorkerGraph,
  getWorkerGraphMarker,
  workerUrlMarker,
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
                wrappers.add(graph.entry);
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
