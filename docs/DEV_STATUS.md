# Development Status – July 2025

## Completed (Phase 0 – Foundations)

- Monorepo scaffold (Bun + Cargo workspaces)
- Continuous integration (Rust tests, Vitest, lint)
- Baseline Tauri shell compiling for macOS
- SQLite schema with Drizzle migrations, embedded in Rust
- Side-car TypeScript CLI for folder scanning & EXIF ingest
- React renderer with TanStack Router/Query
- Sidebar navigation shell
- Folder manager modal (add / remove)
- Automatic per-folder scans with live toasts
- Gallery grid displaying thumbnails

## In Progress (Phase 1 – Universal Metadata Engine)

- Thumbnail generation (Sharp) – _todo_
- CLIP embedding & semantic search – _todo_
- File-system watcher – _designing_

## Next Steps

1. Integrate Sharp thumbnail pipeline in side-car.
2. Store thumbnail blobs in DB and serve via `convertFileSrc`.
3. Implement background watcher to trigger incremental scans.
4. Begin inspector sidebar for photo metadata editing.
