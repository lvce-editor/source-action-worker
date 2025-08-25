import * as Assert from '../Assert/Assert.ts'

export const getListHeight = (itemsLength: number, itemHeight: number, maxHeight: number) => {
  Assert.number(itemsLength)
  Assert.number(itemHeight)
  Assert.number(maxHeight)
  const emptyMessageHeight = 40
  if (itemsLength === 0) {
    return emptyMessageHeight
  }
  const totalHeight = itemsLength * itemHeight
  return Math.min(totalHeight, maxHeight)
}
