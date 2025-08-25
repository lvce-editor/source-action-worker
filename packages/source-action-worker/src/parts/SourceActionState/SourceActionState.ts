import type { Rectangle } from '../Rectangle/Rectangle.ts'
import type { VirtualListState } from '../VirtualListState/VirtualListState.ts'

export interface SourceActionState extends Rectangle, VirtualListState<any> {
  readonly borderSize: number
  readonly content: string
  readonly disposed?: boolean
  readonly editorLanguageId: string
  readonly editorUid: number
  readonly focused: boolean
  readonly focusedIndex: number
  readonly items: readonly any[]
  readonly leadingWord: string
  readonly maxHeight: number
  readonly maxItems: number
  readonly uid: number
  readonly version: number
}
