import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { lookup } from 'mrmime';
import type { Plugin, ResolvedConfig, Rolldown } from 'vite';
import { createAssetMarker, rewriteAssetMarkers } from '../assets/markers.ts';
import { createOutputModules } from '../utils/outputModules.ts';

export interface WorkerBuildAsset {
  source: string | Uint8Array;
  mime: string;
}

export interface WorkerBuildGraph {
  /** System.register entry module, separate from the temporary Vite wrapper. */
  entry: string;
  wrapper: string;
  chunks: Record<string, string>;
  assets: Record<string, WorkerBuildAsset>;
}

const marker = createAssetMarker('WORKER_ASSET');
export const workerAssetMarker = marker.encode;

function rewriteWorkerAssets(
  pluginContext: Rolldown.PluginContext,
  code: string,
  assets: WorkerBuildGraph['assets'],
) {
  return rewriteAssetMarkers(pluginContext, code, {
    marker,
    resolve(name) {
      if (!Object.hasOwn(assets, name))
        throw new Error(`Missing Worker asset: ${name}`);
      return `globalThis.__MONKEY_WORKER_ASSET_URL__(${JSON.stringify(name)})`;
    },
    newExpression(node) {
      if (
        node.callee.type === 'Identifier' &&
        ['Worker', 'SharedWorker'].includes(node.callee.name)
      )
        throw new Error(
          'Nested Workers are not supported in userscript builds',
        );
    },
  });
}
const modulePrefix = '\0monkey-worker/';
const systemFilename = (filename: string) =>
  filename.replace(/(?:\.[^./]+)?$/, '.system.js');

/** Converts Vite's already transformed Worker graph without rebuilding sources. */
async function createGraph(
  pluginContext: Rolldown.PluginContext,
  rawBundle: Rolldown.OutputBundle,
  publicAssets: WorkerBuildGraph['assets'],
): Promise<WorkerBuildGraph> {
  const chunks = Object.values(rawBundle).filter(
    (item) => item.type === 'chunk',
  );
  const entries = chunks.filter((item) => item.isEntry);
  assert.equal(entries.length, 1, 'Expected exactly one Vite Worker entry');
  const assets: WorkerBuildGraph['assets'] = Object.fromEntries(
    Object.values(rawBundle)
      .filter((item) => item.type === 'asset')
      .map((item) => [
        item.fileName,
        {
          source: item.source,
          mime: lookup(item.fileName) ?? 'application/octet-stream',
        },
      ]),
  );
  for (const [name, asset] of Object.entries(publicAssets)) {
    if (
      assets[name] &&
      !Buffer.from(assets[name].source).equals(Buffer.from(asset.source))
    ) {
      throw new Error(`Conflicting Worker public asset: ${name}`);
    }
    assets[name] = asset;
  }
  const modules = new Map(
    chunks.map((chunk) => [
      chunk.fileName,
      rewriteWorkerAssets(pluginContext, chunk.code, assets),
    ]),
  );
  const outputModules = createOutputModules(modulePrefix, modules);
  const { rollup } = await import('rollup');
  const bundle = await rollup({
    input: modulePrefix + entries[0].fileName,
    onwarn(warning, warn) {
      if (warning.code !== 'CIRCULAR_DEPENDENCY') warn(warning);
    },
    plugins: [
      {
        name: 'monkey:worker-output',
        resolveId(source, importer) {
          const resolved = outputModules.resolveId(source, importer);
          if (resolved) return resolved;
          throw new Error(
            `Unresolved Worker module: ${source}${importer ? ` from ${importer.slice(modulePrefix.length)}` : ''}`,
          );
        },
        load(id) {
          return outputModules.get(id);
        },
      },
    ],
  });
  try {
    const { output } = await bundle.generate({
      format: 'system',
      preserveModules: true,
      entryFileNames(chunk) {
        assert.ok(chunk.facadeModuleId);
        assert.ok(chunk.facadeModuleId.startsWith(modulePrefix));
        return systemFilename(chunk.facadeModuleId.slice(modulePrefix.length));
      },
      sourcemap: false,
      // Vite has already applied the user's chosen minifier to the module code.
      compact: true,
    });
    return {
      entry: systemFilename(entries[0].fileName),
      wrapper: entries[0].fileName,
      chunks: Object.fromEntries(
        output
          .filter((item) => item.type === 'chunk')
          .map((item) => [item.fileName, item.code]),
      ),
      assets,
    };
  } finally {
    await bundle.close();
  }
}

