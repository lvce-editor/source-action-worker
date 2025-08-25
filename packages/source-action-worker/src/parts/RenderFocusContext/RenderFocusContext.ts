import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const renderFocusContext = (oldState: SourceActionState, newState: SourceActionState): readonly any[] => {
  return [/* method */ 'Viewlet.setFocusContext', WhenExpression.FocusEditorRename]
}
