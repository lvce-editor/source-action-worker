import { expect, jest, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { selectCurrent } from '../src/parts/SelectCurrent/SelectCurrent.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.ts'

test('applies the focused code action', async () => {
  const edits = [{ endOffset: 20, inserted: "'test'", startOffset: 14 }]
  const editorRpc = createMockRpc({
    commandMap: {
      'Editor.applyDocumentEdits': jest.fn(),
      'Editor.closeWidget2': jest.fn(),
      'Editor.updateDiagnostics': jest.fn(),
    },
  })
  setEditorWorker(editorRpc)
  const state = {
    ...createDefaultState(),
    editorUid: 42,
    focusedIndex: 0,
    items: [{ edits, isFocused: true, name: "Fix 'quotes' problem" }],
  }

  await expect(selectCurrent(state)).resolves.toBe(state)
  expect(editorRpc.invocations).toEqual([
    ['Editor.applyDocumentEdits', 42, edits],
    ['Editor.updateDiagnostics', 42],
    ['Editor.closeWidget2', 42, WidgetId.SourceAction, 'SourceActions', WhenExpression.FocusSourceActions],
  ])
})

test('does nothing when no action is focused', async () => {
  const state = {
    ...createDefaultState(),
    focusedIndex: -1,
    items: [],
  }

  await expect(selectCurrent(state)).resolves.toBe(state)
})
