import type { Userscript, Dependency, CssOptions } from './types.ts';
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
    ReturnType<typeof import('../utils/pkg.ts').getProjectPkg>
  >;
  readonly dev: NormalizedDev;
  readonly output: NormalizedOutput;
  readonly assets: { publicPath?: string };
  readonly dependencies: Readonly<Record<string, Dependency>>;
  readonly css: Required<CssOptions>;
}
