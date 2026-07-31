import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { PositionAtCursor } from '../PositionAtCursor/PositionAtCursor.ts'

export const {
  activateByEvent,
  applyEdit,
  closeWidget,
  dispose,
  getLines,
  getOffsetAtCursor,
  getSelections,
  getWordAt,
  getWordAtOffset2,
  getWordBefore,
  invoke,
  invokeAndTransfer,
  sendMessagePortToExtensionManagementWorker,
  set,
} = EditorWorker

export const getPositionAtCursor = (editorUid: number): Promise<PositionAtCursor> => {
  return EditorWorker.getPositionAtCursor(editorUid)
}
