import type { MonkeyUserScript } from '../metadata/index.ts';
import type { GrantType } from '../permissions/names.ts';
export type Grant = GrantType;
export type Awaitable<T> = T | Promise<T>;
export type Userscript = MonkeyUserScript;
export interface DevOptions {
  namePrefix?: string;
}
export interface OutputOptions {
  script?: string;
  meta?: boolean | string;
}
export interface AssetsOptions {
  publicPath?: string;
}
export interface CssOptions {
  inject?: 'auto' | 'gm' | 'dom' | false;
}
export interface PackageContext {
  name: string;
  version: string;
  importName: string;
  resolveName: string;
}
export type DependencyUrlResolver = (
  context: PackageContext,
) => Awaitable<string>;
export type DependencyUrl = string | DependencyUrlResolver;
export interface GlobalDependency {
  kind: 'global';
  global: string;
  urls: DependencyUrl[];
}
export interface ModuleResourceLoader {
  entry: string;
}
export type ResourceLoader =
  | 'css'
  | 'json'
  | 'raw'
  | 'url'
  | ModuleResourceLoader;
export interface ResourceDependency {
  kind: 'resource';
  name?: string;
  url: DependencyUrl;
  loader?: ResourceLoader;
}
export type Dependency = GlobalDependency | ResourceDependency;
export interface ResourceLoaderContext extends PackageContext {
  resourceName: string;
  resourceUrl: string;
  dynamic: boolean;
}
export type ResourceLoaderFunction = (
  context: ResourceLoaderContext,
) => unknown;
export interface MonkeyOptions {
  entry: string;
  userscript?: Userscript;
  dev?: DevOptions;
  output?: OutputOptions;
  assets?: AssetsOptions;
  dependencies?: Record<string, Dependency>;
  css?: CssOptions;
}
