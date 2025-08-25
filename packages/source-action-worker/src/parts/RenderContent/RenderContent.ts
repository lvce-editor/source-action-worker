import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as RenderMethod from '../RenderMethod/RenderMethod.ts'

export const renderContent = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  const { uid } = newState
  const dom: readonly VirtualDomNode[] = []
  return [RenderMethod.SetDom2, uid, dom]
}
