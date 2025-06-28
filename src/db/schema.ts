import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filePath: text('file_path').notNull(),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  importedAt: integer('imported_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  title: text('title'),
  description: text('description'),
  cameraModel: text('camera_model'),
  latitude: real('latitude'),
  longitude: real('longitude'),
})

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey(),
  name: text('name').unique(),
})
export const photoTags = sqliteTable('photo_tags', {
  photoId: integer('photo_id').references(() => photos.id),
  tagId: integer('tag_id').references(() => tags.id),
})

export const settings = sqliteTable('settings', {
  id: integer('id')
    .primaryKey()
    .$default(() => 1),
  json: text('json'),
})
