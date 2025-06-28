import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import path from "node:path"
import { appDataDir } from "@tauri-apps/api/path"

const appDataPath = await appDataDir() // returns an absolute path with trailing slash

const sqlite = new Database(path.join(appDataPath, "gallery.db"))
export const db = drizzle(sqlite)
