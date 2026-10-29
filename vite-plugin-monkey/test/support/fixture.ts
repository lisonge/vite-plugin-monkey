import { test as base } from 'vitest';
import { createDisposables, createTestProject } from './project.ts';
import type { TestProject } from './project.ts';

export const test = base.extend<{ project: TestProject }>({
  // Vitest discovers fixture dependencies from this destructuring pattern.
  // eslint-disable-next-line no-empty-pattern
  project: async ({}, use) => {
    const disposables = createDisposables();
    try {
      await use(await createTestProject(disposables));
    } finally {
      await disposables.close();
    }
  },
});
