import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { set as setExtensionManagementWorker } from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import { getEdits } from '../src/parts/GetEdits/GetEdits.ts'

const setTextDocument = (): void => {
  setEditorWorker(
    createMockRpc({
      commandMap: {
        'Editor.getLanguageId': () => 'typescript',
        'Editor.getText': () => 'const value = 1',
        'Editor.getUri': () => 'file:///test.ts',
      },
    }),
  )
}

test('getEdits returns no edits when no isolated provider matches', async () => {
  setTextDocument()
  setExtensionManagementWorker(
    createMockRpc({
      commandMap: {
        'Extensions.executeOrganizeImportsProvider': () => ({ found: false }),
      },
    }),
  )

  await expect(getEdits(42)).resolves.toEqual([])
})

test('getEdits rejects an invalid isolated provider result', async () => {
  setTextDocument()
  setExtensionManagementWorker(
    createMockRpc({
      commandMap: {
        'Extensions.executeOrganizeImportsProvider': () => ({ found: true, result: 'invalid' }),
      },
    }),
  )

  await expect(getEdits(42)).rejects.toThrow('Organize imports provider result must be an array')
})
