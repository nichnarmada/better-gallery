import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  // driver: "better-sqlite3",
  dbCredentials: {
    url: process.env.DB_FILE_NAME ?? 'file:gallery.db',
  },
})
