#!/usr/bin/env node
/* eslint-disable no-console */

import { argv } from 'process'
import path from 'node:path'
import fs from 'node:fs/promises'

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
 * Main entry point for the sidecar process.
 */
async function main() {
  if (has('--scan')) {
    const folder = getValue('--scan')
    if (!folder) {
      console.error('Error: --scan flag requires a folder path argument.')
      process.exit(1)
    }

    console.log(`Scanning folder: ${folder}`)
    for await (const imagePath of scanForImages(folder)) {
      console.log(imagePath)
    }
    console.log('Scan complete.')
  } else {
    console.log('No command specified. Use --scan <folder_path>')
  }
}

main().catch(console.error)
