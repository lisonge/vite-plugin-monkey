import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    pool: 'forks',
    isolate: true,
    maxWorkers: 4,
    testTimeout: 15_000,
    hookTimeout: 15_000,
    watchTriggerPatterns: [
      {
        pattern: /vite-plugin-monkey\/test\/fixtures\/async\//,
        testsToRun: () => ['vite-plugin-monkey/test/build/runtime.test.ts'],
      },
    ],
    projects: [
      ...(['unit', 'build', 'serve'] as const).map((name) => ({
        test: {
          name,
          include: [`vite-plugin-monkey/test/${name}/**/*.test.ts`],
          env: { NODE_ENV: name === 'build' ? 'production' : 'development' },
        },
      })),
      {
        test: {
          name: 'website',
          include: ['website/.vitepress/**/*.test.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['vite-plugin-monkey/src/node/**/*.ts'],
      exclude: [
        '**/types.ts',
        '**/metadata/{tampermonkey,violentmonkey,greasemonkey}.ts',
      ],
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
