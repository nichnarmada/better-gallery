# Database & Migrations - `/drizzle/`

## 🎯 Purpose
Contains SQLite database file and auto-generated migration files. This directory represents the "source of truth" for the database schema and its evolution over time.

## 📁 Directory Structure
```
drizzle/
├── gallery.db                           # SQLite database file
├── 0000_productive_madelyne_pryor.sql   # Initial migration (core tables)
├── 0001_striped_arclight.sql           # Added unique index on file_path  
├── 0002_productive_james_howlett.sql    # Added folders table and relationships
├── meta/                               # Migration metadata
│   ├── _journal.json                   # Migration history tracking
│   ├── 0000_snapshot.json             # Schema snapshot for migration 0000
│   ├── 0001_snapshot.json             # Schema snapshot for migration 0001
│   └── 0002_snapshot.json             # Schema snapshot for migration 0002
```

## 🗃️ Database Schema Evolution

### Migration 0000: Core Foundation
**File**: `0000_productive_madelyne_pryor.sql`

Core tables for photo gallery functionality:
```sql
-- Photos table with comprehensive metadata
CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL, 
  file_size INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  created_at INTEGER NOT NULL,           -- Photo creation timestamp
  imported_at INTEGER DEFAULT (strftime('%s', 'now')),
  title TEXT,                           -- EXIF title field
  description TEXT,                     -- EXIF description
  camera_model TEXT,                    -- Camera model from EXIF
  latitude REAL,                        -- GPS latitude
  longitude REAL                        -- GPS longitude
);

-- Tag system for photo organization
CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE
);

-- Many-to-many relationship between photos and tags
CREATE TABLE photo_tags (
  photo_id INTEGER REFERENCES photos(id),
  tag_id INTEGER REFERENCES tags(id)
);

-- Application settings storage
CREATE TABLE settings (
  id INTEGER PRIMARY KEY,
  json TEXT                            -- JSON blob for flexible settings
);
```

### Migration 0001: Performance Optimization  
**File**: `0001_striped_arclight.sql`

Added database constraints and indexes:
```sql
-- Prevent duplicate file paths in database
CREATE UNIQUE INDEX photos_file_path_unique ON photos(file_path);
```

### Migration 0002: Folder Management
**File**: `0002_productive_james_howlett.sql`

Added folder tracking and relationships:
```sql
-- Folders table for watch list management
CREATE TABLE folders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  added_at INTEGER DEFAULT (strftime('%s', 'now'))
);
CREATE UNIQUE INDEX folders_path_unique ON folders(path);

-- Link photos to their parent folder
ALTER TABLE photos ADD folder_id INTEGER REFERENCES folders(id);
```

## 🔄 Migration Strategy

### Auto-Generation Process
```bash
# Generate new migration from schema changes
npm run db:generate

# Apply pending migrations  
npm run db:migrate
```

### Migration File Naming
- **Pattern**: `XXXX_random_marvel_character.sql`
- **Sequential**: Numbered from 0000 onwards
- **Descriptive**: Marvel character names for easy identification

### Snapshot System
Each migration includes a schema snapshot in `/meta/` for:
- **Schema Validation**: Ensuring migrations match expected schema
- **Rollback Support**: Understanding previous schema states  
- **Development Sync**: Keeping team schemas synchronized

## 💾 Database File: `gallery.db`

### Location Strategy
- **Development**: `./drizzle/gallery.db` (local to project)
- **Production**: `{appDataDir}/gallery.db` (user data directory)
- **Embedded**: Initial migration SQL embedded in Rust binary

### File Characteristics
- **SQLite Version**: 3.x with modern features
- **Size**: Grows with photo collection (metadata only, no image data)
- **Portability**: Single file can be backed up/restored easily
- **Performance**: Optimized with indexes for common queries

## 🔍 Schema Design Decisions

### Photo Storage Strategy
```sql
-- File paths stored as TEXT (not BLOB) for readability
file_path TEXT NOT NULL UNIQUE

-- Timestamps as INTEGER (Unix epoch) for consistency  
created_at INTEGER NOT NULL
imported_at INTEGER DEFAULT (strftime('%s', 'now'))

-- Optional metadata as nullable TEXT/REAL columns
title TEXT, description TEXT, camera_model TEXT
latitude REAL, longitude REAL
```

### Relationship Design
```sql
-- Folder-to-photos: One-to-many via folder_id
folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE

-- Tag-to-photos: Many-to-many via junction table
photo_tags (photo_id, tag_id)
```

### Settings Architecture
```sql
-- Flexible JSON storage for application settings
settings (id INTEGER PRIMARY KEY, json TEXT)
```

## 🚀 Performance Considerations

### Index Strategy
- **Unique Indexes**: Prevent duplicates (`file_path`, `folder.path`)
- **Query Optimization**: Indexes on commonly filtered columns
- **Foreign Keys**: Maintain referential integrity

### Query Patterns
```sql
-- Common queries optimized by current schema:
SELECT * FROM photos ORDER BY created_at DESC;        -- Timeline view
SELECT * FROM photos WHERE folder_id = ?;             -- Folder filtering  
SELECT * FROM photos WHERE latitude IS NOT NULL;      -- GPS-enabled photos
```

## 🔮 Future Schema Evolution

### Planned Additions
```sql
-- AI/ML features (future migrations)
ALTER TABLE photos ADD COLUMN embedding BLOB;         -- CLIP vectors for semantic search
ALTER TABLE photos ADD COLUMN thumbnail_jpg BLOB;     -- Cached thumbnails
ALTER TABLE photos ADD COLUMN ai_tags TEXT;           -- JSON array of AI-generated tags

-- Performance features
CREATE TABLE face_embeddings (...);                   -- Face recognition data
CREATE VIRTUAL TABLE photos_fts USING fts5(...);      -- Full-text search
```

### Vector Search Integration
- **sqlite-vss**: Vector similarity search extension
- **CLIP Embeddings**: Stored as BLOB for semantic search
- **Index Strategy**: Optimized for K-NN queries

## 🛠️ Development Workflows

### Schema Changes
1. **Modify** `src/db/schema.ts` with new tables/columns
2. **Generate** migration with `npm run db:generate`  
3. **Review** generated SQL in new migration file
4. **Apply** migration with `npm run db:migrate`
5. **Commit** both schema.ts and migration files

### Database Reset (Development)
```bash
# Remove database and regenerate from scratch
rm drizzle/gallery.db
npm run db:migrate
```

### Backup Strategy
```bash
# Backup entire database state
cp drizzle/gallery.db backups/gallery-$(date +%Y%m%d).db

# Or use SQLite backup command
sqlite3 drizzle/gallery.db ".backup backup.db"
```

## 📊 Migration Metadata

### `_journal.json` Structure
```json
{
  "version": "7",
  "dialect": "sqlite", 
  "entries": [
    {"idx": 0, "when": 1234567890, "tag": "0000_productive_madelyne_pryor"},
    {"idx": 1, "when": 1234567891, "tag": "0001_striped_arclight"},
    {"idx": 2, "when": 1234567892, "tag": "0002_productive_james_howlett"}
  ]
}
```

### Snapshot Files
- **Purpose**: Store schema state after each migration
- **Format**: JSON representation of database structure  
- **Usage**: Schema validation and development debugging