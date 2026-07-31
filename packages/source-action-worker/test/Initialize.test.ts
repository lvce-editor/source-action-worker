import { test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import * as EditorWorker from '../src/parts/EditorWorker/EditorWorker.ts'
import * as ExtensionManagementWorker from '../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts'
import { initialize } from '../src/parts/Initialize/Initialize.ts'

test('initialize sets extension management worker rpc', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker': () => undefined,
    },
  })
  EditorWorker.set(mockRpc)
  ExtensionManagementWorker.set(mockRpc)

  await initialize()
  await ExtensionManagementWorker.dispose()
})
