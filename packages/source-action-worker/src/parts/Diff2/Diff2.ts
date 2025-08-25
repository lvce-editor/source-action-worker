import * as SourceActionStates from '../SourceActionStates/SourceActionStates.ts'
import * as Diff from '../Diff/Diff.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = SourceActionStates.get(uid)
  const diffResult = Diff.diff(oldState, newState)
  return diffResult
}
