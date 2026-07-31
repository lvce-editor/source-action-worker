import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

export const getEdits = async (editorId: number): Promise<readonly any[]> => {
  const [languageId, text, uri] = await Promise.all([
    EditorWorker.invoke('Editor.getLanguageId', editorId),
    EditorWorker.invoke('Editor.getText', editorId),
    EditorWorker.invoke('Editor.getUri', editorId),
  ])
  const textDocument = {
    documentId: editorId,
    languageId,
    text,
    uri,
  }
  const { found, result } = await ExtensionManagementWorker.invoke('Extensions.executeOrganizeImportsProvider', textDocument)
  if (!found) {
    return []
  }
  if (!Array.isArray(result)) {
    throw new TypeError('Organize imports provider result must be an array')
  }
  return result
}
