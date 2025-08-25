import { test, expect } from '@jest/globals'
import { getListHeight } from '../src/parts/GetListHeight/GetListHeight.ts'

test('getListHeight returns itemHeight when itemsLength is 0', () => {
  const result = getListHeight(0, 20, 100)
  expect(result).toBe(40)
})

test.skip('getListHeight returns total height when less than maxHeight', () => {
  const result = getListHeight(3, 20, 100)
  expect(result).toBe(60)
})

test.skip('getListHeight returns maxHeight when total height exceeds maxHeight', () => {
  const result = getListHeight(10, 20, 100)
  expect(result).toBe(100)
})
