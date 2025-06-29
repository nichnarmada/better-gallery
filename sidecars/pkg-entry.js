#!/usr/bin/env node

// This wrapper ensures better-sqlite3 native binding is found when running inside a pkg snapshot.
if (process.pkg) {
  const path = require('node:path')
  // Place the native binary right next to the executable during packaging and point the env var to it.
  process.env.BETTER_SQLITE3_BINARY = path.join(path.dirname(process.execPath), 'better_sqlite3.node')
}

require('./index.ts')
