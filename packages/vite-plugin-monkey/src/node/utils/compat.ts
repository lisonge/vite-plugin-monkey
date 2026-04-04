/**
 * Minimal type interfaces for Rollup/Rolldown compatibility.
 *
 * Vite 7 uses Rollup, Vite 8 uses Rolldown. The `Rollup` namespace
 * re-exported by Vite doesn't always resolve correctly across both,
 * so we define only the subset of types this plugin actually needs.
 */

export interface OutputChunk {
  type: 'chunk';
  code: string;
  fileName: string;
  isEntry: boolean;
  facadeModuleId: string | null;
  dynamicImports: string[];
  modules: Record<string, { code: string | null }>;
}

export interface OutputAsset {
  type: 'asset';
  fileName: string;
  source: string | Uint8Array;
}

export type OutputBundle = Record<string, OutputChunk | OutputAsset>;

export interface RollupOutput {
  output: (OutputChunk | OutputAsset)[];
}

export interface PluginContext {
  parse(code: string, options?: any): any;
  resolve(
    source: string,
    importer?: string,
    options?: any,
  ): Promise<{ id: string } | null>;
  getModuleIds(): IterableIterator<string>;
  emitFile(emittedFile: any): string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TransformPluginContext extends PluginContext {}
