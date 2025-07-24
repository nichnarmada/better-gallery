use serde::Serialize;
use tauri::{Emitter, Manager};
use std::path::Path;
use std::fs;
use walkdir::WalkDir;
use image::ImageReader;


#[derive(Debug, Serialize, Clone)]
struct Photo {
    id: i32,
    #[serde(rename = "filePath")]
    file_path: String,
}

#[derive(Debug, Serialize, Clone)]
struct Folder {
    id: i32,
    path: String,
}

// Add simple logging macro alias for clarity
macro_rules! log {
    ($($t:tt)*) => {
        println!("[better-gallery] {}", format!( $($t)* ))
    };
}

// Embed the initial migration SQL at compile-time so we don't depend on runtime file paths.
const MIGRATION_SQL: &str = include_str!("../../drizzle/0000_productive_madelyne_pryor.sql");

// Native image scanning functions
const IMAGE_EXTENSIONS: &[&str] = &["jpg", "jpeg", "png", "webp", "gif", "heic", "avif"];

fn is_image_file(path: &Path) -> bool {
    if let Some(ext) = path.extension() {
        if let Some(ext_str) = ext.to_str() {
            let ext_lower = ext_str.to_lowercase();
            let is_image = IMAGE_EXTENSIONS.contains(&ext_lower.as_str());
            log!("File extension check: {} -> {} -> {}", path.display(), ext_lower, is_image);
            return is_image;
        }
    }
    log!("No extension found for file: {}", path.display());
    false
}

fn process_image_file(path: &Path, folder_id: i64, conn: &rusqlite::Connection) -> Result<(), String> {
    let file_path = path.to_string_lossy().to_string();
    let file_name = path.file_name().unwrap_or_default().to_string_lossy().to_string();
    
    // Get file metadata
    let metadata = fs::metadata(path).map_err(|e| format!("Failed to read file metadata: {}", e))?;
    let file_size = metadata.len() as i64;
    
    // Try to get image dimensions
    let (width, height) = match ImageReader::open(path) {
        Ok(reader) => {
            match reader.into_dimensions() {
                Ok((w, h)) => (w as i64, h as i64),
                Err(_) => (0, 0),
            }
        }
        Err(_) => (0, 0),
    };
    
    // Use file metadata for created date (can add EXIF parsing later)
    let created_at = metadata.created()
        .or_else(|_| metadata.modified())
        .unwrap_or(std::time::SystemTime::UNIX_EPOCH)
        .duration_since(std::time::SystemTime::UNIX_EPOCH)
        .unwrap_or_default().as_secs() as i64;
    
    // Insert into database
    conn.execute(
        "INSERT OR IGNORE INTO photos (file_path, file_name, file_size, width, height, created_at, folder_id) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        rusqlite::params![file_path, file_name, file_size, width, height, created_at, folder_id],
    ).map_err(|e| format!("Failed to insert photo: {}", e))?;
    
    Ok(())
}

/// Ensures the database and its tables are created.
fn ensure_db_initialized(db_path: &Path) -> Result<(), String> {
    log!("Ensuring database exists at {:?}", db_path);

    // Create parent directory if it doesn't exist
    if let Some(parent) = db_path.parent() {
        if !parent.exists() {
            log!("Creating database directory: {:?}", parent);
            fs::create_dir_all(parent).map_err(|e| {
                log!("Failed to create database directory: {}", e);
                format!("Failed to create database directory: {}", e)
            })?;
        }
    }

    // Helper to execute migration on a connection
    fn run_migration(conn: &rusqlite::Connection) -> Result<(), String> {
        log!("Executing embedded migration SQL ({} bytes)", MIGRATION_SQL.len());
        conn.execute_batch(MIGRATION_SQL).map_err(|e| {
            log!("Failed to execute migration SQL: {}", e);
            format!("Failed to execute migration SQL: {}", e)
        })?;
        Ok(())
    }

    // Open or create the database
    let conn = rusqlite::Connection::open(db_path).map_err(|e| {
        log!("Failed to open database: {}", e);
        format!("Failed to open database: {}", e)
    })?;

    // Check if tables exist by querying sqlite_master
    let table_exists: bool =
        conn.query_row(
            "SELECT EXISTS(SELECT name FROM sqlite_master WHERE type='table' AND name='photos')",
            [],
            |row| row.get(0),
        )
        .unwrap_or(false);

    if !table_exists {
        log!("Database tables do not exist, running migration");
        run_migration(&conn)?;
    } else {
        log!("Database tables already exist");
    }

    Ok(())
}

// Function removed - now using Tauri's sidecar API directly

