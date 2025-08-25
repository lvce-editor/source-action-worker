import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderUid = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  const { uid, editorUid } = newState
  return [RenderMethod.SetUid, uid, editorUid]
}
