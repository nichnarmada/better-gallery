import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  // driver: "better-sqlite3",
  dbCredentials: {
    url: './drizzle/gallery.db',
  },
  verbose: true,
  strict: true,
})
