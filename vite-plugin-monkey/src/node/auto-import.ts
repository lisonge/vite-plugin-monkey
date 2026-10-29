import { gmIdentifiers } from './permissions/names.ts';
import {
  supportsManagerExport,
  type ManagerProfile,
} from '../shared/manager-capabilities.ts';

export interface GmAutoImportOptions {
  manager?: ManagerProfile;
}

export interface GmAutoImportPreset {
  from: '$';
  imports: string[];
}

export function gmAutoImportPreset({
  manager = 'common',
}: GmAutoImportOptions = {}): GmAutoImportPreset {
  return {
    from: '$',
    imports: [
      'GM',
      'unsafeWindow',
      'monkeyWindow',
      ...gmIdentifiers.filter((name) => supportsManagerExport(manager, name)),
    ],
  };
}
