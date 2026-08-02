import { expect, test } from '@jest/globals'
import { getEventListeners } from '../src/parts/GetEventListeners/GetEventListeners.ts'

test('getEventListeners', () => {
  const result = getEventListeners()
  expect(result[0]).toEqual({
    name: 'handleSourceActionClick',
    params: ['handleSourceActionClick', 'event.target.dataset.name'],
  })
})
