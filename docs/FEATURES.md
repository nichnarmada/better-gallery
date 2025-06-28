# Better Gallery – Feature List (Non-AI / Non-ML)

## 1. Universal Metadata Engine

- **Multi-format ingestion** – EXIF, IPTC/XMP, device-specific fields.
- **Date/Time normalization** – canonical `timestamp` column, automatic time-zone handling.
- **Geolocation resolution** – GPS → human-readable location via offline reverse-geocoder.
- **Side-car safety** – write changes to `.xmp` files to avoid altering originals.

## 2. Metadata Editor

- Inspector sidebar with editable fields (title, description, rating, keywords).
- Bulk-edit mode (apply to many photos).
- Undo history per session.

## 3. File-System Watcher

- Real-time detection of new / moved / deleted photos inside watched folders.
- Incremental database updates without manual refresh.

## 4. Core UI Views

| View                 | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| **Timeline**         | Infinite scroll grid, grouped by day / month / year.                 |
| **Map**              | World map with photo pins; click pin to filter gallery.              |
| **Albums & Folders** | Traditional tree reflecting on-disk structure plus user-made albums. |
| **Search / Filters** | Text + filter chips (date, camera, location, rating, tags).          |

## 5. Inspector Panel

- Live histogram, focal length, aperture, ISO.
- Quick-links: “Open in Finder/Explorer”, “Reveal in album”.

## 6. Onboarding & Progress

- First-run wizard for folder selection.
- Global progress bar for ingestion tasks (metadata read, thumbnail generation).

## 7. Performance & Throttling

- Background job queue with CPU/RAM limits.
- User-configurable “Pause while on battery / high CPU”.

## 8. Backup & Portability

- One-click “Export Library” (DB, thumbnails, side-cars) to ZIP.
- Import wizard to restore or merge.

## 9. Accessibility & Internationalization

- Full keyboard navigation.
- High-contrast & dark themes.
- i18n ready (English default; JSON locale bundles).

## 10. Packaging & Updates

- Windows installer (MSI/NSIS) with auto-update.
- macOS `.dmg` & Linux `.AppImage` in later milestones.
- Delta patch updates via Tauri updater.
-
