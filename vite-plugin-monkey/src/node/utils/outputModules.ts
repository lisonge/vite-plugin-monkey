import path from 'node:path';

/** Resolves imports between emitted chunks without consulting the filesystem. */
export function createOutputModules<T>(
  prefix: string,
  modules: ReadonlyMap<string, T>,
) {
  const fileName = (id: string): string | undefined => {
    if (!id.startsWith(prefix)) return;
    const name = id.slice(prefix.length);
    if (modules.has(name)) return name;
  };
  return {
    resolveId(source: string, importer?: string): string | undefined {
      if (source.startsWith(prefix))
        return fileName(source) === undefined ? undefined : source;
      const name = source.startsWith('.')
        ? path.posix.normalize(
            path.posix.join(
              importer?.startsWith(prefix)
                ? path.posix.dirname(importer.slice(prefix.length))
                : '.',
              source,
            ),
          )
        : source;
      if (modules.has(name)) return prefix + name;
    },
    get(id: string): T | undefined {
      const name = fileName(id);
      return name === undefined ? undefined : modules.get(name);
    },
  };
}
