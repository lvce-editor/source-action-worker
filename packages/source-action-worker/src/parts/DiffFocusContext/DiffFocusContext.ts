import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const isEqual = (oldState: SourceActionState, newState: SourceActionState): boolean => {
  return oldState.version === newState.version
}
