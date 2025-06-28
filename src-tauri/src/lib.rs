use tauri::{Emitter, Manager};
use tauri_plugin_shell::ShellExt;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn scan_folder(
    window: tauri::Window,
    app_handle: tauri::AppHandle,
    folder_path: String,
) -> Result<String, String> {
    let app_data_dir = app_handle
        .path()
        .app_data_dir()
        .map_err(|e| e.to_string())?;

    std::fs::create_dir_all(&app_data_dir).map_err(|e| e.to_string())?;

    let db_path = app_data_dir.join("gallery.db");

    let shell = window.shell();
    let (mut rx, _child) = shell
        .command("bin/gg-sidecar")
        .args([
            "--scan",
            &folder_path,
            "--db",
            db_path.to_str().unwrap_or_default(),
        ])
        .spawn()
        .map_err(|e| e.to_string())?;

    let mut output: Vec<String> = Vec::new();

    while let Some(event) = rx.recv().await {
        if let tauri_plugin_shell::process::CommandEvent::Stdout(line_bytes) = event {
            let line_str = String::from_utf8_lossy(&line_bytes).to_string();
            window.emit("scan-update", &line_str).unwrap();
            output.push(line_str);
        }
    }

    Ok(output.join("\n"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![greet, scan_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
