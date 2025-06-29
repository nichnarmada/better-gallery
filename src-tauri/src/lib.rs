use serde::Serialize;
use tauri::{Emitter, Manager};
use tauri_plugin_shell::ShellExt;
use std::path::Path;
use serde_json::Value;
use std::fs;

#[derive(Debug, Serialize, Clone)]
struct Photo {
    id: i32,
    file_path: String,
}

// Add simple logging macro alias for clarity
macro_rules! log {
    ($($t:tt)*) => {
        println!("[better-gallery] {}", format!( $($t)* ));
    };
}

// Embed the initial migration SQL at compile-time so we don't depend on runtime file paths.
const MIGRATION_SQL: &str = include_str!("../../drizzle/0000_productive_madelyne_pryor.sql");

// Absolute path to the TypeScript sidecar entry; used during development fallback.
const SIDECAR_TS_PATH: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/../sidecars/index.ts");

/// Ensures the database and its tables are created.
fn ensure_db_initialized(db_path: &Path) -> Result<(), String> {
    log!("Ensuring database exists at {:?}", db_path);

    // Helper to execute migration on a connection
    fn run_migration(conn: &rusqlite::Connection) -> Result<(), String> {
        log!("Executing embedded migration SQL ({} bytes)", MIGRATION_SQL.len());
        conn.execute_batch(MIGRATION_SQL).map_err(|e| {
            log!("Failed to execute migration SQL: {}", e);
            format!("Failed to execute migration SQL: {}", e)
        })
    }

    if !db_path.exists() {
        log!("Database file not found, creating new database");
        let conn = rusqlite::Connection::open(db_path).map_err(|e| {
            log!("Failed to open database file: {}", e);
            e.to_string()
        })?;
        run_migration(&conn)?;
        log!("Database created and migrated successfully");
        return Ok(());
    }

    // Database file exists – ensure required tables exist.
    let conn = rusqlite::Connection::open(db_path).map_err(|e| {
        log!("Failed to open existing database file: {}", e);
        e.to_string()
    })?;

    // Check if `photos` table exists.
    let table_count: i64 = conn
        .query_row(
            "SELECT COUNT(name) FROM sqlite_master WHERE type='table' AND name='photos'",
            [],
            |row| row.get(0),
        )
        .map_err(|e| {
            log!("Failed to query sqlite_master: {}", e);
            e.to_string()
        })?;

    if table_count == 0 {
        log!("'photos' table missing – running migration");
        run_migration(&conn)?;
        log!("Migration applied successfully");
    }

    Ok(())
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn sidecar_path() -> &'static str {
    #[cfg(target_os = "macos")]
    {
        if cfg!(target_arch = "aarch64") {
            "bin/gg-sidecar-macos-arm64"
        } else {
            "bin/gg-sidecar-macos-x64"
        }
    }
    #[cfg(target_os = "windows")]
    {
        "bin/gg-sidecar-win-x64.exe"
    }
    #[cfg(all(target_os = "linux", target_arch = "x86_64"))]
    {
        "bin/gg-sidecar-linux-x64"
    }
}

fn sidecar_command(folder_path: &str, db_path: &str) -> (String, Vec<String>) {
    // Always use the Bun/TypeScript side-car when running in debug (dev) builds to avoid
    // native-addon packaging issues while iterating locally. Release builds will still
    // prefer the compiled binary if present.
    if cfg!(debug_assertions) {
        return (
            "npx".into(),
            vec![
                "-y".into(),
                "tsx".into(),
                SIDECAR_TS_PATH.into(),
                "--scan".into(),
                folder_path.into(),
                "--db".into(),
                db_path.into(),
            ],
        );
    }

    let binary_path = sidecar_path();
    if fs::metadata(binary_path).is_ok() {
        // Compiled binary exists, use it.
        (
            binary_path.to_string(),
            vec![
                "--scan".into(),
                folder_path.into(),
                "--db".into(),
                db_path.into(),
            ],
        )
    } else {
        // Fallback to bun + TS source (development mode)
        log!("Compiled sidecar not found ({}). Falling back to bun script.", binary_path);
        (
            "npx".into(),
            vec![
                "-y".into(),
                "tsx".into(),
                SIDECAR_TS_PATH.into(),
                "--scan".into(),
                folder_path.into(),
                "--db".into(),
                db_path.into(),
            ],
        )
    }
}

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
            log!("Failed to query photos: {}", e);
            e.to_string()
        })?;

    let mut photos = Vec::new();
    for photo in photo_iter {
        photos.push(photo.map_err(|e| {
            log!("Failed to map photo row: {}", e);
            e.to_string()
        })?);
    }

    log!("Returning {} photos", photos.len());
    Ok(photos)
}

#[tauri::command]
async fn scan_folder(
    window: tauri::Window,
    app_handle: tauri::AppHandle,
    folder_path: String,
) -> Result<String, String> {
    log!("scan_folder called with folder_path: {}", folder_path);
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

    let shell = window.shell();
    let (cmd, args) = sidecar_command(&folder_path, db_path.to_str().unwrap_or_default());
    log!("Spawning sidecar process: {} {}", cmd, args.join(" "));
    let shell_cmd = shell.command(&cmd).args(args);
    let (mut rx, _child) = shell_cmd.spawn().map_err(|e| {
        log!("Failed to spawn sidecar process: {}", e);
        e.to_string()
    })?;

    let mut output: Vec<String> = Vec::new();

    while let Some(event) = rx.recv().await {
        match event {
            tauri_plugin_shell::process::CommandEvent::Stdout(line_bytes) => {
                let line_str = String::from_utf8_lossy(&line_bytes).to_string();
                window.emit("scan-update", &line_str).unwrap();
                // JSON progress parse as before
                if let Ok(json) = serde_json::from_str::<Value>(&line_str) {
                    if let Some(event_type) = json.get("type").and_then(|v| v.as_str()) {
                        match event_type {
                            "progress" => {
                                if let Some(path) = json.get("path").and_then(|v| v.as_str()) {
                                    log!("Indexed image: {}", path);
                                }
                            }
                            "start" => log!("Sidecar scan started"),
                            "done" => {
                                if let Some(total) = json.get("total").and_then(|v| v.as_u64()) {
                                    log!("Sidecar scan finished – {} images indexed", total);
                                } else {
                                    log!("Sidecar scan finished");
                                }
                            }
                            "error" => {
                                let msg = json.get("message").and_then(|v| v.as_str()).unwrap_or("unknown error");
                                log!("Sidecar error: {}", msg);
                            }
                            _ => {}
                        }
                    }
                }
                output.push(line_str);
            }
            tauri_plugin_shell::process::CommandEvent::Stderr(line_bytes) => {
                let line_str = String::from_utf8_lossy(&line_bytes);
                log!("sidecar stderr: {}", line_str);
            }
            _ => {}
        }
    }

    log!("Scan folder completed");
    Ok(output.join("\n"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            scan_folder,
            get_all_photos
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
