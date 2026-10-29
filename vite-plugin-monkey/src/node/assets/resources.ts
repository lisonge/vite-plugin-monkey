/** Register into the internal null-prototype dictionary, checking declared URL conflicts. */
export function registerResource(
  collected: Record<string, string>,
  declared: Readonly<Record<string, string>> | undefined,
  name: string,
  url: string,
): void {
  if (
    [
      collected[name],
      declared && Object.hasOwn(declared, name) ? declared[name] : undefined,
    ].some((previous) => previous !== undefined && previous !== url)
  )
    throw new Error('[monkey] Conflicting resource name: ' + name);
  collected[name] = url;
}
