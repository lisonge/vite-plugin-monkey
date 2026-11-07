import path from 'node:path';
import { analyzeModule, transformModule } from './transform.ts';

/** Registry IDs are output-root relative; virtual modules retain their scheme. */
export const chunkModuleId = (name: string) =>
  name.startsWith('virtual:') ? name : './' + path.posix.normalize(name);

interface CompileOptions {
  register?: string;
  externals?: ReadonlySet<string>;
  /** Standalone Worker scripts need a directive; bundled factories inherit it. */
  strict?: boolean;
}

/** Adapt Vite's emitted chunks to a closed registry with separate linking/execution. */
export async function compileModules(
  modules: ReadonlyMap<string, string>,
  {
    register = 'globalThis.__monkeyRegister',
    externals = new Set(),
    strict = true,
  }: CompileOptions = {},
) {
  const output: Record<string, string> = {};
  for (const [filename, code] of modules) {
    const transformed = await transformModule(
      analyzeModule(code, filename),
      filename,
    );
    const result = transformed.code;
    const dependencies: string[] = [];
    const prelude: string[] = [];
    const resolve = (specifier: string) => {
      if (externals.has(specifier)) return specifier;
      if (modules.has(specifier)) return chunkModuleId(specifier);
      const target = path.posix.normalize(
        path.posix.join(path.posix.dirname(filename), specifier),
      );
      if (!specifier.startsWith('.') || !modules.has(target))
        throw new Error(`Unresolved module: ${specifier} from ${filename}`);
      return chunkModuleId(target);
    };
    for (const {
      specifier,
      argument,
      statement,
      bound,
    } of transformed.imports) {
      const target = resolve(specifier);
      let index = dependencies.indexOf(target);
      if (index < 0) index = dependencies.push(target) - 1;
      if (bound) result.update(argument.start, argument.end, String(index));
      else result.remove(statement.start, statement.end);
    }
    for (const { specifier, argument } of transformed.dynamicImports)
      result.update(
        argument.start,
        argument.end,
        JSON.stringify(resolve(specifier)),
      );
    for (const statement of transformed.linking) {
      prelude.push(result.slice(statement.start, statement.end));
      result.remove(statement.start, statement.end);
    }
    const name = filename;
    output[name] =
      `${strict ? '"use strict";\n' : ''}${register}(${JSON.stringify(chunkModuleId(name))}, ${JSON.stringify(dependencies)}, ${transformed.asynchronous ? 'async ' : ''}function*(${transformed.parameters.length ? `{ ${transformed.parameters.join(', ')} }` : ''}) {
${prelude.join('\n')}
yield;
${result.toString()}
});`;
  }
  return output;
}
