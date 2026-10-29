import type { Userscript } from '../config/types.ts';
import { grantNames } from '../permissions/names.ts';

export function resolveGrants(
  grant: Userscript['grant'],
  detected: ReadonlySet<string>,
  mode: 'serve' | 'build',
): string[] {
  if (grant === 'none') {
    if (mode === 'build' && detected.size)
      throw new Error(
        '[monkey] userscript.grant none conflicts with required APIs: ' +
          [...detected].join(', '),
      );
    return ['none'];
  }
  return [...new Set(grant ?? (mode === 'serve' ? grantNames : detected))];
}
