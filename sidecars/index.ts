#!/usr/bin/env node
/* eslint-disable no-console */

import { exiftool } from "exiftool-vendored"
import ort from "onnxruntime-node"
import sharp from "sharp"
import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { photos, tags, photoTags } from "../src/db/schema" // <- path fixed
import { argv } from "process"
import path from "node:path"
import fs from "node:fs"

//
// -----------------------------------------------------------------------------
// 1. CLI flag parsing (very light; switch to yargs/commander if you prefer)
// -----------------------------------------------------------------------------
const flags = new Set(argv.slice(2)) // e.g. ["--scan", "/Users/me/Pics"]

function has(flag: string) {
  return flags.has(flag)
}

const dbDir = flags.has("--db") ? argv[argv.indexOf("--db") + 1] : process.cwd()
const dbFile = path.join(dbDir, "gallery.db")
fs.mkdirSync(dbDir, { recursive: true })

//
// -----------------------------------------------------------------------------
// 2. DB handle (Drizzle + better‑sqlite3)
// -----------------------------------------------------------------------------
const sqlite = new Database(dbFile)
export const db = drizzle(sqlite, { schema: { photos, tags, photoTags } })

//
// -----------------------------------------------------------------------------
// 3. Worker helpers (scan, embed, rename…) –– STUBS
// -----------------------------------------------------------------------------
async function scanFolder(folderPath: string) {
  const files = fs.readdirSync(folderPath, { withFileTypes: true })
  let done = 0
  for (const file of files) {
    if (file.isDirectory()) continue // recurse later
    const fullPath = path.join(folderPath, file.name)

    // EXIF
    const meta = await exiftool.read(fullPath)

    // Thumbnail
    const thumb = await sharp(fullPath)
      .resize(320)
      .jpeg({ quality: 70 })
      .toBuffer()

    // TODO: Embeddings with ONNX Runtime here

    db.insert(photos)
      .values({
        path: fullPath,
        captureDate: meta.DateTimeOriginal ?? null,
        cameraMake: meta.Make ?? null,
        cameraModel: meta.Model ?? null,
        thumbnailJpg: thumb,
      })
      .run()

    // Progress event
    done += 1
    console.log(
      JSON.stringify({ event: "progress", done, total: files.length })
    )
  }
  console.log(JSON.stringify({ event: "done", folder: folderPath }))
}

//
// -----------------------------------------------------------------------------
// 4. Entry point
// -----------------------------------------------------------------------------
;(async () => {
  if (has("--scan")) {
    const folder = argv[argv.indexOf("--scan") + 1]
    await scanFolder(folder)
  }
  // else‑if other commands ( --embed, --rename … )
  await exiftool.end() // tidy up
})()
