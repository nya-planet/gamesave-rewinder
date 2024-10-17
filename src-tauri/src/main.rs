// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate windows;

mod state;
mod command;
mod system_info;
mod game_library;
mod utils;

fn main() {
    gamesave_rewinder_lib::run();
}
