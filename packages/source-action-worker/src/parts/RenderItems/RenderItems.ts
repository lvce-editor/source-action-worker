import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker';
import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const renderItems = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    text('Hello World'),
  ]
  return [/* method */ 'Viewlet.setDom2', newState.uid, dom]
}
