import * as CreateExtensionManagementRpc from '../CreateExtensionManagementRpc/CreateExtensionManagementRpc.ts'
import * as ExtensionManagementWorker from '../ExtensionManagementWorker/ExtensionManagementWorker.ts'

export const initialize = async (): Promise<void> => {
  const rpc = await CreateExtensionManagementRpc.createExtensionManagementRpc()
  ExtensionManagementWorker.set(rpc)
}
