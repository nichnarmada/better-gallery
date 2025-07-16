# Tauri Backend (Rust) - `/src-tauri/`

## 🎯 Purpose
Rust-based Tauri backend providing secure IPC, SQLite operations, and system-level functionality. Acts as the bridge between the React frontend and the Node.js sidecar.

## 📁 Directory Structure
```
src-tauri/
├── src/
│   ├── main.rs          # Entry point
│   └── lib.rs           # Core application logic and Tauri commands
├── bin/                 # Compiled sidecar binaries
│   └── gg-sidecar*     # Platform-specific sidecar executables
├── capabilities/        # Tauri security permissions
├── icons/              # Application icons for all platforms
├── Cargo.toml          # Rust dependencies and build config
├── tauri.conf.json     # Tauri application configuration
└── build.rs            # Build script
```

## 🔧 Core Architecture

### Command Pattern
All frontend-backend communication uses Tauri's command system:
```rust
#[tauri::command]
async fn command_name(param: Type) -> Result<ReturnType, String>
```

### Database Strategy
- **SQLite** with embedded migrations for portability
- **Migrations** embedded at compile-time using `include_str!`
- **Schema evolution** handled through manual migration checks
- **Database location**: `{appDataDir}/gallery.db`

## 🛠️ Key Components

### `lib.rs` - Main Application Logic

#### Database Management
```rust
fn ensure_db_initialized(db_path: &Path) -> Result<(), String>
```
- Creates database if it doesn't exist
- Applies embedded migration SQL
- Ensures required tables and columns exist
- Handles schema evolution (e.g., adding `folder_id` column)

#### Sidecar Process Management
```rust
fn sidecar_command(folder_path: &str, db_path: &str) -> (String, Vec<String>)
```
- **Development mode**: Uses `npx tsx` to run TypeScript directly
- **Production mode**: Uses compiled binary from `/bin/`
- **Platform detection**: Selects correct binary for macOS (ARM64/x64), Windows, Linux
- **Fallback strategy**: Falls back to TypeScript if binary missing

### 📡 Tauri Commands

#### Folder Operations
- `add_folder(folderPath: string) -> i64` - Adds folder to watch list
- `list_folders() -> Vec<Folder>` - Returns all watched folders  
- `remove_folder(folderId: i64) -> ()` - Removes folder from watch list

#### Photo Operations
- `get_all_photos() -> Vec<Photo>` - Returns all indexed photos
- `scan_folder(folderPath: string) -> string` - Triggers sidecar scan
- `refresh_library(folderPath: string) -> ()` - Clears and re-scans folder

#### Utility
- `greet(name: string) -> string` - Demo command (can be removed)

## 🔄 Data Flow Patterns

### Folder Scanning Process
1. Frontend calls `scan_folder` command
2. Rust ensures database is initialized
3. Creates/finds folder record in SQLite
4. Spawns sidecar process with arguments:
   - `--scan <folder_path>`
   - `--db <db_path>`
   - `--folder-id <id>`
5. Streams sidecar output to frontend via events
6. Sidecar writes directly to SQLite database

### Real-time Communication
```rust
// Event emission to frontend
window.emit("scan-update", &line_str).unwrap();
```
- Sidecar stdout/stderr streamed to frontend
- JSON-formatted progress messages
- Error handling with structured error types

## 🔐 Security Configuration

### File System Access
```json
{
  "assetProtocol": {
    "enable": true,
    "scope": {
      "allow": ["$HOME/**/*", "$APPDATA/**/*"],
      "requireLiteralLeadingDot": false
    }
  }
}
```

### Plugin Usage
- `tauri-plugin-fs` - File system operations
- `tauri-plugin-shell` - Sidecar process spawning  
- `tauri-plugin-dialog` - File/folder selection dialogs
- `tauri-plugin-opener` - Open files in default applications

## 💾 Database Schema Evolution

### Migration Strategy
1. **Embedded SQL**: Migration files included at compile-time
2. **Table Existence Checks**: Queries `sqlite_master` to detect missing tables
3. **Column Addition**: Dynamic ALTER TABLE for new columns
4. **Index Creation**: Ensures unique constraints and performance indexes

### Current Schema
```sql
-- Core tables
photos (id, file_path, file_name, file_size, width, height, created_at, ...)
folders (id, path, added_at)
tags (id, name)
photo_tags (photo_id, tag_id)
settings (id, json)
```

## 🔧 Build Configuration

### Cargo.toml Dependencies
- `tauri` - Core framework with asset protocol
- `rusqlite` - SQLite with bundled library
- `serde/serde_json` - Serialization for IPC
- Platform-specific Tauri plugins

### External Binary Bundling
```json
{
  "bundle": {
    "externalBin": ["bin/gg-sidecar*"]
  }
}
```

## 🐛 Error Handling

### Error Types
- **Database errors**: Connection, query, migration failures
- **File system errors**: Path resolution, permission issues  
- **Sidecar errors**: Process spawning, communication failures
- **Serialization errors**: JSON parsing, type conversion

### Error Propagation
```rust
// Consistent error handling pattern
.map_err(|e| {
    log!("Operation failed: {}", e);
    e.to_string()
})
```

## 📊 Logging Strategy
```rust
macro_rules! log {
    ($($t:tt)*) => {
        println!("[better-gallery] {}", format!( $($t)* ));
    };
}
```

## 🚀 Performance Considerations
- **Database connection reuse** within command scope
- **Lazy database initialization** only when needed
- **Streaming output** from sidecar to prevent blocking
- **Platform-specific binary selection** for optimal performance

## 🔮 Future Enhancements
- Connection pooling for high-frequency database operations
- Incremental folder watching with file system events
- Background job queue for long-running operations
- Enhanced error recovery and retry mechanisms