# Database Layer - `/src/db/`

## 🎯 Purpose
TypeScript database layer providing type-safe database operations using Drizzle ORM. Serves as the interface between the frontend React components and the SQLite database.

## 📁 Directory Structure
```
src/db/
├── schema.ts     # Drizzle ORM table definitions
└── types.ts      # TypeScript types derived from schema
```

## 🏗️ Architecture Strategy

### Drizzle ORM Benefits
- **Type Safety**: Full TypeScript integration with compile-time validation
- **Schema Evolution**: Migration generation from schema changes
- **Performance**: Minimal overhead over raw SQL
- **Developer Experience**: Excellent autocomplete and error detection

### Database Connection Strategy
- **SQLite Location**: `{appDataDir}/gallery.db` (managed by Rust backend)
- **Connection Management**: Rust backend owns the database connection
- **Frontend Access**: Read-only queries via Tauri commands
- **Write Operations**: Performed by Node.js sidecar during scanning

## 📊 Schema Definitions (`schema.ts`)

### Core Tables

#### `photos` Table
```typescript
export const photos = sqliteTable('photos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filePath: text('file_path').notNull().unique(),
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
  folderId: integer('folder_id').references(() => folders.id, { onDelete: 'cascade' }),
})
```

#### `folders` Table
```typescript
export const folders = sqliteTable('folders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  path: text('path').notNull().unique(),
  addedAt: integer('added_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})
```

#### `tags` & `photo_tags` Tables
```typescript
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey(),
  name: text('name').unique(),
})

export const photoTags = sqliteTable('photo_tags', {
  photoId: integer('photo_id').references(() => photos.id),
  tagId: integer('tag_id').references(() => tags.id),
})
```

#### `settings` Table
```typescript
export const settings = sqliteTable('settings', {
  id: integer('id')
    .primaryKey()
    .$default(() => 1),
  json: text('json'),
})
```

## 📝 TypeScript Types (`types.ts`)

### Type Generation Strategy
```typescript
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

// Select types (for reading from database)
export type Photo = InferSelectModel<typeof photos>
export type Folder = InferSelectModel<typeof folders>

// Insert types (for writing to database)  
export type NewPhoto = InferInsertModel<typeof photos>
```

### Type Usage Examples
```typescript
// Reading photos
const allPhotos: Photo[] = await invoke('get_all_photos')

// Creating new photo record (in sidecar)
const newPhoto: NewPhoto = {
  filePath: '/path/to/image.jpg',
  fileName: 'image.jpg',
  fileSize: 1024000,
  width: 1920,
  height: 1080,
  createdAt: new Date(),
  folderId: 1,
  // Optional fields can be omitted
}
```

## 🔄 Data Flow Patterns

### Frontend → Database (Read Operations)
1. **React Component** calls Tauri command via `invoke()`
2. **Rust Backend** executes SQL query using Rusqlite  
3. **Results** serialized and returned to frontend
4. **TypeScript Types** ensure type safety on frontend

### Sidecar → Database (Write Operations)
1. **Node.js Sidecar** processes images and extracts metadata
2. **Drizzle ORM** in sidecar provides type-safe database operations
3. **Direct SQLite** writes via better-sqlite3 connection
4. **Conflict Resolution** handles duplicate file paths gracefully

## 🎨 Schema Design Principles

### Timestamp Handling
```typescript
// Drizzle timestamp mode for proper Date object handling
createdAt: integer('created_at', { mode: 'timestamp' }).notNull()

// SQLite function defaults for server-side timestamps
.default(sql`(strftime('%s', 'now'))`)
```

### Foreign Key Strategy
```typescript
// Cascade deletion: removing folder removes its photos
folderId: integer('folder_id').references(() => folders.id, { onDelete: 'cascade' })
```

### Optional vs Required Fields
- **Required**: Core file metadata (path, size, dimensions)
- **Optional**: EXIF data that may not exist (title, GPS coordinates)
- **Flexible**: Settings stored as JSON for schema-less configuration

## 🔍 Query Patterns (Future Implementation)

### Common Queries
```typescript
// Timeline view (chronological order)
SELECT * FROM photos ORDER BY created_at DESC

// Folder filtering
SELECT * FROM photos WHERE folder_id = ?

// GPS-enabled photos for map view
SELECT * FROM photos WHERE latitude IS NOT NULL AND longitude IS NOT NULL

// Tag filtering (join with photo_tags)
SELECT p.* FROM photos p 
JOIN photo_tags pt ON p.id = pt.photo_id
JOIN tags t ON pt.tag_id = t.id  
WHERE t.name = ?
```

### Search Optimization
```typescript
// Full-text search preparation (future)
CREATE VIRTUAL TABLE photos_fts USING fts5(title, description, file_name)

// Vector search for AI features (future)
SELECT * FROM vss_search('photos_embedding', ?, 10)
```

## 🚀 Performance Considerations

### Index Strategy
- **Unique Indexes**: `file_path`, `folder.path` prevent duplicates
- **Foreign Key Indexes**: Automatic indexing on referenced columns
- **Query Indexes**: Added based on common query patterns

### Type Safety Benefits
- **Compile-time Validation**: Catch schema mismatches before runtime
- **Autocomplete**: Full IDE support for database operations
- **Refactoring Safety**: Schema changes propagate through TypeScript

## 🔮 Future Enhancements

### AI/ML Schema Extensions
```typescript
// Planned additions for AI features
const photos = sqliteTable('photos', {
  // ... existing fields
  embedding: blob('embedding'),           // CLIP vector embeddings
  thumbnailJpg: blob('thumbnail_jpg'),   // Cached thumbnail data
  aiTags: text('ai_tags'),               // JSON array of AI-generated tags
  faceEmbeddings: text('face_embeddings'), // JSON array of face data
})
```

### Advanced Relationships
```typescript
// People/faces table for face recognition
const people = sqliteTable('people', {
  id: integer('id').primaryKey(),
  name: text('name'),
  faceEmbedding: blob('face_embedding'),
})

// Albums for manual photo organization
const albums = sqliteTable('albums', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
})
```

### Performance Tables
```typescript
// Materialized views for complex queries
const photoStats = sqliteTable('photo_stats', {
  folderId: integer('folder_id').primaryKey(),
  photoCount: integer('photo_count'),
  totalSize: integer('total_size'),
  lastUpdated: integer('last_updated', { mode: 'timestamp' }),
})
```

## 🛠️ Development Workflow

### Schema Changes Process
1. **Modify** `schema.ts` with new tables/columns
2. **Update** `types.ts` if new types needed
3. **Generate** migration: `npm run db:generate`
4. **Review** generated SQL in `/drizzle/` directory
5. **Apply** migration: `npm run db:migrate`
6. **Update** Rust/TypeScript code using new schema

### Type Safety Validation
```typescript
// Example of type safety in action
const photo: Photo = {
  id: 1,
  filePath: '/path/to/image.jpg',
  // TypeScript error: missing required fields
}
// ❌ Property 'fileName' is missing in type
```

## 🔒 Security Considerations

### SQL Injection Prevention
- **Parameterized Queries**: Drizzle automatically handles parameter binding
- **Type Validation**: TypeScript prevents many common errors
- **Input Sanitization**: File paths validated before database operations

### Data Integrity
- **Foreign Key Constraints**: Maintain referential integrity
- **Unique Constraints**: Prevent duplicate data
- **NOT NULL Constraints**: Ensure required data exists