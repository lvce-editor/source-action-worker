import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    ignores: ['**/server/**', '**/e2e/**', '**/memory/**'],
  },
  {
    rules: {
      'no-constant-condition': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'jest/expect-expect': 'off',
      'jest/no-disabled-tests': 'off',
      'sonarjs/assertions-in-tests': 'off',
    },
  },
]
