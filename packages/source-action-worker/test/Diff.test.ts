import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { diff } from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

test('returns no render changes for equal state', () => {
  const state = createDefaultState()

  expect(diff(state, state)).toEqual([])
})

test('returns render changes for updated content and bounds', () => {
  const state = createDefaultState()
  const updatedState = {
    ...state,
    height: 100,
    items: [{ isFocused: false, name: 'Extract function' }],
    version: 1,
    width: 200,
  }

  expect(diff(state, updatedState)).toEqual([
    DiffType.RenderEventListeners,
    DiffType.RenderItems,
    DiffType.RenderBounds,
    DiffType.RenderUid,
    DiffType.RenderFocusContext,
  ])
})
