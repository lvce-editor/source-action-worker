import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

export const getEditorSourceActions = async (editorId: number): Promise<readonly SourceActionItem[]> => {
  const [contributedActions, languageId, offset, text, uri] = await Promise.all([
    EditorWorker.invoke('Editor.getSourceActions', editorId),
    EditorWorker.invoke('Editor.getLanguageId', editorId),
    EditorWorker.getOffsetAtCursor(editorId),
    EditorWorker.invoke('Editor.getText', editorId),
    EditorWorker.invoke('Editor.getUri', editorId),
  ])
  const textDocument = {
    documentId: editorId,
    languageId,
    text,
    uri,
  }
  const providedActions = await ExtensionManagementWorker.invoke('Extensions.executeCodeActionProviders', textDocument, offset)
  if (!Array.isArray(contributedActions) || !Array.isArray(providedActions)) {
    throw new TypeError('Code actions must be an array')
  }
  const names = new Set(providedActions.map((action) => action?.name))
  const uniqueContributedActions = contributedActions.filter((action) => !names.has(action?.name))
  return [...providedActions, ...uniqueContributedActions]
}
