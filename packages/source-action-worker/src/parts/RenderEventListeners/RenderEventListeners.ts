import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import { getEventListeners } from '../GetEventListeners/GetEventListeners.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderEventListeners = (state: SourceActionState): readonly any[] => {
  const { uid } = state
  const eventListeners = getEventListeners()
  return [RenderMethod.SetEventListeners, uid, eventListeners]
}
