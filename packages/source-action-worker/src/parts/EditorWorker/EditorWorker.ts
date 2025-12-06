import { EditorWorker } from '@lvce-editor/rpc-registry'

export const {
  activateByEvent,
  applyEdit,
  closeWidget,
  dispose,
  getLines,
  getOffsetAtCursor,
  getPositionAtCursor,
  getSelections,
  getWordAt,
  getWordAtOffset2,
  getWordBefore,
  invoke,
  invokeAndTransfer,
  sendMessagePortToExtensionHostWorker,
  set,
} = EditorWorker
