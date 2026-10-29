import type { Userscript } from '../config/types.ts';
import type { MonkeyContext } from '../utils/types.ts';
import type { AntifeatureType } from './tampermonkey.ts';
import { resolveGrants } from './grants.ts';

export type FieldKind =
  | 'single'
  | 'multiple'
  | 'localized'
  | 'flag'
  | 'resource'
  | 'antifeature'
  | 'json'
  | 'extra'
  | 'grants';
interface FieldDefinition {
  kind: FieldKind;
  sort: boolean;
}
const field = (kind: FieldKind, sort = false): FieldDefinition => ({
  kind,
  sort,
});

// Property order defines output order. Localized fields follow their base field;
// unrecognized $extra keys retain their insertion order at the end.
export const fields = {
  name: field('localized'),
  namespace: field('single'),
  version: field('single'),
  author: field('single'),
  description: field('localized'),
  license: field('single'),
  copyright: field('single'),
  icon: field('single'),
  iconURL: field('single'),
  icon64: field('single'),
  icon64URL: field('single'),
  defaulticon: field('single'),
  homepage: field('single'),
  homepageURL: field('single'),
  website: field('single'),
  source: field('single'),
  supportURL: field('single'),
  downloadURL: field('single'),
  updateURL: field('single'),
  include: field('multiple'),
  match: field('multiple'),
  exclude: field('multiple'),
  'exclude-match': field('multiple'),
  webRequest: field('json'),
  require: field('multiple'),
  resource: field('resource', true),
  sandbox: field('single'),
  tag: field('multiple'),
  connect: field('multiple'),
  grant: field('grants', true),
  'inject-into': field('single'),
  'run-at': field('single'),
  compatible: field('multiple'),
  incompatible: field('multiple'),
  antifeature: field('antifeature', true),
  contributionAmount: field('single'),
  contributionURL: field('single'),
  noframes: field('flag'),
  unwrap: field('flag'),
  installURL: field('single'),
  'run-in': field('multiple'),
  'top-level-await': field('flag'),
  $extra: field('extra'),
} satisfies Record<keyof Userscript | 'grant', FieldDefinition>;

export type MetadataLine = [string, ...string[]];
const positions = new Map(
  Object.keys(fields).map((key, index) => [key, index]),
);
function fieldPosition(key: string) {
  const separator = key.indexOf(':');
  const base = separator < 0 ? key : key.slice(0, separator);
  const definition = Object.hasOwn(fields, base)
    ? fields[base as keyof typeof fields]
    : undefined;
  if (
    !definition ||
    (separator >= 0 &&
      definition.kind !== 'localized' &&
      definition.kind !== 'antifeature')
  ) {
    return { index: positions.size, localized: 0, sort: false };
  }
  return {
    index: positions.get(base)!,
    localized: Number(separator >= 0),
    sort: definition.sort,
  };
}
function compareLines(a: MetadataLine, b: MetadataLine) {
  for (let index = 0; index < Math.min(a.length, b.length); index++) {
    if (a[index] < b[index]) return -1;
    if (a[index] > b[index]) return 1;
  }
  return a.length - b.length;
}
export function serializeMetadata(
  { config, state }: MonkeyContext,
  detected: ReadonlySet<string>,
  mode: 'serve' | 'build',
): MetadataLine[] {
  const { userscript, project } = config;
  const input: Record<string, unknown> = {
    version: project.version,
    author: project.author,
    supportURL: project.bugs,
    homepageURL: project.homepage,
    homepage: project.homepage,
    license: project.license,
    source: project.repository,
    ...userscript,
  };
  const lines: MetadataLine[] = [];
  for (const [key, { kind }] of Object.entries(fields)) {
    const value = input[key];
    const list = value == null ? [] : Array.isArray(value) ? value : [value];
    switch (kind) {
      case 'single':
        if (value != null) lines.push([key, String(value)]);
        break;
      case 'multiple':
        for (const item of list) lines.push([key, String(item)]);
        if (key === 'require')
          for (const url of state.collectRequireUrls) lines.push([key, url]);
        break;
      case 'json':
        for (const item of list) lines.push([key, JSON.stringify(item)]);
        break;
      case 'grants':
        for (const grant of resolveGrants(userscript.grant, detected, mode))
          lines.push([key, grant]);
        break;
      case 'localized': {
        const fallback = key === 'name' ? project.name : project.description;
        const translations =
          typeof value === 'string'
            ? { '': value }
            : {
                ...(fallback ? { '': fallback } : {}),
                ...((value as Record<string, string>) ?? {}),
              };
        const prefix =
          key === 'name' && mode === 'serve' ? config.dev.namePrefix : '';
        for (const [locale, text] of Object.entries(translations))
          lines.push([locale ? key + ':' + locale : key, prefix + text]);
        break;
      }
      case 'flag':
        if (value) lines.push([key]);
        break;
      case 'resource':
        for (const [name, url] of Object.entries({
          ...((value as Record<string, string>) ?? {}),
          ...state.collectResource,
        }))
          lines.push([key, name, url]);
        break;
      case 'antifeature':
        for (const item of list as AntifeatureType[])
          lines.push([
            item.tag ? key + ':' + item.tag : key,
            item.type,
            item.description ?? '',
          ]);
        break;
      case 'extra': {
        const entries = Array.isArray(value)
          ? value
          : Object.entries((value as object) ?? {});
        for (const [name, values] of entries)
          lines.push([name, ...(Array.isArray(values) ? values : [values])]);
        break;
      }
    }
  }
  return lines.sort((a, b) => {
    const first = fieldPosition(a[0]);
    const second = fieldPosition(b[0]);
    return (
      first.index - second.index ||
      first.localized - second.localized ||
      (first.sort ? compareLines(a, b) : 0)
    );
  });
}
