import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 420_000

export const workerPath = join(root, '.tmp/dist/dist/sourceActionWorkerMain.js')

export const playwrightPath = import.meta.resolve('../../e2e/node_modules/playwright/index.mjs').toString()

export const instantiations = 5000

export const instantiationsPath = join(root, 'packages', 'source-action-worker')
