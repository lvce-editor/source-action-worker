import { expect, test } from '@jest/globals'
import { getSourceActionsVirtualDom } from '../src/parts/GetSourceActionsVirtualDom/GetSourceActionsVirtualDom.ts'

test('renders the empty state when there are no source actions', () => {
  expect(getSourceActionsVirtualDom([])).toMatchObject([
    { className: 'Viewlet EditorMessage' },
    { className: 'EditorMessageText' },
    { text: 'No code actions available' },
    { className: 'EditorMessageTriangle' },
  ])
})

test('renders source actions and applies the focused index', () => {
  const result = getSourceActionsVirtualDom(
    [
      { isFocused: false, name: 'Extract function' },
      { isFocused: false, name: 'Rename symbol' },
    ],
    1,
  )

  expect(result[0]).toMatchObject({ className: 'Viewlet EditorSourceActions' })
  expect(result[4]).toMatchObject({ className: 'SourceActionItem' })
  expect(result[7]).toMatchObject({ className: 'SourceActionItem SourceActionItemFocused' })
})
