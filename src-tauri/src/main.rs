#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

#[derive(Serialize)]
struct DemoInfo {
    platform: String,
    arch: String,
    tauri_mode: &'static str,
}

#[tauri::command]
fn demo_info() -> DemoInfo {
    DemoInfo {
        platform: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
        tauri_mode: if cfg!(debug_assertions) {
            "debug"
        } else {
            "release"
        },
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}! This executable is powered by Tauri and Rust.")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![demo_info, greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
