import { expect, test } from '@jest/globals'
import * as SourceActionStates from '../src/parts/SourceActionStates/SourceActionStates.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { dispose } from '../src/parts/Dispose/Dispose.ts'

test('dispose', async () => {
  const state = createDefaultState()
  SourceActionStates.set(123, state, state)
  dispose(123)
  expect(SourceActionStates.get(123)).toBeUndefined()
})
