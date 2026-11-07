import { namespaceExpression, namespaceFactory } from './globals.ts';
import { identifierSource, moduleIdentifiers } from './names.ts';
import { getSafeIdentifier } from '../utils/code.ts';
import { analyzeModule, transformModule } from './transform.ts';

/** Wrap one chunk, optionally binding static imports to known globals. */
export async function wrapChunk(
  code: string,
  prelude = '',
  globals: Readonly<Record<string, string>> = {},
): Promise<string | undefined> {
  const analysis = analyzeModule(code);
  if (
    analysis.needsRegistry ||
    [...analysis.imports.keys()].some((id) => !Object.hasOwn(globals, id))
  )
    return;
  const parameters: string[] = [];
  const values: string[] = [];
  let namespace: string | undefined;
  if (analysis.imports.size) {
    const transformed = await transformModule(analysis);
    const namespaces = new Set(
      transformed.imports
        .filter(
          ({ bound, specifier }) =>
            bound && analysis.imports.get(specifier)!.namespace,
        )
        .map(({ specifier }) => specifier),
    );
    if (namespaces.size > 1)
      namespace = getSafeIdentifier(
        moduleIdentifiers.namespace,
        [code, ...Object.values(globals)].map(identifierSource).join('\n'),
      );
    const bindings = new Map<string, string>();
    for (const { name, specifier, statement, bound } of transformed.imports) {
      if (!bound) {
        transformed.code.remove(statement.start, statement.end);
        continue;
      }
      const binding = analysis.imports.get(specifier)!;
      const parameter = bindings.get(specifier);
      if (parameter) {
        transformed.code.update(
          statement.start,
          statement.end,
          `const ${name} = ${parameter};`,
        );
      } else {
        transformed.code.remove(statement.start, statement.end);
        bindings.set(specifier, name);
        parameters.push(name);
        values.push(
          binding.namespace
            ? namespaceExpression(globals[specifier], namespace)
            : `(${globals[specifier]})`,
        );
      }
    }
    code = transformed.code.toString();
  }
  const wrapped = `(${analysis.asynchronous ? 'async ' : ''}function (${parameters.join(',')}) {\n'use strict';\n${prelude}${code}\n})(${values.join(',')});`;
  return namespace
    ? `(function (${namespace}) {\nreturn ${wrapped}\n})(${namespaceFactory});`
    : wrapped;
}
