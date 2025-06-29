import { photos, folders } from './schema'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

export type Photo = InferSelectModel<typeof photos>
export type NewPhoto = InferInsertModel<typeof photos>

export type Folder = InferSelectModel<typeof folders>
