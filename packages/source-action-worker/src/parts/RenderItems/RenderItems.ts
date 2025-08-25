import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import { getSourceActionsVirtualDom } from '../GetSourceActionsVirtualDom/GetSourceActionsVirtualDom.ts'

export const renderItems = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  const dom: readonly VirtualDomNode[] = [...getSourceActionsVirtualDom(newState.items)]
  return [/* method */ 'Viewlet.setDom2', newState.uid, dom]
}
