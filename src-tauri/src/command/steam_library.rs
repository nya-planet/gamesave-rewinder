use std::collections::HashMap;
use std::sync::Mutex;

use tauri::{AppHandle, Manager, Runtime, State};

use crate::game_library;
use crate::state::{self, GRState};
use crate::system_info::win;

#[tauri::command]
pub fn get_game_list(state: State<GRState>) {
    let mut st = state.cache.lock().unwrap();
    st.new();
}

#[tauri::command]
pub fn fetch_game_info() -> () {}

#[tauri::command]
pub fn fetch_game_cover() -> () {}

#[tauri::command]
pub fn fetch_game_icon() -> () {}

#[tauri::command]
pub fn fetch_game_logo() -> () {}

#[tauri::command]
pub fn fetch_game_header() -> () {}
