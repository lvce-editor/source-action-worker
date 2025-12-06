import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as GetFinalDeltaY from '../GetFinalDeltaY/GetFinalDeltaY.ts'
import * as GetListHeight from '../GetListHeight/GetListHeight.ts'
import * as GetPositionAtCursor from '../GetPositionAtCursor/GetPositionAtCursor.ts'
import * as GetSourceActions from '../GetSourceActions/GetSourceActions.ts'
import * as GetWordAtOffset from '../GetWordAtOffset/GetWordAtOffset.ts'

export const loadContent = async (state: SourceActionState): Promise<SourceActionState> => {
  const { editorUid, itemHeight, maxHeight } = state
  const wordAtOffset = await GetWordAtOffset.getWordAtOffset(editorUid)
  const { columnIndex, rowIndex, x, y } = await GetPositionAtCursor.getPositionAtCursor(editorUid)
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
    // @ts-ignore
    columnIndex,
    finalDeltaY,
    focusedIndex: newFocusedIndex,
    height,
    items,
    leadingWord: wordAtOffset,
    maxLineY: newMaxLineY,
    rowIndex,
    version: 1,
    width: 200,
    x,
    y,
  }
}
