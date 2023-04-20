// @ts-check
/**
 * @type {import('lint-staged').Config}
 */
export default {
  '*': ['prettier --cache --write --ignore-unknown'],
  'packages/*/src/**/*.{js,ts,jsx,tsx}': ['eslint --cache --fix'],
};
