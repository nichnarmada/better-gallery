# Node.js Sidecar - `/sidecars/`

## 🎯 Purpose
Node.js-based sidecar process that handles computationally intensive tasks including AI/ML operations, EXIF metadata extraction, and image processing. Runs as a separate process spawned by the Rust backend.

## 📁 Directory Structure
```
sidecars/
├── index.ts          # Main sidecar application logic
└── pkg-entry.js      # Entry point wrapper for pkg compilation
```

## 🏗️ Architecture Strategy

### Why a Node.js Sidecar?
- **Rich Ecosystem**: Access to mature libraries (ExifTool, Sharp, ONNX Runtime)
- **AI/ML Support**: Better ML model ecosystem than Rust (for now)
- **Process Isolation**: Heavy processing doesn't block main UI
- **Binary Compilation**: Uses `pkg` to create standalone executables

### Execution Modes
1. **Development**: Runs TypeScript directly via `npx tsx`
2. **Production**: Uses compiled binary from `/src-tauri/bin/`
3. **Fallback**: Falls back to TypeScript if binary missing

## 🔧 Core Functionality

### `index.ts` - Main Application

#### CLI Interface
```bash
# Scan folder for images
--scan <folder_path> --db <db_path> --folder-id <id>
```

#### Image Processing Pipeline
1. **Directory Traversal**: Recursively scans folders for image files
2. **File Filtering**: Supports `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.heic`, `.avif`
3. **EXIF Extraction**: Uses `exiftool-vendored` for comprehensive metadata
4. **Database Storage**: Direct SQLite writes via Drizzle ORM
5. **Progress Reporting**: JSON-formatted stdout messages

### Key Functions

#### `scanForImages(dirPath: string)`
- Recursive async generator for file discovery
- Filters by supported image extensions
- Error handling for permission issues

#### `processImage(filePath, db, folderId)`
- EXIF metadata extraction with ExifTool
- File stat collection (size, timestamps)
- Database insertion with conflict resolution
- Progress reporting to parent process

#### `getBestDate(tags)` 
- Smart date parsing from EXIF data
- Priority: `DateTimeOriginal` > `CreateDate` > `FileModifyDate`
- Handles ExifDateTime objects properly

## 📊 Data Extraction

### EXIF Metadata Fields
```typescript
{
  filePath: string,           // Canonicalized file path
  fileName: string,           // Base filename  
  fileSize: number,           // File size in bytes
  width: number,              // Image width in pixels
  height: number,             // Image height in pixels
  createdAt: Date,            // Best available creation date
  title?: string,             // EXIF Title field
  description?: string,       // EXIF Description field
  cameraModel?: string,       // Camera model from EXIF
  latitude?: number,          // GPS latitude (if available)
  longitude?: number,         // GPS longitude (if available)
  folderId: number           // Parent folder reference
}
```

### Path Canonicalization
- Uses `fs.realpath()` to resolve symlinks
- macOS: Converts to lowercase for case-insensitive matching
- Prevents duplicate entries from different path representations

## 🔄 Communication Protocol

### Input (CLI Arguments)
```bash
gg-sidecar --scan "/path/to/photos" --db "/path/to/db" --folder-id 1
```

### Output (JSON Lines to stdout)
```json
{"type": "start", "folder": "/path/to/photos"}
{"type": "progress", "path": "/path/to/image.jpg"}
{"type": "done", "total": 42}
{"type": "error", "message": "Error description", "path": "/problematic/file.jpg"}
```

### Error Handling
- Structured error messages as JSON
- Individual file errors don't stop the entire process
- Graceful ExifTool cleanup on exit

## 📦 Binary Compilation

### `pkg-entry.js` 
- Wrapper for pkg compilation compatibility
- Handles `better-sqlite3` native binary resolution
- Sets `BETTER_SQLITE3_BINARY` environment variable for bundled binary

### Build Process
```bash
# Bundle TypeScript to CommonJS
bunx esbuild sidecars/pkg-entry.js --bundle --platform=node --format=cjs --outfile=sidecar.dist.js

# Compile to native binaries  
bunx @yao-pkg/pkg sidecar.dist.js --targets node20-macos-arm64,node20-macos-x64,node20-win-x64

# Copy with platform-specific names
cp gg-sidecar-macos-arm64 gg-sidecar-aarch64-apple-darwin
```

## 🧰 Dependencies

### Core Libraries
- `better-sqlite3` - Direct SQLite database access
- `drizzle-orm` - Type-safe database operations
- `exiftool-vendored` - Comprehensive EXIF metadata extraction

### Utility Libraries  
- `node:fs/promises` - Async file system operations
- `node:path` - Path manipulation utilities

## 🔮 Future AI/ML Integration

### Current Architecture Ready For:
- **CLIP Embeddings**: `onnxruntime-node` for semantic search
- **Image Classification**: MobileNet or similar models
- **Face Detection**: YOLO-based face recognition
- **Thumbnail Generation**: Sharp for optimized thumbnails

### Planned Enhancements
```typescript
// Future AI pipeline functions
async function generateEmbedding(imagePath: string): Promise<Float32Array>
async function classifyImage(imagePath: string): Promise<string[]>
async function detectFaces(imagePath: string): Promise<BoundingBox[]>
async function generateThumbnail(imagePath: string): Promise<Buffer>
```

## ⚡ Performance Considerations

### Optimization Strategies
- **Streaming Processing**: Processes images one at a time to avoid memory issues
- **Error Isolation**: Individual file failures don't affect other files
- **Database Batching**: Uses conflict resolution to handle duplicates efficiently
- **Process Isolation**: Heavy work doesn't block main application

### Resource Management
- **ExifTool Cleanup**: Properly closes ExifTool process on exit
- **Memory Efficiency**: Async generators prevent loading all files into memory
- **Database Connections**: Single connection per process run

## 🐛 Error Scenarios

### Handled Error Types
- **Permission Errors**: Graceful handling of inaccessible directories
- **Corrupt Images**: ExifTool errors logged but don't stop processing
- **Database Conflicts**: Duplicate file paths handled with `onConflictDoNothing`
- **Invalid EXIF**: Fallback date strategies when EXIF is missing/corrupt

### Debug Information
- **Structured Logging**: JSON format for easy parsing by parent process
- **File-level Errors**: Specific error messages with file paths
- **Process Exit**: Proper cleanup and exit codes

## 🔧 Development Workflow

### Local Development
```bash
# Run directly with tsx for development  
npx tsx sidecars/index.ts --scan "/path" --db "db.sqlite" --folder-id 1

# Build and test binary
bun run sidecar:build
./src-tauri/bin/gg-sidecar-macos-arm64 --scan "/path" --db "db.sqlite" --folder-id 1
```

### Testing Strategy
- **Unit Tests**: Test individual functions (file filtering, date parsing)
- **Integration Tests**: Test full scan workflow with sample images
- **Binary Tests**: Verify compiled binaries work on target platforms