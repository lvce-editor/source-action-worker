import { type Rpc, TransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { VError } from '@lvce-editor/verror'
import { sendMessagePortToExtensionManagementWorker } from '../SendMessagePortToExtensionManagementWorker/SendMessagePortToExtensionManagementWorker.ts'

export const createExtensionManagementRpc = async (): Promise<Rpc> => {
  try {
    return await TransferMessagePortRpcParent.create({
      commandMap: {},
      send: sendMessagePortToExtensionManagementWorker,
    })
  } catch (error) {
    throw new VError(error, 'Failed to create extension management rpc')
  }
}
