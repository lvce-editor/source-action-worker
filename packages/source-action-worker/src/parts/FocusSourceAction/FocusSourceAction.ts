import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

const withFocusedIndex = (state: SourceActionState, focusedIndex: number): SourceActionState => ({
  ...state,
  focused: true,
  focusedIndex,
})

export const focusFirst = (state: SourceActionState): SourceActionState => {
  const { items } = state
  return withFocusedIndex(state, items.length === 0 ? -1 : 0)
}

export const focusLast = (state: SourceActionState): SourceActionState => {
  const { items } = state
  return withFocusedIndex(state, items.length - 1)
}

export const focusNext = (state: SourceActionState): SourceActionState => {
  const { focusedIndex: oldFocusedIndex, items } = state
  if (items.length === 0) {
    return withFocusedIndex(state, -1)
  }
  const focusedIndex = Math.min(oldFocusedIndex + 1, items.length - 1)
  return withFocusedIndex(state, focusedIndex)
}

export const focusPrevious = (state: SourceActionState): SourceActionState => {
  const { focusedIndex: oldFocusedIndex, items } = state
  if (items.length === 0) {
    return withFocusedIndex(state, -1)
  }
  const focusedIndex = Math.max(oldFocusedIndex - 1, 0)
  return withFocusedIndex(state, focusedIndex)
}
