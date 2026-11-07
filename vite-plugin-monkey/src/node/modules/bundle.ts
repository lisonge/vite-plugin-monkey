import { compileModules, chunkModuleId } from './compile.ts';
import { createModuleRegistry } from './runtime.ts';
import { namespaceExpression, namespaceFactory } from './globals.ts';
import { getSafeIdentifier } from '../utils/code.ts';
import { identifierSource, moduleIdentifiers } from './names.ts';

export async function bundleModules(
  sources: ReadonlyMap<string, string>,
  entry: string,
  globals: Readonly<Record<string, string>>,
) {
  const reserved = [...sources.values(), ...Object.values(globals)]
    .map(identifierSource)
    .join('\n');
  const registry = getSafeIdentifier(moduleIdentifiers.registry, reserved);
  const register = getSafeIdentifier(moduleIdentifiers.register, reserved, [
    registry,
  ]);
  const compiled = await compileModules(sources, {
    register,
    strict: false,
    externals: new Set(Object.keys(globals)),
  });
  const namespace =
    Object.keys(globals).length > 1
      ? getSafeIdentifier(moduleIdentifiers.namespace, reserved, [
          registry,
          register,
        ])
      : undefined;
  return `(function () {
"use strict";
const ${registry} = (${createModuleRegistry.toString()})();
const ${register} = ${registry}.register;
${namespace ? `const ${namespace} = ${namespaceFactory};` : ''}
${Object.entries(globals)
  .map(
    ([id, value]) =>
      `${registry}.set(${JSON.stringify(id)}, ${namespaceExpression(value, namespace)});`,
  )
  .join('\n')}
${Object.values(compiled).join('\n')}
${registry}.start(${JSON.stringify(chunkModuleId(entry))});
})();`;
}
