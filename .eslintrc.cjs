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
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-empty': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'prefer-const': 'warn',
  },
  globals: {},
});
