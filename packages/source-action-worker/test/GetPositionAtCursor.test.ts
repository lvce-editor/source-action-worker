import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getPositionAtCursor } from '../src/parts/GetPositionAtCursor/GetPositionAtCursor.ts'

test('getPositionAtCursor - returns position at cursor', async () => {
  const mockPosition = {
    columnIndex: 10,
    rowIndex: 5,
    x: 100,
    y: 200,
  }

  const mockRpc = createMockRpc({
    commandMap: {
      'Editor.getPositionAtCursor': () => mockPosition,
    },
  })
  set(mockRpc)

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
})

test('getPositionAtCursor - returns position at start of document', async () => {
  const mockPosition = {
    columnIndex: 0,
    rowIndex: 0,
    x: 0,
    y: 0,
  }

  const mockRpc = createMockRpc({
    commandMap: {
      'Editor.getPositionAtCursor': () => mockPosition,
    },
  })
  set(mockRpc)

  const result = await getPositionAtCursor(1)
  expect(result).toEqual(mockPosition)
})
