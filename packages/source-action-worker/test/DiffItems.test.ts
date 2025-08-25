import { expect, test } from '@jest/globals'
import type { SourceActionState } from '../src/parts/SourceActionState/SourceActionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { isEqual } from '../src/parts/DiffItems/DiffItems.ts'

test('isEqual - same items and focusedIndex', () => {
  const oldState: SourceActionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any[],
    focusedIndex: 1,
  }
  const newState: SourceActionState = {
    ...oldState,
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(true)
})

test('isEqual - different items', () => {
  const oldState: SourceActionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 1,
  }
  const newState: SourceActionState = {
    ...createDefaultState(),
    items: ['item1', 'item3'] as any,
    focusedIndex: 1,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})

test('isEqual - different focusedIndex', () => {
  const oldState: SourceActionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 1,
  }
  const newState: SourceActionState = {
    ...createDefaultState(),
    items: ['item1', 'item2'] as any,
    focusedIndex: 0,
  }

  const result = isEqual(oldState, newState)

  expect(result).toBe(false)
})
