import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const isEqual = (oldState: SourceActionState, newState: SourceActionState): boolean => {
  return oldState.x === newState.x && oldState.y === newState.y && oldState.width === newState.width && oldState.height === newState.height
}
