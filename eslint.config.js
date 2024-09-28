// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

const includedFolders = ['src', 'features'];

const customizedESLint = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: true,
  jsx: true,
  commaDangle: 'never',
  braceStyle: '1tbs'
});

export default tseslint.config(
  {
    ignores: [
      '**/{www,dist,build}/**/*.*',
      'projects/*/!(src)/**/*.*',
      `!(${includedFolders.join(',')})/**/*.*`,
      '!*.{js,ts,mjs,cjs}'
    ]
  },
  {
    name: 'typescript',
    files: ['**/*.{ts,js,tsx,jsx,mjs,cjs,mts}'],
    extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      ...customizedESLint.rules
    }
  },
  {
    name: 'tests',
    ...playwright.configs['flat/recommended'],
    files: ['**/*.test.{ts,js}?(x)', 'e2e/src/**/*.ts'],
    rules: {
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-wait-for-selector': 'error'
    }
  }
);
