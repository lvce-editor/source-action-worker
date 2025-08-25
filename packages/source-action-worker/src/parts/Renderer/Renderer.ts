import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export interface Renderer {
  (oldState: SourceActionState, newState: SourceActionState): readonly any[]
}
