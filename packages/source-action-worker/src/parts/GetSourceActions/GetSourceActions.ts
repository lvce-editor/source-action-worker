import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'

// TODO ask extension host worker instead
export const getEditorSourceActions = async (editorId: number): Promise<readonly SourceActionItem[]> => {
  // @ts-ignore
  const sourceActions = await EditorWorker.invoke('Editor.getEditorSourceActions', editorId)
  return []
}
