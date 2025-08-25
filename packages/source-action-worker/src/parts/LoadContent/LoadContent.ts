import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetSourceActions from '../GetSourceActions/GetSourceActions.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const loadContent = async (state: SourceActionState): Promise<SourceActionState> => {
  const { itemHeight, maxHeight, editorUid } = state
  const wordAtOffset = await GetWordAtOffset.getWordAtOffset(editorUid)
  const { rowIndex, columnIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
  const actions = await GetSourceActions.getEditorSourceActions(editorUid)
  const items: readonly SourceActionItem[] = actions
  const newMaxLineY = Math.min(items.length, 8)
  const itemsLength = items.length
  const newFocusedIndex = itemsLength === 0 ? -1 : 0
  const total = items.length
  const height = GetListHeight.getListHeight(items.length, itemHeight, maxHeight)
  const finalDeltaY = GetFinalDeltaY.getFinalDeltaY(height, itemHeight, total)
  return {
    ...state,
    items,
    x,
    y,
    maxLineY: newMaxLineY,
    focusedIndex: newFocusedIndex,
    finalDeltaY,
    leadingWord: wordAtOffset,
    height,
    // @ts-ignore
    rowIndex,
    columnIndex,
    width: 200,
    version: 1,
  }
}
