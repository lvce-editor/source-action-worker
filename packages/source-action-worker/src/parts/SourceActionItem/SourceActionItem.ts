import type { Change } from '../Change/Change.ts'

export interface SourceActionItem {
  readonly edits?: readonly Change[]
  readonly isFocused: boolean
  readonly name: string
}
