import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.source-actions-open'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  const sourceActionWorkerPath = decodeURIComponent(new URL('../../../.tmp/dist/dist/sourceActionWorkerMain.js', import.meta.url).pathname).replace(
    /^\/([a-z]:\/)/i,
    '$1',
  )
  await Command.execute('Preferences.update', { 'develop.sourceActionWorkerPath': sourceActionWorkerPath })
  const extensionUrl = import.meta.resolve('../fixtures/editor.source-actions')
  await Extension.addWebExtension(extensionUrl)
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/src/test.xyz`, 'globalThis.AbortSignal.abort()')
  await Main.openUri(`${tmpDir}/src/test.xyz`)
  await Editor.setCursor(0, 11)

  await Editor.openSourceActions()

  const sourceActions = Locator('.EditorSourceActions')
  await expect(sourceActions).toBeVisible()
  const organizeImports = Locator('.SourceActionItem', { hasText: 'Organize Imports' })
  await expect(organizeImports).toBeVisible()
}
