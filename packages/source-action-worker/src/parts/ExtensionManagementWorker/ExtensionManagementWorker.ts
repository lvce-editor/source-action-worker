import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'

/* eslint-disable prefer-destructuring -- Keep registry method references direct for tree-shaking. */
export const dispose = ExtensionManagementWorker.dispose
export const invoke = ExtensionManagementWorker.invoke
export const set = ExtensionManagementWorker.set
