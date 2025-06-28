# Better Gallery – Technical Architecture (MVP)

```mermaid
flowchart TB
  subgraph Front‑End (Renderer)
    A1[React + Vite + TypeScript] -->|IPC| B1(Tauri Core)
  end
  subgraph Native Core
    B1 -->|plugin‑fs: read/write<br/>plugin‑path: appData| B2[SQLite (DB)]
    B1 -->|plugin‑shell: spawn| C1(Node Sidecar Binary)
  end
  subgraph Node Sidecar
    C1 --> C2{Workers}
    C2 -->|Exif read/write| W1[ExifTool‑vendored]
    C2 -->|Embeddings| W2[ONNX Runtime]
    C2 -->|Thumbs| W3[Sharp]
  end
  B2 -.-> Front‑End
```

### 1. Process model

| Process        | Tech                               | Role                                                    |
| -------------- | ---------------------------------- | ------------------------------------------------------- |
| **Renderer**   | React 18, Vite, TS                 | UI, state management (`zustand`), calls Tauri commands. |
| **Tauri Core** | Rust 1.80, `@tauri-apps/*` plugins | Secure IPC; owns the SQLite handle; watches folders.    |
| **Sidecar**    | Node 20 binary packaged by `pkg`   | Heavy lifting: EXIF I/O, embeddings, thumbnails.        |

### 2. File & folder layout

```
glorified-gallery/
├─ src/                     React UI
│   └─ components/, hooks/, pages/
├─ src-tauri/               Rust wrapper
│   ├─ main.rs
│   ├─ bin/gg-sidecar*      ← compiled sidecar exe
│   └─ tauri.conf.json
├─ sidecars/                TypeScript source for sidecar
│   └─ index.ts
├─ src/db/                  Drizzle schema & helpers
│   ├─ schema.ts
│   └─ index.ts
├─ drizzle/                 SQL migrations auto‑generated
└─ docs/                    Project docs
```

### 3. Data flow (scan → search)

1. **Folder Scan**
   Renderer calls `tauri://cmd scanFolder(path)`.
   Tauri spawns sidecar with `--scan <path> --db <appData>/gallery.db`.
   Sidecar enumerates files, extracts EXIF, creates thumbnails, embeds CLIP vectors, writes rows into SQLite.

2. **Real‑time progress**
   Sidecar writes JSON lines to `stdout`; Tauri relays them to the UI via an `Event`.

3. **Semantic Search**
   UI embeds the query (`onnxruntime-node` in sidecar), calls `tauri://cmd searchVector(vec)`.
   Tauri executes `SELECT * FROM vss_search('photos_vss', ?, 64)` and returns `photo_id`s.
   UI renders thumbnails already cached in DB; full‑res image is loaded from the original path on demand.

### 4. Key conventions & paths

| Item                  | Path / Value                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| **DB file**           | `{appDataDir}/gallery.db`                                              |
| **Thumbnails**        | Stored as JPEG blobs in the `thumbnail_jpg` column (≈ 12 kB each).     |
| **CLIP model**        | Bundled ONNX in `resources/models/clip‑vit‑b32.onnx`.                  |
| **Sidecar CLI flags** | `--scan`, `--embed <file>`, `--rename --pattern <fmt>`, `--db <path>`. |
