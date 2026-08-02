import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { set as setExtensionManagementWorker } from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import { getEditorSourceActions } from '../src/parts/GetSourceActions/GetSourceActions.ts'

test('merges provided code actions with unique contributed actions', async () => {
  const contributedActions = [
    { kind: 'source.organizeImports', name: 'Organize Imports' },
    { kind: 'source.sortImports', name: 'Sort Imports' },
  ]
  const providedActions = [
    { edits: [], kind: 'quickfix', name: "Fix 'quotes' problem" },
    { kind: 'source.organizeImports', name: 'Organize Imports' },
  ]
  const editorRpc = createMockRpc({
    commandMap: {
      'Editor.getLanguageId': () => 'javascript',
      'Editor.getOffsetAtCursor': () => 15,
      'Editor.getSourceActions': () => contributedActions,
      'Editor.getText': () => 'const value = "test"',
      'Editor.getUri': () => 'file:///test.js',
    },
  })
  const extensionManagementRpc = createMockRpc({
    commandMap: {
      'Extensions.executeCodeActionProviders': () => providedActions,
    },
  })
  setEditorWorker(editorRpc)
  setExtensionManagementWorker(extensionManagementRpc)

  await expect(getEditorSourceActions(42)).resolves.toEqual([
    { edits: [], kind: 'quickfix', name: "Fix 'quotes' problem" },
    { kind: 'source.organizeImports', name: 'Organize Imports' },
    { kind: 'source.sortImports', name: 'Sort Imports' },
  ])
  expect(extensionManagementRpc.invocations).toEqual([
    [
      'Extensions.executeCodeActionProviders',
      {
        documentId: 42,
        languageId: 'javascript',
        text: 'const value = "test"',
        uri: 'file:///test.js',
      },
      15,
    ],
  ])
})

test('rejects invalid code action results', async () => {
  setEditorWorker(
    createMockRpc({
      commandMap: {
        'Editor.getLanguageId': () => 'javascript',
        'Editor.getOffsetAtCursor': () => 0,
        'Editor.getSourceActions': () => [],
        'Editor.getText': () => '',
        'Editor.getUri': () => 'file:///test.js',
      },
    }),
  )
  setExtensionManagementWorker(
    createMockRpc({
      commandMap: {
        'Extensions.executeCodeActionProviders': () => 'invalid',
      },
    }),
  )

  await expect(getEditorSourceActions(42)).rejects.toThrow('Code actions must be an array')
})
