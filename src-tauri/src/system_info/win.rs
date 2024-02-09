use std::path::{Path, PathBuf};

use windows::Win32::{Foundation::{HANDLE, HWND}, Storage::FileSystem, UI::Shell::{self, CSIDL_COMMON_APPDATA}};
use winreg;

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

pub fn get_folder_path() -> Option<PathBuf> {
    unsafe {
        let mut path: [u8; 260] = [0; 260];
        let hwnd = HWND(0);
        let handle_token = HANDLE(0);
        let link_path = Shell::SHGetFolderPathA(
            hwnd,
            CSIDL_COMMON_APPDATA.try_into().unwrap(),
            handle_token,
            0,
            &mut path,
        );

        println!("{:?}", link_path);
        
        match link_path {
            Ok(_) => Some(PathBuf::from(String::from_utf8_lossy(&path).to_string())),
            _ => None
        }
    }
} 

pub fn get_steam_install_path() -> Option<PathBuf> {
    let link_path = get_folder_path();

    if link_path.is_some() {
        println!("link_path: {:?}", link_path.unwrap().exists());
    }


    let hklm = winreg::RegKey::predef(winreg::enums::HKEY_LOCAL_MACHINE);
    let steam_key = hklm.open_subkey("SOFTWARE\\WOW6432Node\\Valve\\Steam").or(hklm.open_subkey("SOFTWARE\\Valve\\Steam"));

    let steam_install_path_from_registry = match steam_key {
        Ok(key) => match key.get_value::<String, _>("InstallPath") {
            Ok(path) => Some(PathBuf::from(path)),
            Err(_) => None
        },
        Err(_) => None
    };

    println!("registry: {:?}", steam_install_path_from_registry);

    match steam_install_path_from_registry {
        Some(path) => {
            if path.exists() {
                return Some(path);
            }
        },
        None => {}
    }

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

    match possible_path_list.len() {
        0 => None,
        _ => Some(possible_path_list[0].parent().unwrap().to_path_buf())
    }
}