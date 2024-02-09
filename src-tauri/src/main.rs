// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate windows;

mod state;
mod command;
mod system_info;
mod game_library;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::gamesave::get_game_save_list,
            command::gamesave::backup_game_save,
            command::gamesave::rewind_game_save,
            command::gamesave::delete_game_save,
            command::gamesave::export_game_save,
            command::steam_library::get_game_list,
            command::steam_library::fetch_game_info,
            command::steam_library::fetch_game_cover,
            command::steam_library::fetch_game_icon,
            command::steam_library::fetch_game_logo,
            command::steam_library::fetch_game_header,
        ])
        .manage(state::GRState::default())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
