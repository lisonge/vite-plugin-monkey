/** Shared default/namespace interop; named-only direct wrappers need no adapter. */
export const namespaceFactory = `(value) => {
  const namespace = {};
  for (const key of Reflect.ownKeys(Object(value))) {
    if (key !== 'default' && Object.prototype.propertyIsEnumerable.call(value, key))
      Object.defineProperty(namespace, key, { enumerable: true, get: () => value[key] });
  }
  Object.defineProperty(namespace, 'default', { enumerable: true, get: () => value != null && 'default' in Object(value) ? value.default : value });
  return namespace;
}`;

export const namespaceExpression = (
  expression: string,
  factory = namespaceFactory,
) => `(${factory})(${expression})`;
