import { EditorWorker } from '@lvce-editor/rpc-registry'
import type { PositionAtCursor } from '../PositionAtCursor/PositionAtCursor.ts'

/* eslint-disable prefer-destructuring -- Keep registry method references direct for tree-shaking. */
export const activateByEvent = EditorWorker.activateByEvent
export const applyEdit = EditorWorker.applyEdit
export const closeWidget = EditorWorker.closeWidget
export const dispose = EditorWorker.dispose
export const getLines = EditorWorker.getLines
export const getOffsetAtCursor = EditorWorker.getOffsetAtCursor
export const getSelections = EditorWorker.getSelections
export const getWordAt = EditorWorker.getWordAt
export const getWordAtOffset2 = EditorWorker.getWordAtOffset2
export const getWordBefore = EditorWorker.getWordBefore
export const invoke = EditorWorker.invoke
export const invokeAndTransfer = EditorWorker.invokeAndTransfer
export const sendMessagePortToExtensionManagementWorker = EditorWorker.sendMessagePortToExtensionManagementWorker
export const set = EditorWorker.set

export const getPositionAtCursor = (editorUid: number): Promise<PositionAtCursor> => {
  return EditorWorker.getPositionAtCursor(editorUid)
}