#[tauri::command]
async fn get_all_photos(app_handle: tauri::AppHandle) -> Result<Vec<Photo>, String> {
    log!("get_all_photos called");
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| {
            log!("Failed to resolve app_data_dir path: {}", e);
            e.to_string()
        })?;
    let db_path = app_data_dir.join("gallery.db");
    log!("Resolved database path: {:?}", db_path);

    // Ensure the database and tables exist before trying to query
    ensure_db_initialized(&db_path)?;

    if !db_path.exists() {
        log!("Database file not found; returning 0 photos");
        return Ok(Vec::new());
    }

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| {
        log!("Failed to open database: {}", e);
        e.to_string()
    })?;

    let mut stmt = conn
        .prepare("SELECT id, file_path FROM photos ORDER BY created_at DESC")
        .map_err(|e| {
            log!("Failed to prepare select statement: {}", e);
            e.to_string()
        })?;

    log!("Querying photos from database");
    let photo_iter = stmt
        .query_map([], |row| {
            Ok(Photo {
                id: row.get(0)?,
                file_path: row.get(1)?,
            })
        })
        .map_err(|e| {
            log!("Failed to execute query: {}", e);
            e.to_string()
        })?;

    let mut photos = Vec::new();
    for photo_result in photo_iter {
        match photo_result {
            Ok(photo) => photos.push(photo),
            Err(e) => {
                log!("Failed to parse photo row: {}", e);
                // Continue processing other rows
            }
        }
    }

    log!("Returning {} photos", photos.len());
    photos
        .iter()
        .for_each(|p| log!("  - {}: {}", p.id, p.file_path));

    Ok(photos)
}

#[tauri::command]
async fn debug_database_status(app_handle: tauri::AppHandle) -> Result<serde_json::Value, String> {
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");

    ensure_db_initialized(&db_path)?;

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;

    let photo_count: i64 = conn
        .query_row("SELECT COUNT(*) FROM photos", [], |row| row.get(0))
        .unwrap_or(0);

    let folder_count: i64 = conn
        .query_row("SELECT COUNT(*) FROM folders", [], |row| row.get(0))
        .unwrap_or(0);

    log!("Total photos in database: {}", photo_count);
    log!("Total folders in database: {}", folder_count);

    Ok(serde_json::json!({
        "photos": photo_count,
        "folders": folder_count
    }))
}

async fn scan_folder_internal(
    window: &tauri::Window,
    app_handle: &tauri::AppHandle,
    folder_path: &str,
    folder_id: i64,
) -> Result<String, String> {
    log!(
        "scan_folder_internal called with folder_path: {} (folder_id={})",
        folder_path, folder_id
    );
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| {
            log!("Failed to resolve app_data_dir path: {}", e);
            e.to_string()
        })?;
    log!("Resolved app data dir: {:?}", app_data_dir);

    std::fs::create_dir_all(&app_data_dir).map_err(|e| {
        log!("Failed to create app_data_dir: {}", e);
        e.to_string()
    })?;

    let db_path = app_data_dir.join("gallery.db");
    log!("Database path for scanning: {:?}", db_path);

    // Ensure the database and tables exist before scanning
    ensure_db_initialized(&db_path)?;

    // Use native Rust scanning instead of sidecar
    log!("Starting native Rust image scanning");
    
    // Send start event
    let start_event = serde_json::json!({
        "type": "start",
        "folder": folder_path
    });
    window.emit("scan-update", &start_event.to_string()).unwrap();
    
    let conn = rusqlite::Connection::open(&db_path).map_err(|e| {
        log!("Failed to open database: {}", e);
        e.to_string()
    })?;
    
    let mut image_count = 0;
    
    // Walk the directory and process images
    log!("Walking directory: {}", folder_path);
    for entry in WalkDir::new(folder_path).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        log!("Found file: {} (is_file: {}, is_image: {})", path.display(), path.is_file(), is_image_file(path));
        
        if path.is_file() && is_image_file(path) {
            log!("Processing image file: {}", path.display());
            match process_image_file(path, folder_id, &conn) {
                Ok(_) => {
                    image_count += 1;
                    log!("Successfully processed image {}: {}", image_count, path.display());
                    
                    // Send progress event
                    let progress_event = serde_json::json!({
                        "type": "progress",
                        "path": path.to_string_lossy()
                    });
                    window.emit("scan-update", &progress_event.to_string()).unwrap();
                }
                Err(e) => {
                    log!("Failed to process image {}: {}", path.display(), e);
                    let error_event = serde_json::json!({
                        "type": "error", 
                        "path": path.to_string_lossy(),
                        "message": e
                    });
                    window.emit("scan-update", &error_event.to_string()).unwrap();
                }
            }
        } else if path.is_file() {
            log!("Skipping non-image file: {}", path.display());
        }
    }
    
    // Send done event
    let done_event = serde_json::json!({
        "type": "done",
        "total": image_count
    });
    window.emit("scan-update", &done_event.to_string()).unwrap();
    
    log!("Native scan completed: {} images processed", image_count);
    Ok(format!("Scanned {} images", image_count))
}

