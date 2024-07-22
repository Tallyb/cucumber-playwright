module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    jest: true,
    jasmine: true,
  },

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: true,
    ecmaFeatures: {
      modules: true,
    },
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
  },
  overrides: [
    {
      files: '*.ts',
      plugins: ['@typescript-eslint', '@stylistic'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:playwright/recommended',
      ],
      rules: {
        indent: [
          'error',
          2,
          {
            SwitchCase: 1,
          },
        ],
        'no-console': ['error'],
        'no-debugger': ['error'],
        'no-multiple-empty-lines': [
          'error',
          {
            max: 1,
            maxEOF: 1,
          },
        ],
        semi: ['error', 'always'],
        'import/order': [
          'error',
          {
            groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
          },
        ],
        'react/prop-types': 'off',
        'react/display-name': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'playwright/no-standalone-expect': 'off',
      },
    },
  ],
};
