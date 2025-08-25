import { terminate } from '@lvce-editor/viewlet-registry'
import * as Close from '../Close/Close.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dispose from '../Dispose/Dispose.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleEditorDeleteLeft from '../HandleEditorDeleteLeft/HandleEditorDeleteLeft.ts'
import * as HandleEditorType from '../HandleEditorType/HandleEditorType.ts'
import * as HandleWheel from '../HandleWheel/HandleWheel.ts'
import * as Initialize from '../Initialize/Initialize.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as WrapCommand from '../SourceActionStates/SourceActionStates.ts'

export const commandMap = {
  'SourceActions.close': WrapCommand.wrapCommand(Close.close),
  'SourceActions.create': Create.create,
  'SourceActions.diff2': Diff2.diff2,
  'SourceActions.dispose': Dispose.dispose,
  'SourceActions.getCommandIds': WrapCommand.getCommandIds,
  'SourceActions.getKeyBindings': GetKeyBindings.getKeyBindings,
  'SourceActions.handleEditorDeleteLeft': WrapCommand.wrapCommand(HandleEditorDeleteLeft.handleEditorDeleteLeft),
  'SourceActions.handleEditorType': WrapCommand.wrapCommand(HandleEditorType.handleEditorType),
  'SourceActions.handleWheel': WrapCommand.wrapCommand(HandleWheel.handleWheel),
  'SourceActions.initialize': Initialize.initialize,
  'SourceActions.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'SourceActions.render2': Render2.render2,
  'SourceActions.terminate': terminate,
}
