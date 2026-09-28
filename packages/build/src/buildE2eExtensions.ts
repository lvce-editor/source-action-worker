import { build } from 'esbuild'
import { join } from 'node:path'
import { root } from './root.ts'

const extensionNames = ['editor.source-actions'] as const

export const buildE2eExtensions = async (): Promise<void> => {
  await Promise.all(
    extensionNames.map(async (extensionName) => {
      const extensionPath = join(root, 'packages', 'e2e', 'fixtures', extensionName)
      await build({
        bundle: true,
        entryPoints: [join(extensionPath, 'main.js')],
        external: ['electron', 'node:*'],
        format: 'esm',
        outfile: join(extensionPath, 'dist', 'main.js'),
        platform: 'browser',
        target: 'esnext',
      })
    }),
  )
}
