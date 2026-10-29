import type { Plugin } from 'vite';
import type { Userscript, Dependency, CssOptions } from '../config/types.ts';
export type * from '../config/types.ts';
export type IArray<T = unknown> = T | T[];
export type LocaleType<T = unknown> = Record<string, T>;
export interface NormalizedOutput {
  script: string;
  meta?: string;
}
export interface NormalizedDev {
  namePrefix: string;
}
export interface NormalizedConfig {
  readonly entry: string;
  readonly userscript: Userscript;
  readonly project: Awaited<
    ReturnType<typeof import('./pkg.ts').getProjectPkg>
  >;
  readonly dev: NormalizedDev;
  readonly output: NormalizedOutput;
  readonly assets: { publicPath?: string };
  readonly dependencies: Readonly<Record<string, Dependency>>;
  readonly css: Required<CssOptions>;
}
export interface BuildState {
  collectRequireUrls: string[];
  collectResource: Record<string, string>;
  globalsPkg2VarName: Record<string, string>;
}
export interface MonkeyContext {
  config: NormalizedConfig;
  state: BuildState;
}
export interface PluginFactory {
  (getContext: (root?: string) => Promise<MonkeyContext>): Plugin;
}
