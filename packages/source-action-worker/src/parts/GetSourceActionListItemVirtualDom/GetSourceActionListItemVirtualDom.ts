import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const focusedActionClassName = MergeClassNames.mergeClassNames(ClassNames.SourceActionItem, ClassNames.SourceActionItemFocused)
const sourceActionIconClassName = MergeClassNames.mergeClassNames(ClassNames.SourceActionIcon, ClassNames.MaskIcon, ClassNames.MaskIconSymbolFile)

const getActionClassName = (isFocused: boolean): string => {
  if (isFocused) {
    return focusedActionClassName
  }
  return ClassNames.SourceActionItem
}

export const getSourceActionListItemVirtualDom = (sourceAction: SourceActionItem): readonly VirtualDomNode[] => {
  const { isFocused, name } = sourceAction
  const actionClassName = getActionClassName(isFocused)
  return [
    {
      childCount: 2,
      className: actionClassName,
      'data-name': name,
      onClick: DomEventListenerFunctions.HandleSourceActionClick,
      role: AriaRoles.Option,
      type: VirtualDomElements.Div,
    },
    {
      className: sourceActionIconClassName,
      'data-name': name,
      type: VirtualDomElements.Div,
    },
    text(name),
  ]
}