#[tauri::command]
async fn refresh_library(
    window: tauri::Window,
    app_handle: tauri::AppHandle,
    folder_path: String,
) -> Result<(), String> {
    log!("refresh_library called for folder_path: {}", folder_path);

    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");

    // Ensure DB exists
    ensure_db_initialized(&db_path)?;

    // Find folder id
    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    let folder_id: i64 = conn
        .query_row("SELECT id FROM folders WHERE path = ?1", [&folder_path], |row| row.get(0))
        .map_err(|_| "Folder not found. Please add folder first".to_string())?;

    // Clear existing photos for this folder
    conn.execute("DELETE FROM photos WHERE folder_id = ?1", [folder_id])
        .map_err(|e| format!("Failed to clear photos table: {}", e))?;

    // Remove any legacy rows inserted before folder_id existed (NULL folder_id)
    conn.execute("DELETE FROM photos WHERE folder_id IS NULL", [])
        .map_err(|e| format!("Failed to clear legacy photos: {}", e))?;
    log!("Existing photo records for folder deleted");

    // Run a fresh scan to repopulate
    scan_folder_internal(&window, &app_handle, &folder_path, folder_id).await?;

    Ok(())
}

// Public command maintaining old signature (will be deprecated once frontend updated)
#[tauri::command]
async fn scan_folder(window: tauri::Window, app_handle: tauri::AppHandle, folder_path: String) -> Result<String, String> {
    // For legacy call, ensure folder exists or create temp one.
    // create or get folder id
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");
    ensure_db_initialized(&db_path)?;

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR IGNORE INTO folders(path) VALUES (?1)",
        [ &folder_path ],
    ).map_err(|e| e.to_string())?;
    let folder_id: i64 = conn
        .query_row("SELECT id FROM folders WHERE path = ?1", [&folder_path], |row| row.get(0))
        .map_err(|e| e.to_string())?;

    scan_folder_internal(&window, &app_handle, &folder_path, folder_id).await
}

#[tauri::command]
async fn add_folder(app_handle: tauri::AppHandle, folder_path: String) -> Result<i64, String> {
    log!("add_folder called: {}", folder_path);
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");
    ensure_db_initialized(&db_path)?;

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT OR IGNORE INTO folders(path) VALUES (?1)",
        [&folder_path],
    )
    .map_err(|e| e.to_string())?;

    let folder_id = conn
        .query_row("SELECT id FROM folders WHERE path = ?1", [&folder_path], |row| {
            row.get::<_, i64>(0)
        })
        .map_err(|e| e.to_string())?;

    log!("Added folder with ID: {}", folder_id);
    Ok(folder_id)
}

#[tauri::command]
async fn list_folders(app_handle: tauri::AppHandle) -> Result<Vec<Folder>, String> {
    log!("list_folders called");
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");
    ensure_db_initialized(&db_path)?;

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    let mut stmt = conn
        .prepare("SELECT id, path FROM folders ORDER BY added_at DESC")
        .map_err(|e| e.to_string())?;

    let folder_iter = stmt
        .query_map([], |row| {
            Ok(Folder {
                id: row.get(0)?,
                path: row.get(1)?,
            })
        })
        .map_err(|e| e.to_string())?;

    let mut folders = Vec::new();
    for folder_result in folder_iter {
        folders.push(folder_result.map_err(|e| e.to_string())?);
    }

    log!("Returning {} folders", folders.len());
    Ok(folders)
}

#[tauri::command]
async fn remove_folder(app_handle: tauri::AppHandle, folder_id: i64) -> Result<(), String> {
    log!("remove_folder called: {}", folder_id);
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;
    let db_path = app_data_dir.join("gallery.db");
    ensure_db_initialized(&db_path)?;

    let conn = rusqlite::Connection::open(&db_path).map_err(|e| e.to_string())?;
    
    // Delete the folder (CASCADE should handle photos)
    conn.execute("DELETE FROM folders WHERE id = ?1", [folder_id])
        .map_err(|e| e.to_string())?;

    log!("Removed folder with ID: {}", folder_id);
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_all_photos,
            add_folder,
            list_folders,
            remove_folder,
            scan_folder,
            refresh_library,
            debug_database_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;

    #[test]
    fn test_is_image_file() {
        assert!(is_image_file(&PathBuf::from("test.jpg")));
        assert!(is_image_file(&PathBuf::from("test.JPG")));
        assert!(is_image_file(&PathBuf::from("test.png")));
        assert!(is_image_file(&PathBuf::from("test.PNG")));
        assert!(!is_image_file(&PathBuf::from("test.pdf")));
        assert!(!is_image_file(&PathBuf::from("test.txt")));
        assert!(!is_image_file(&PathBuf::from("test")));
    }

    #[test]
    fn test_scan_docs_folder() {
        let docs_path = "/Users/nichnarmada/Documents/docs";
        let mut image_count = 0;
        
        println!("Testing scan of docs folder: {}", docs_path);
        
        for entry in WalkDir::new(docs_path).into_iter().filter_map(|e| e.ok()) {
            let path = entry.path();
            println!("Found file: {} (is_file: {}, is_image: {})", 
                path.display(), path.is_file(), is_image_file(path));
            
            if path.is_file() && is_image_file(path) {
                image_count += 1;
                println!("  -> Image #{}: {}", image_count, path.display());
            }
        }
        
        println!("Total images found: {}", image_count);
        assert!(image_count > 0, "Should find at least one image in docs folder");
    }
}
