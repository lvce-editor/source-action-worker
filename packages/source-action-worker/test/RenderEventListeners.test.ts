import { expect, test } from '@jest/globals'
import type { SourceActionState } from '../src/parts/SourceActionState/SourceActionState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetEventListeners from '../src/parts/GetEventListeners/GetEventListeners.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

test('renderEventListeners', () => {
  const state: SourceActionState = {
    ...createDefaultState(),
    uid: 1,
  }
  const result = renderEventListeners(state)
  expect(result).toEqual([RenderMethod.SetEventListeners, 1, GetEventListeners.getEventListeners()])
})
