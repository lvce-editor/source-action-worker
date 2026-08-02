import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as WidgetId from '../WidgetId/WidgetId.ts'

const getCommand = (shortId: string): any => {
  return {
    args: ['SourceActions', `SourceActions.${shortId}`, 0, WidgetId.SourceAction],
    command: 'Editor.executeWidgetCommand',
  }
}

export const getKeyBindings = (): readonly any[] => {
  return [
    {
      key: KeyCode.DownArrow,
      ...getCommand('focusNext'),
      when: WhenExpression.FocusSourceActions,
    },
    {
      key: KeyCode.UpArrow,
      ...getCommand('focusPrevious'),
      when: WhenExpression.FocusSourceActions,
    },
    {
      key: KeyCode.Enter,
      ...getCommand('selectCurrent'),
      when: WhenExpression.FocusSourceActions,
    },
    {
      key: KeyCode.End,
      ...getCommand('focusLast'),
      when: WhenExpression.FocusSourceActions,
    },
    {
      key: KeyCode.Home,
      ...getCommand('focusFirst'),
      when: WhenExpression.FocusSourceActions,
    },
    {
      key: KeyCode.Escape,
      ...getCommand('close'),
      when: WhenExpression.FocusSourceActions,
    },
  ]
}
