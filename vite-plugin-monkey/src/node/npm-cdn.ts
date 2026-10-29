import type { DependencyUrlResolver } from './config/types.ts';

export interface NpmCdnOptions {
  provider?: 'jsdelivr' | 'unpkg' | 'jsdelivr-fastly';
  path?: string;
}

const providers = {
  jsdelivr: 'https://cdn.jsdelivr.net/npm/',
  unpkg: 'https://unpkg.com/',
  'jsdelivr-fastly': 'https://fastly.jsdelivr.net/npm/',
};

export function npmCdn({
  provider = 'jsdelivr',
  path,
}: NpmCdnOptions = {}): DependencyUrlResolver {
  return ({ name, version, resolveName }) =>
    `${providers[provider]}${name}@${version}/${path ?? resolveName}`;
}
