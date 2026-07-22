import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as EditorStrings from '../EditorStrings/EditorStrings.ts'
import * as GetEmptySourceActionsVirtualDom from '../GetEmptySourceActionsVirtualDom/GetEmptySourceActionsVirtualDom.ts'
import * as GetSourceActionListItemVirtualDom from '../GetSourceActionListItemVirtualDom/GetSourceActionListItemVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const sourceActionHeadingNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SourceActionHeading,
  type: VirtualDomElements.Div,
}

export const getSourceActionsVirtualDom = (sourceActions: readonly SourceActionItem[]): readonly VirtualDomNode[] => {
  if (sourceActions.length === 0) {
    return GetEmptySourceActionsVirtualDom.getEmptySourceActionsVirtualDom()
  }
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.EditorSourceActions),
      onFocusIn: DomEventListenerFunctions.HandleFocusIn,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    sourceActionHeadingNode,
    text(EditorStrings.sourceAction()),
    {
      childCount: sourceActions.length,
      className: ClassNames.EditorSourceActionsList,
      onClick: DomEventListenerFunctions.HandleClick,
      role: AriaRoles.ListBox,
      type: VirtualDomElements.Div,
    },
    ...sourceActions.flatMap(GetSourceActionListItemVirtualDom.getSourceActionListItemVirtualDom),
  ]
  return dom
}
