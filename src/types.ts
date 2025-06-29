export type { Photo } from './db/types'

export type ScanEvent =
  | { type: 'start'; folder: string }
  | { type: 'progress'; path: string }
  | { type: 'done'; total: number }
  | { type: 'error'; message: string }
