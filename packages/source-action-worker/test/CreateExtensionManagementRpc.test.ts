import { expect, test } from '@jest/globals'
import { EditorWorker } from '@lvce-editor/rpc-registry'
import { createExtensionManagementRpc } from '../src/parts/CreateExtensionManagementRpc/CreateExtensionManagementRpc.ts'

test('createExtensionManagementRpc sends the port to extension management', async () => {
  using editorRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker': () => undefined,
  })

  const rpc = await createExtensionManagementRpc()

  expect(rpc).toBeDefined()
  await rpc.dispose()
  expect(editorRpc.invocations).toEqual([
    ['SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 0],
  ])
})

test('createExtensionManagementRpc wraps connection errors', async () => {
  using editorRpc = EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker': () => {
      throw new Error('connection failed')
    },
  })

  await expect(createExtensionManagementRpc()).rejects.toThrow('Failed to create extension management rpc')
  expect(editorRpc.invocations).toEqual([
    ['SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker', expect.anything(), 0],
  ])
})
