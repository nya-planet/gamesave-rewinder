use tauri;

#[tauri::command]
pub fn get_game_save_list() -> () {}

#[tauri::command]
pub fn backup_game_save() -> () {}

#[tauri::command]
pub fn rewind_game_save() -> () {}

#[tauri::command]
pub fn delete_game_save() -> () {}

#[tauri::command]
pub fn export_game_save() -> () {}
