import * as SourceActionStates from '../SourceActionStates/SourceActionStates.ts'

export const dispose = (uid: number): void => {
  SourceActionStates.dispose(uid)
}
