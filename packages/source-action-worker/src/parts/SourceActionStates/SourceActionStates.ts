import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const { get, set, wrapCommand, dispose, getCommandIds, registerCommands } = ViewletRegistry.create<SourceActionState>()
