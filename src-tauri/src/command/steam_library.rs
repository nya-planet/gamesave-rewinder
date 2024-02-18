use std::collections::HashMap;
use std::sync::Mutex;

use tauri::{AppHandle, Manager, Runtime, State};

use crate::game_library;
use crate::state::{self, GRState};
use crate::system_info::win;
use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct GameInfo {
    id: String,
    name: String,
    cover: Option<String>,
    header: Option<String>,
    platform: String,
}

#[tauri::command]
pub fn get_game_list(state: State<GRState>) -> Vec<GameInfo> {
    let mut st = state.cache.lock().unwrap();
    st.new();
    st.platform.steam.game_list.iter().map(|x| {
        let cover = st.platform.steam.get_game_cover(&x.appid, None);
        let header = st.platform.steam.get_game_header(&x.appid, None);

        GameInfo {
            id: format!("steam-{}", x.appid),
            name: x.name.clone(),
            cover: cover.exists().then(|| Some(cover.to_str().unwrap().to_string())).unwrap_or(None),
            header: header.exists().then(|| Some(header.to_str().unwrap().to_string())).unwrap_or(None),
            platform: "steam".to_string(),
        }
    }).collect()
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
