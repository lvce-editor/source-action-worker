import type { PositionAtCursor } from '../PositionAtCursor/PositionAtCursor.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

export const getPositionAtCursor = (editorUid: number): Promise<PositionAtCursor> => {
  return EditorWorker.getPositionAtCursor(editorUid)
}
