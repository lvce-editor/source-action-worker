import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { set as setEditorWorker } from '../src/parts/EditorWorker/EditorWorker.ts'
import { set as setExtensionHostWorker } from '../src/parts/ExtensionHostWorker/ExtensionHostWorker.ts'
import { selectItem } from '../src/parts/SelectItem/SelectItem.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as WidgetId from '../src/parts/WidgetId/WidgetId.ts'

test('selectItem applies edits from the selected code action', async () => {
  const editorInvoke = jest.fn()
  setEditorWorker(
    MockRpc.create({
      commandMap: {},
      invoke: editorInvoke,
    }),
  )
  setExtensionHostWorker(
    MockRpc.create({
      commandMap: {},
      invoke() {
        throw new Error('unexpected extension host invocation')
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
  expect(editorInvoke).toHaveBeenNthCalledWith(1, 'Editor.applyDocumentEdits', 42, edits)
  expect(editorInvoke).toHaveBeenNthCalledWith(
    2,
    'Editor.closeWidget2',
    42,
    WidgetId.SourceAction,
    'SourceActions',
    WhenExpression.FocusSourceActions,
  )
})

test('selectItem executes organize imports when the action has no edits', async () => {
  const edits = [
    {
      endOffset: 1,
      inserted: '',
      startOffset: 0,
    },
  ]
  const editorInvoke = jest.fn()
  const extensionHostInvoke = jest.fn<(...args: readonly unknown[]) => readonly unknown[]>()
  extensionHostInvoke.mockReturnValue(edits)
  setEditorWorker(
    MockRpc.create({
      commandMap: {},
      invoke: editorInvoke,
    }),
  )
  setExtensionHostWorker(
    MockRpc.create({
      commandMap: {},
      invoke: extensionHostInvoke,
    }),
  )
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
  expect(extensionHostInvoke).toHaveBeenCalledWith('ExtensionHostOrganizeImports.execute', 42)
  expect(editorInvoke).toHaveBeenNthCalledWith(1, 'Editor.applyDocumentEdits', 42, edits)
  expect(editorInvoke).toHaveBeenNthCalledWith(
    2,
    'Editor.closeWidget2',
    42,
    WidgetId.SourceAction,
    'SourceActions',
    WhenExpression.FocusSourceActions,
  )
})
