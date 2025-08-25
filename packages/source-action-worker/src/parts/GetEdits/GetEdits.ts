import type { Change } from '../Change/Change.ts'
import * as GetLines from '../GetLines/GetLines.ts'
import * as GetSelections from '../GetSelections/GetSelections.ts'
import * as ReplaceRange from '../ReplaceRange/ReplaceRange.ts'

export const getEdits = async (editorUid: number, leadingWord: string, item: any): Promise<readonly Change[]> => {
  const word = item.label
  const resolvedItem = item
  const inserted = resolvedItem ? resolvedItem.snippet : word
  const lines = await GetLines.getLines(editorUid)
  const selections = await GetSelections.getSelections(editorUid)
  const [startRowIndex, startColumnIndex] = selections
  const leadingWordLength = leadingWord.length
  const replaceRange = new Uint32Array([startRowIndex, startColumnIndex - leadingWordLength, startRowIndex, startColumnIndex])
  const changes = ReplaceRange.replaceRange(lines, replaceRange, [inserted], '')
  return changes
}
