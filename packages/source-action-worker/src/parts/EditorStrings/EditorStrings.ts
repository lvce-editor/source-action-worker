import * as I18nString from '../I18NString/I18NString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const sourceAction = (): string => {
  return I18nString.i18nString(UiStrings.SourceAction)
}

export const noCodeActionsAvailable = (): string => {
  return I18nString.i18nString(UiStrings.NoCodeActionsAvailable)
}
