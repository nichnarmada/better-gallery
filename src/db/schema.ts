import { sqliteTable, integer, text, blob, real } from 'drizzle-orm/sqlite-core'

export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull().unique(),
  captureDate: text('capture_date'),
  cameraMake: text('camera_make'),
  cameraModel: text('camera_model'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  clipEmbed: blob('clip_embed'),
  textEmbed: blob('text_embed'),
  thumbnailJpg: blob('thumbnail_jpg'),
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
