import type { UserConfig } from '@commitlint/types';

export default <UserConfig>{
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
  },
};
