// @ts-check
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  globals: {},
});
