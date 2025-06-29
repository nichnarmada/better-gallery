#!/usr/bin/env node
/* eslint-disable no-console */

import { argv } from 'process'
import path from 'node:path'
import fs from 'node:fs/promises'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { exiftool, ExifDateTime } from 'exiftool-vendored'
import * as schema from '../src/db/schema'
import { Photo, NewPhoto } from '../src/db/types'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic', '.avif'])

/**
 * Very basic CLI flag parsing.
 * @param flag The flag to check for, e.g., "--scan"
 */
function has(flag: string): boolean {
  return argv.includes(flag)
}

/**
 * Gets the value for a flag, e.g., for "--scan /path/to/photos", returns "/path/to/photos".
 * @param flag The flag whose value to get.
 */
function getValue(flag: string): string | undefined {
  const index = argv.indexOf(flag)
  if (index > -1 && argv.length > index + 1) {
    return argv[index + 1]
  }
  return undefined
}

/**
 * Recursively scans a folder and yields the full path of all image files found.
 * @param dirPath The absolute path of the directory to scan.
 */
async function* scanForImages(dirPath: string): AsyncGenerator<string> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        yield* scanForImages(fullPath)
      } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        yield fullPath
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }
}

/**
 * Date Helper function to safely parse date from Exif tags
 * @param tags The Exif tags object
 */
function getBestDate(tags: any): Date {
  const dt = tags.DateTimeOriginal || tags.CreateDate
  if (dt instanceof ExifDateTime) {
    return dt.toDate()
  }
  return new Date(tags.FileModifyDate)
}

function safeParseFloat(value: any): number | null {
  if (value === null || value === undefined) {
    return null
  }
  const num = Number.parseFloat(value)
  return Number.isNaN(num) ? null : num
}

// Helper to canonicalize file path and normalize case (macOS insensitive)
async function canonicalPath(filePath: string): Promise<string> {
  const resolved = await fs.realpath(filePath)
  if (process.platform === 'darwin') return resolved.toLowerCase()
  return resolved
}

async function processImage(filePath: string, db: ReturnType<typeof drizzle>, folderId: number): Promise<void> {
  try {
    const [meta, stats] = await Promise.all([exiftool.read(filePath), fs.stat(filePath)])

    const canonical = await canonicalPath(filePath)

    const newPhoto: NewPhoto = {
      filePath: canonical,
      fileName: path.basename(filePath),
      fileSize: stats.size,
      width: meta.ImageWidth ?? 0,
      height: meta.ImageHeight ?? 0,
      createdAt: getBestDate(meta),
      folderId,
      title: meta.Title,
      description: meta.Description,
      cameraModel: meta.Model,
      latitude: safeParseFloat(meta.GPSLatitude),
      longitude: safeParseFloat(meta.GPSLongitude),
    }

    await db.insert(schema.photos).values(newPhoto).onConflictDoNothing().run()

    console.log(JSON.stringify({ type: 'progress', path: filePath }))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred'
    console.error(JSON.stringify({ type: 'error', path: filePath, message }))
  }
}

/**
 * Main entry point for the sidecar process.
 */
async function main() {
  if (has('--scan')) {
    const folder = getValue('--scan')
    const dbPath = getValue('--db')

    if (!folder || !dbPath) {
      console.error('Error: --scan and --db flags are required.')
      process.exit(1)
    }

    const sqlite = new Database(dbPath)
    const db = drizzle(sqlite, { schema })

    console.log(JSON.stringify({ type: 'start', folder }))

    const allImagePaths = []
    for await (const imagePath of scanForImages(folder)) {
      allImagePaths.push(imagePath)
    }

    const folderIdArg = parseInt(getValue('--folder-id') ?? '0', 10)
    if (Number.isNaN(folderIdArg) || folderIdArg <= 0) {
      console.error(JSON.stringify({ type: 'error', message: 'Invalid or missing --folder-id' }))
      process.exit(1)
    }

    for (const imagePath of allImagePaths) {
      await processImage(imagePath, db, folderIdArg)
    }

    await exiftool.end()
    console.log(JSON.stringify({ type: 'done', total: allImagePaths.length }))
  } else {
    console.log('No command specified. Use --scan <folder_path> --db <db_path>')
  }
}

main().catch(e => {
  const message = e instanceof Error ? e.message : 'An unknown error occurred'
  console.error(JSON.stringify({ type: 'error', message }))
  exiftool.end()
})
