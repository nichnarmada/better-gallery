import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), tailwindcss()],
  base: './', // Enable relative paths for Tauri asset protocol
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/drizzle/*': path.resolve(__dirname, './drizzle/*'),
      '@/sidecars/*': path.resolve(__dirname, './sidecars/*'),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  build: {
    // Platform-specific targets for Tauri webview compatibility
    target: process.env.TAURI_ENV_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    minify: (!process.env.TAURI_ENV_DEBUG ? 'esbuild' : false) as boolean | 'esbuild' | 'terser',
    // Remove external dependencies that can break bundling in Tauri
    rollupOptions: {},
  },
}))
