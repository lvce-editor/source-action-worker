import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as ApplyEdit from '../ApplyEdit/ApplyEdit.ts'
import * as Close from '../Close/Close.ts'
import * as GetEdits from '../GetEdits/GetEdits.ts'
import * as SourceActionName from '../SourceActionName/SourceActionName.ts'

export const selectItem = async (state: SourceActionState, name: string): Promise<SourceActionState> => {
  const { editorUid } = state
  if (name === SourceActionName.OrganizeImports) {
    const edits = await GetEdits.getEdits(editorUid)
    await ApplyEdit.applyEdit(editorUid, edits)
  }
  return Close.close(state)
}
