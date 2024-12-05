import { gmIdentifiers } from './gm_api';

export const preset = {
  from: 'vite-plugin-monkey/dist/client',
  imports: ['GM', ...gmIdentifiers, 'unsafeWindow', 'monkeyWindow'],
};
