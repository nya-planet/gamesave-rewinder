// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod state;
mod command;
mod system_info;
mod game_library;
mod utils;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello1, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
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
