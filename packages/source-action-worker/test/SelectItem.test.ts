import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { set as setExtensionManagementWorker } from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import { selectItem } from '../src/parts/SelectItem/SelectItem.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.ts'

test('selectItem applies edits from the selected code action', async () => {
  const editorRpc = createMockRpc({
    commandMap: {
      'Editor.applyDocumentEdits': () => undefined,
      'Editor.closeWidget2': () => undefined,
      'Editor.updateDiagnostics': () => undefined,
    },
  })
  setEditorWorker(editorRpc)
  setExtensionManagementWorker(
    createMockRpc({
      commandMap: {
        unexpected() {
          throw new Error('unexpected extension management invocation')
        },
      },
    }),
  )
  const edits = [
    {
      endOffset: 28,
      inserted: 'abort',
      startOffset: 23,
    },
  ]
  const state = {
    ...createDefaultState(),
    editorUid: 42,
    items: [
      {
        edits,
        isFocused: true,
        name: "Change spelling to 'abort'",
      },
    ],
  }

  await expect(selectItem(state, "Change spelling to 'abort'")).resolves.toBe(state)
  expect(editorRpc.invocations).toEqual([
    ['Editor.applyDocumentEdits', 42, edits],
    ['Editor.updateDiagnostics', 42],
    ['Editor.closeWidget2', 42, WidgetId.SourceAction, 'SourceActions', WhenExpression.FocusSourceActions],
  ])
})

test('selectItem executes organize imports when the action has no edits', async () => {
  const edits = [
    {
      endOffset: 1,
      inserted: '',
      startOffset: 0,
    },
  ]
  const editorRpc = createMockRpc({
    commandMap: {
      'Editor.applyDocumentEdits': () => undefined,
      'Editor.closeWidget2': () => undefined,
      'Editor.getLanguageId': () => 'typescript',
      'Editor.getText': () => 'import { b, a } from "./module.js"',
      'Editor.getUri': () => 'file:///test.ts',
      'Editor.updateDiagnostics': () => undefined,
    },
  })
  const extensionManagementRpc = createMockRpc({
    commandMap: {
      'Extensions.executeOrganizeImportsProvider': () => ({ found: true, result: edits }),
    },
  })
  setEditorWorker(editorRpc)
  setExtensionManagementWorker(extensionManagementRpc)
  const state = {
    ...createDefaultState(),
    editorUid: 42,
    items: [
      {
        isFocused: true,
        name: 'Organize Imports',
      },
    ],
  }

  await expect(selectItem(state, 'Organize Imports')).resolves.toBe(state)
  expect(extensionManagementRpc.invocations).toEqual([
    [
      'Extensions.executeOrganizeImportsProvider',
      {
        documentId: 42,
        languageId: 'typescript',
        text: 'import { b, a } from "./module.js"',
        uri: 'file:///test.ts',
      },
    ],
  ])
  expect(editorRpc.invocations).toEqual([
    ['Editor.getLanguageId', 42],
    ['Editor.getText', 42],
    ['Editor.getUri', 42],
    ['Editor.applyDocumentEdits', 42, edits],
    ['Editor.updateDiagnostics', 42],
    ['Editor.closeWidget2', 42, WidgetId.SourceAction, 'SourceActions', WhenExpression.FocusSourceActions],
  ])
})
