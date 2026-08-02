import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as SelectItem from '../SelectItem/SelectItem.ts'

export const selectCurrent = async (state: SourceActionState): Promise<SourceActionState> => {
  const { focusedIndex, items } = state
  const item = items[focusedIndex]
  if (!item) {
    return state
  }
  return SelectItem.selectItem(state, item.name)
}
