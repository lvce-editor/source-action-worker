import { expect, test } from '@jest/globals'
import { getSourceActionListItemVirtualDom } from '../src/parts/GetSourceActionListItemVirtualDom/GetSourceActionListItemVirtualDom.ts'

test('attaches the click listener and action name to the source action row', () => {
  const result = getSourceActionListItemVirtualDom({
    edits: [],
    isFocused: true,
    name: "Fix 'quotes' problem",
  })

  expect(result[0]).toMatchObject({
    'data-name': "Fix 'quotes' problem",
    onClick: 'handleSourceActionClick',
    role: 'option',
  })
})

test('renders an unfocused source action row without the focused class', () => {
  const result = getSourceActionListItemVirtualDom({
    isFocused: false,
    name: 'Extract function',
  })

  expect(result[0]).toMatchObject({
    className: 'SourceActionItem',
    'data-name': 'Extract function',
  })
})
