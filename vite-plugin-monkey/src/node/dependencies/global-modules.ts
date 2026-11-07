import type { Dependency, PackageContext } from '../config/types.ts';
import { getModuleRealInfo } from '../utils/pkg.ts';

export function getGlobalBindings(
  dependencies: Readonly<Record<string, Dependency>>,
) {
  return Object.fromEntries(
    Object.entries(dependencies).flatMap(([name, dependency]) =>
      dependency.kind === 'global' ? [[name, dependency.global]] : [],
    ),
  );
}

export async function collectRequireUrls(
  dependencies: Readonly<Record<string, Dependency>>,
  entry: string,
  used: ReadonlySet<string>,
) {
  const urls: string[] = [];
  for (const [moduleName, external] of Object.entries(dependencies)) {
    if (external.kind !== 'global' || !used.has(moduleName)) continue;
    let pkg: PackageContext | undefined;
    for (const url of external.urls)
      urls.push(
        typeof url === 'string'
          ? url
          : await url(
              (pkg ??= {
                ...(await getModuleRealInfo(moduleName, entry)),
                importName: moduleName,
              }),
            ),
      );
  }
  return urls;
}
