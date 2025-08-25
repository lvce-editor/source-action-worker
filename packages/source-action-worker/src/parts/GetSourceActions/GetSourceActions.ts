import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'

// TODO ask extension host worker instead
export const getEditorSourceActions = async (): Promise<readonly SourceActionItem[]> => {
  // @ts-ignore
  // const sourceActions = await RendererWorker.invoke('GetEditorSourceActions.getEditorSourceActions')
  return []
}
