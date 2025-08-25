import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as GetEditorMessageVirtualDom from '../GetEditorMessageVirtualDom/GetEditorMessageVirtualDom.ts'

export const getEmptySourceActionsVirtualDom = (): readonly VirtualDomNode[] => {
  return GetEditorMessageVirtualDom.getEditorMessageVirtualDom(EditorStrings.noCodeActionsAvailable())
}
