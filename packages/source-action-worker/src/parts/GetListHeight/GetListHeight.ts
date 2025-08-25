import * as Assert from '../Assert/Assert.ts'

export const getListHeight = (itemsLength: number, itemHeight: number, maxHeight: number): number => {
  Assert.number(itemsLength)
  Assert.number(itemHeight)
  Assert.number(maxHeight)
  const emptyMessageHeight = 40
  if (itemsLength === 0) {
    return emptyMessageHeight
  }
  const headerHeight = 26
  const paddingBottom = 5
  const totalHeight = itemsLength * itemHeight + headerHeight + paddingBottom
  return Math.min(totalHeight, maxHeight)
}
