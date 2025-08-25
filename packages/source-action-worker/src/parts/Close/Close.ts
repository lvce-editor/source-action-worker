import type { SourceActionState } from '../SourceActionState/SourceActionState.ts'
import * as EditorWorker from '../EditorWorker/EditorWorker.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

export const close = async (state: SourceActionState): Promise<SourceActionState> => {
  const { editorUid } = state
  await EditorWorker.closeWidget(editorUid, WidgetId.Completion, 'Completions', WhenExpression.FocusEditorCompletions)
  return state
}
