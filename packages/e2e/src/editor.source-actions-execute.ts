import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'editor.source-actions-execute'

export const test: Test = async ({ Command, Editor, expect, Extension, FileSystem, Locator, Main }) => {
  const sourceActionWorkerPath = decodeURIComponent(new URL('../../../.tmp/dist/dist/sourceActionWorkerMain.js', import.meta.url).pathname).replace(
    /^\/([a-z]:\/)/i,
    '$1',
  )
  await Command.execute('Preferences.update', { 'develop.sourceActionWorkerPath': sourceActionWorkerPath })
  const extensionUrl = import.meta.resolve('../fixtures/editor.source-actions')
  await Extension.addWebExtension(extensionUrl)
  const tmpDir = await FileSystem.getTmpDir()
  const file = `${tmpDir}/src/test.xyz`
  await FileSystem.writeFile(file, "import { add, subtract } from './add.xyz'")
  await Main.openUri(file)
  await Editor.setCursor(0, 0)
  await Editor.openSourceActions()

  await Command.execute('EditorSourceAction.selectItem', 'Organize Imports')

  const sourceActions = Locator('.EditorSourceActions')
  await expect(sourceActions).toBeHidden()
  const token = Locator('.Token.Unknown')
  await expect(token).toHaveText("import { add } from './add.xyz'")
}
