import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleSourceActionClick,
      params: ['handleSourceActionClick', 'event.target.dataset.name'],
    },
    {
      name: DomEventListenerFunctions.HandleWheel,
      params: ['EditorSourceAction.handleWheel', 'event.deltaMode', 'event.deltaY'],
      passive: true,
    },
  ]
}
