# Better Gallery - Project Overview

## 🎯 Project Purpose
**Better Gallery** is a cross-platform desktop photo gallery application that serves as a **privacy-focused, local alternative to cloud photo services** like Google Photos or iCloud Photos. All processing happens on your local machine - no cloud, no privacy concerns, no subscription fees.

## 🏗️ High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Tauri Core    │    │   Node Sidecar  │
│   (React/TS)    │◄──►│   (Rust)        │◄──►│   (AI/ML Tasks) │
│   - UI/UX       │    │   - IPC Handler │    │   - EXIF Extract│
│   - State Mgmt  │    │   - SQLite Ops  │    │   - AI Models   │
│   - Routing     │    │   - File System │    │   - Thumbnails  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   SQLite DB     │
                       │   (Drizzle ORM) │
                       │   - Photos      │
                       │   - Folders     │
                       │   - Tags/Meta   │
                       └─────────────────┘
```

## 📂 Directory Structure
- **`/src/`** - React frontend (UI components, screens, hooks)
- **`/src-tauri/`** - Rust backend (Tauri commands, SQLite operations)
- **`/sidecars/`** - Node.js sidecar (AI/ML processing, EXIF extraction)
- **`/drizzle/`** - Database migrations and SQLite file
- **`/src/db/`** - Database schema and TypeScript types
- **`/docs/`** - Technical documentation and roadmap

## 🔄 Current Development Status (v0.1.0)

### ✅ Working Features
- Basic photo gallery with grid view
- Folder management (add/remove watched directories)
- Automatic photo scanning and EXIF metadata extraction
- Real-time progress updates during scanning
- Dark/light theme support
- SQLite database with folder/photo relationships

### 🚧 In Development
- Semantic search using CLIP embeddings
- AI-powered auto-tagging
- Timeline and map views

### ⏳ Planned Features
- Face detection and people clustering
- Metadata editor with bulk operations
- File system watching
- Similar image search
- Export/import functionality

## 🔗 Key Data Flow
1. **User adds folder** → Rust backend stores in SQLite
2. **Scanning triggered** → Rust spawns Node.js sidecar
3. **Sidecar processes images** → Extracts EXIF, creates thumbnails, generates AI embeddings
4. **Results stored** → SQLite database via Drizzle ORM
5. **UI updates** → React components query and display photos

## 🔧 Tech Stack
- **Frontend**: React 18, TypeScript, Vite, TanStack Router/Query, Radix UI, Tailwind CSS
- **Backend**: Rust, Tauri v2, SQLite, Rusqlite
- **Sidecar**: Node.js 20, ExifTool, Sharp, ONNX Runtime
- **Database**: SQLite with Drizzle ORM, vector search extensions
- **Build**: Bun, pkg for sidecar binary compilation

## 🎨 UI Framework
- **Design System**: Radix UI primitives + custom components
- **Styling**: Tailwind CSS with dark/light theme support
- **Layout**: Sidebar navigation with main content area
- **State**: Zustand for global state, TanStack Query for server state

## 🔒 Privacy & Security
- **100% Local Processing**: No network calls, all AI models run locally
- **User Data Control**: Photos never leave your machine
- **Optional Encryption**: AES-256 for sensitive data (planned)
- **File System Permissions**: Tauri's secure file access model

## 🚀 Getting Started
```bash
# Install dependencies
bun install

# Build sidecar binary
bun run sidecar:build

# Run development server
bun run dev

# Build for production
bun run build
```

## 📋 Key Commands
- `npm run sidecar:build` - Compile Node.js sidecar to native binary
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Apply database migrations
- `npm run lint` - Format code with Prettier