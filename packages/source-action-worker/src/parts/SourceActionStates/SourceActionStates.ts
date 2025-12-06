import * as ViewletRegistry from '@lvce-editor/viewlet-registry'
import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'

export const { dispose, get, getCommandIds, registerCommands, set, wrapCommand } = ViewletRegistry.create<SourceActionState>()
