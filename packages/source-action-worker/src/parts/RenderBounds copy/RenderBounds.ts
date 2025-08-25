import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderBounds = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  const { x, y, width, height, uid } = newState
  return [RenderMethod.SetBounds, uid, x, y, width, height]
}
