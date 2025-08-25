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
    },
  },
]
