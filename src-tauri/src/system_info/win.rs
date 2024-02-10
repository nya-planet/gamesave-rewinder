use std::{fs, path::{Path, PathBuf}};

use lnk_parser::LNKParser;
use windows::Win32::{Foundation::{HANDLE, HWND}, Storage::FileSystem, UI::Shell::{self, CSIDL_COMMON_APPDATA}};
use winreg;
use directories;

use crate::game_library::steam;


fn u32_to_binary_vec(num: u32) -> Vec<u8> {
    let mut num = num.clone();
    let mut binary = Vec::new();
    for _ in 0..32 {
        binary.push((num & 1) as u8);
        num >>= 1;
    }
    binary
}

pub fn get_all_drives() -> Vec<String> {
    unsafe {
        let drives = FileSystem::GetLogicalDrives();
        return u32_to_binary_vec(drives)
            .iter()
            .enumerate()
            .filter(|(_, &x)| x == 1)
            .map(|(i, _)| (i as u8 + 65) as char)
            .map(|x| format!("{}:", x))
            .collect();
    }
}

pub fn get_steam_install_path() -> Option<PathBuf> {
    let link_path = directories::BaseDirs::new().map(|x| x.home_dir().join("AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Steam\\Steam.lnk")).unwrap();
    let mut link_file = fs::File::open(link_path).unwrap();
    let link = LNKParser::from_reader(&mut link_file).unwrap();
    let link_target_full_path = link.get_target_full_path().clone().unwrap();
    let link_target_full_path = Path::new(&link_target_full_path);
    let steam_install_path_from_shortcut = link_target_full_path.parent().map(PathBuf::from).filter(|p| p.exists());

    println!("shortcut: {:?}", steam_install_path_from_shortcut);

    let hklm = winreg::RegKey::predef(winreg::enums::HKEY_LOCAL_MACHINE);
    let steam_key = hklm.open_subkey("SOFTWARE\\WOW6432Node\\Valve\\Steam").or(hklm.open_subkey("SOFTWARE\\Valve\\Steam"));

    // let steam_install_path_from_registry = match steam_key {
    //     Ok(key) => match key.get_value::<String, _>("InstallPath") {
    //         Ok(path) => Some(PathBuf::from(path)),
    //         Err(_) => None
    //     },
    //     Err(_) => None
    // };

    let steam_install_path_from_registry = steam_key
        .map_or(None, |k| 
            k.get_value::<String, _>("InstallPath")
                .map(Option::Some)
                .unwrap_or(None))
        .map(PathBuf::from)
        .filter(|p| p.exists());
    

    println!("registry: {:?}", steam_install_path_from_registry);

    //wtf windows path
    let possible_path_slice = vec![
        "\\Program Files (x86)\\Steam\\steam.exe",
        "\\Program Files\\Steam\\steam.exe",
        "\\Steam\\steam.exe"
    ];

    let possible_path_list = get_all_drives()
        .iter()
        .map(Path::new)
        .map(
            |drive| possible_path_slice
            .iter()
            .map(|path| drive.join(path))
            .filter(|p| p.exists())
            .collect::<Vec<PathBuf>>()
        )
        .filter(|list| list.len() > 0)
        .flatten()
        .collect::<Vec<PathBuf>>();

    println!("possible {:?}", possible_path_list);

    match steam_install_path_from_shortcut {
        Some(path) => Some(path),
        None => match steam_install_path_from_registry {
            Some(path) => Some(path),
            None => match possible_path_list.len() {
                0 => None,
                _ => Some(possible_path_list[0].parent().unwrap().to_path_buf())
            }
        }
    }
}