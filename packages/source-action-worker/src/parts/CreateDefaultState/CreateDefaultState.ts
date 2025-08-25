import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const createDefaultState = (): SourceActionState => {
  return {
    uid: 0,
    items: [],
    itemHeight: 20,
    maxHeight: 150,
    minLineY: 0,
    maxLineY: 0,
    focusedIndex: -1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    deltaY: 0,
    finalDeltaY: 0,
    focused: false,
    headerHeight: 0,
    leadingWord: '',
    version: 0,
    editorUid: 0,
    editorLanguageId: '',
    maxItems: 8,
    borderSize: 0,
    content: '',
  }
}
