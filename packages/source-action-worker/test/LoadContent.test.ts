import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { set as setExtensionManagementWorker } from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'

test('uses a wide popup so source action labels remain visible', async () => {
  setEditorWorker(
    createMockRpc({
      commandMap: {
        'Editor.getLanguageId': () => 'typescript',
        'Editor.getOffsetAtCursor': () => 0,
        'Editor.getPositionAtCursor': () => ({ columnIndex: 1, rowIndex: 2, x: 100, y: 200 }),
        'Editor.getSourceActions': () => [],
        'Editor.getText': () => '',
        'Editor.getUri': () => 'file:///test.ts',
        'Editor.getWordAtOffset2': () => '',
      },
    }),
  )
  setExtensionManagementWorker(
    createMockRpc({
      commandMap: {
        'Extensions.executeCodeActionProviders': () => [
          {
            edits: [],
            kind: 'quickfix',
            name: 'Disable unicorn/no-top-level-side-effects for the entire file',
          },
        ],
      },
    }),
  )

  const state = {
    ...createDefaultState(),
    editorUid: 42,
  }
  const result = await loadContent(state)

  expect(result.width).toBe(400)
})
