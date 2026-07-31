import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { set } from '../src/parts/EditorWorker/EditorWorker.ts'
import { getWordAtOffset } from '../src/parts/GetWordAtOffset/GetWordAtOffset.ts'

test('getWordAtOffset - returns word at cursor', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Editor.getWordAtOffset2': () => 'hello',
    },
  })
  set(mockRpc)

  const result = await getWordAtOffset(1)
  expect(result).toBe('hello')
})

test('getWordAtOffset - returns empty string when no word at cursor', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'Editor.getWordAtOffset2': () => '',
    },
  })
  set(mockRpc)

  const result = await getWordAtOffset(1)
  expect(result).toBe('')
})
