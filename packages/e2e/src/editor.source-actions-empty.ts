import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.source-actions-empty'

export const test: Test = async ({ Command, Editor, expect, FileSystem, Locator, Main }) => {
  const sourceActionWorkerPath = decodeURIComponent(new URL('../../../.tmp/dist/dist/sourceActionWorkerMain.js', import.meta.url).pathname).replace(
    /^\/([a-z]:\/)/i,
    '$1',
  )
  await Command.execute('Preferences.update', { 'develop.sourceActionWorkerPath': sourceActionWorkerPath })
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/src/test.xyz`, 'globalThis.AbortSignal.abort()')
  await Main.openUri(`${tmpDir}/src/test.xyz`)
  await Editor.setCursor(0, 11)

  await Editor.openSourceActions()

  const emptyMessage = Locator('.EditorMessageText')
  await expect(emptyMessage).toBeVisible()
  await expect(emptyMessage).toHaveText('No code actions available')
}
