import type { SourceActionItem } from '../SourceActionItem/SourceActionItem.ts'

const minWidth = 400
const characterWidth = 8
const iconAndPaddingWidth = 48

export const getSourceActionWidth = (sourceActions: readonly SourceActionItem[]): number => {
  let width = minWidth
  for (const sourceAction of sourceActions) {
    width = Math.max(width, sourceAction.name.length * characterWidth + iconAndPaddingWidth)
  }
  return width
}
