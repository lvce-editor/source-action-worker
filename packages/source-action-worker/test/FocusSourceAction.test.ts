import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as FocusSourceAction from '../src/parts/FocusSourceAction/FocusSourceAction.ts'

const state = {
  ...createDefaultState(),
  focusedIndex: 0,
  items: [
    { isFocused: true, name: 'First' },
    { isFocused: false, name: 'Second' },
  ],
}

test('focuses source actions by keyboard direction', () => {
  expect(FocusSourceAction.focusNext(state).focusedIndex).toBe(1)
  expect(FocusSourceAction.focusPrevious({ ...state, focusedIndex: 1 }).focusedIndex).toBe(0)
  expect(FocusSourceAction.focusFirst({ ...state, focusedIndex: 1 }).focusedIndex).toBe(0)
  expect(FocusSourceAction.focusLast(state).focusedIndex).toBe(1)
})

test('keeps focus within the action list', () => {
  expect(FocusSourceAction.focusNext({ ...state, focusedIndex: 1 }).focusedIndex).toBe(1)
  expect(FocusSourceAction.focusPrevious(state).focusedIndex).toBe(0)
  expect(FocusSourceAction.focusPrevious({ ...state, focusedIndex: -1, items: [] }).focusedIndex).toBe(-1)
})