/** Install through worker.plugins, after user Worker plugins. */
export function createWorkerBuildPlugin(
  onGraph: (graph: WorkerBuildGraph) => string | Promise<string>,
): Plugin {
  const publicFiles = new Set<string>();
  let publicDir = '';
  return {
    name: 'monkey:worker-build',
    apply: 'build',
    enforce: 'post',
    buildStart() {
      publicFiles.clear();
    },
    configResolved(config) {
      publicDir = config.publicDir;
      const renderBuiltUrl = config.experimental.renderBuiltUrl;
      // The worker config initially shares this object with the main config.
      const experimental: ResolvedConfig['experimental'] = {
        ...config.experimental,
        renderBuiltUrl(filename, context) {
          if (context.type === 'asset') return workerAssetMarker(filename);
          if (context.type === 'public') {
            // Public URLs include suffixes; emitted asset filenames do not.
            const suffixIndex = filename.search(/[?#]/);
            const file =
              suffixIndex < 0 ? filename : filename.slice(0, suffixIndex);
            publicFiles.add(file);
            return (
              workerAssetMarker(file) +
              (suffixIndex < 0 ? '' : filename.slice(suffixIndex))
            );
          }
          return renderBuiltUrl?.(filename, context);
        },
      };
      const build = {
        ...config.build,
        modulePreload: false as const,
        target: 'esnext',
      };
      Object.assign(config, {
        experimental,
        build,
        environments: {
          ...config.environments,
          client: {
            ...config.environments.client,
            build: {
              ...config.environments.client.build,
              modulePreload: false,
              target: 'esnext',
            },
          },
        },
      });
    },
    resolveId: {
      order: 'pre',
      handler(source) {
        if (source === '$' || source === 'vite-plugin-monkey/client') {
          throw new Error(
            'GM APIs are not available inside Workers; use postMessage to request application data from the userscript',
          );
        }
      },
    },
    load: {
      order: 'pre',
      handler(id) {
        if (/[?&](?:worker|sharedworker)(?:[&=]|$)/.test(id)) {
          throw new Error(
            'Nested Workers are not supported in userscript builds',
          );
        }
      },
    },
    generateBundle: {
      order: 'post',
      async handler(_, rawBundle) {
        const publicAssets: WorkerBuildGraph['assets'] = {};
        if (publicFiles.size) {
          assert.ok(publicDir, 'Worker public assets require publicDir');
          const root = await fs.realpath(publicDir);
          for (const filename of publicFiles) {
            const target = path.resolve(root, filename);
            const relative = path.relative(root, target);
            if (
              relative.startsWith('..' + path.sep) ||
              relative === '..' ||
              path.isAbsolute(relative)
            ) {
              throw new Error(
                `Worker public asset escapes publicDir: ${filename}`,
              );
            }
            const resolved = await fs.realpath(target);
            const realRelative = path.relative(root, resolved);
            if (
              realRelative.startsWith('..' + path.sep) ||
              realRelative === '..' ||
              path.isAbsolute(realRelative)
            ) {
              throw new Error(
                `Worker public asset escapes publicDir: ${filename}`,
              );
            }
            this.addWatchFile(target);
            this.addWatchFile(resolved);
            const source = await fs.readFile(resolved);
            publicAssets[filename] = {
              source,
              mime: lookup(filename) ?? 'application/octet-stream',
            };
          }
        }
        const graph = await createGraph(this, rawBundle, publicAssets);
        const entry = rawBundle[graph.wrapper];
        assert.ok(entry?.type === 'chunk');
        entry.code = await onGraph(graph);
        entry.imports = [];
        entry.dynamicImports = [];
        entry.map = null;
        for (const [filename, output] of Object.entries(rawBundle)) {
          if (output.type === 'chunk' && output !== entry)
            delete rawBundle[filename];
        }
        for (const [fileName, source] of Object.entries(graph.chunks)) {
          this.emitFile({ type: 'asset', fileName, source });
        }
        for (const [fileName, asset] of Object.entries(publicAssets)) {
          if (!rawBundle[fileName])
            this.emitFile({ type: 'asset', fileName, source: asset.source });
        }
      },
    },
  };
}
