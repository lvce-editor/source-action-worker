import { expect, test } from '@jest/globals'
import { getSourceActionWidth } from '../src/parts/GetSourceActionWidth/GetSourceActionWidth.ts'

test('getSourceActionWidth keeps the default width for short names', () => {
  expect(getSourceActionWidth([{ isFocused: false, name: 'Organize Imports' }])).toBe(400)
})

test('getSourceActionWidth fits the longest source action name', () => {
  const sourceActions = [
    { isFocused: false, name: 'Organize Imports' },
    { isFocused: false, name: "Remove import from 'three/examples/jsm/loaders/FontLoader.js'" },
  ]
  expect(getSourceActionWidth(sourceActions)).toBe(536)
})
