# Development Roadmap

## Milestone 0 – Project Bootstrap (1 day)

- [x] Vite + Tauri scaffold
- [x] Drizzle config (`better-sqlite3`)
- [x] Sidecar skeleton compiles via `yao-pkg/pkg`

## Milestone 1 – Core Catalogue (1 week)

- [ ] Folder picker UI
- [ ] Recursive scan + EXIF ingest
- [ ] SQLite schema & migrations
- [ ] Thumbnail generation & caching
- [ ] Infinite grid (react‑window)

## Milestone 2 – Metadata & Autosort (1 week)

- [ ] Sort / group by date
- [ ] Facet sidebar MVP (camera, year)
- [ ] Bulk metadata edit dialog
- [ ] Undo stack for DB ops

## Milestone 3 – AI Search (2 weeks)

- [ ] Bundle CLIP‑ViT‑B/32 ONNX
- [ ] Vector‑table migration (`sqlite‑vss`)
- [ ] Query‑embedding path
- [ ] Search bar with live suggestions
- [ ] Highlight similarity score overlay

## Milestone 4 – Tagging & Albums (1 week)

- [ ] Tag pill component (add/remove)
- [ ] Album shelf with drag‑drop
- [ ] `photo_tags`, `album_items` tables
- [ ] Export/Import sidecar JSON

## Milestone 5 – Polishing & Distribution (1 week)

- [ ] Settings screen (theme, grid size)
- [ ] Auto‑update (Tauri updater)
- [ ] Code‑sign & notarise macOS
- [ ] Create installer MSI

## Icebox – Post‑1.0 Ideas

- Supabase sync adapter
- Mobile companion app (Flutter)
- Face clustering
- RAW file preview via wasm‑libraw

````

---

### How to use these docs

1. Commit them under `docs/`.
2. Add a **Table of Contents** to the root `README.md`:

```md
- [Architecture](docs/ARCHITECTURE.md)
- [Feature Catalogue](docs/FEATURES.md)
- [Roadmap](docs/ROADMAP.md)
```

3. Point your AI assistant at any of these files when you need code generation or planning help (“Implement Feature #4 from FEATURES.md”).

That should remove the last ambiguity for you, future contributors, and any AI pair‑programmer.
````
