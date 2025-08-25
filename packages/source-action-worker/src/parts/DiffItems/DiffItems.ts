import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const isEqual = (oldState: SourceActionState, newState: SourceActionState): boolean => {
  return (
    oldState.items === newState.items &&
    oldState.focusedIndex === newState.focusedIndex &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY
  )
}
