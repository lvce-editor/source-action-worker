import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getActionClassName = (isFocused: boolean): string => {
  if (isFocused) {
    return MergeClassNames.mergeClassNames(ClassNames.SourceActionItem, ClassNames.SourceActionItemFocused)
  }
  return ClassNames.SourceActionItem
}

export const getSourceActionListItemVirtualDom = (sourceAction: SourceActionItem): readonly VirtualDomNode[] => {
  const { name, isFocused } = sourceAction
  const actionClassName = getActionClassName(isFocused)
  return [
    {
      type: VirtualDomElements.Div,
      className: actionClassName,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.SourceActionIcon, ClassNames.MaskIcon, ClassNames.MaskIconSymbolFile),
    },
    text(name),
  ]
}
