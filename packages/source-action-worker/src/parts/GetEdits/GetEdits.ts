import * as ExtensionHostWorker from '../ExtensionHostWorker/ExtensionHostWorker.ts'

export const getEdits = async (editorId: number): Promise<readonly any[]> => {
  // @ts-ignore
  const edits = await ExtensionHostWorker.invoke('ExtensionHostOrganizeImports.execute', editorId)
  return edits
}
