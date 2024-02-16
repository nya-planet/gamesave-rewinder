use std::{
    path::{Path, PathBuf},
    sync::Mutex,
};

use crate::{
    command::steam_library,
    game_library::{self, steam, Game, GamePlatform},
    system_info, utils,
};

pub struct Platform {
    pub steam: steam::Steam,
}

pub struct CacheState<G: Game> {
    pub inited: bool,
    pub game_library: Vec<G>,
    pub game_save_backup_path: PathBuf,
    pub platform: Platform,
}

impl Default for CacheState<GamePlatform> {
    fn default() -> Self {
        CacheState {
            inited: false,
            game_library: Vec::new(),
            platform: Platform {
                steam: steam::Steam {
                    install_path: PathBuf::new(),
                    steamapps: PathBuf::new(),
                    userdata: PathBuf::new(),
                    appcache: PathBuf::new(),
                    librarycache: PathBuf::new(),
                    libraryfolder_list: Vec::new(),
                },
            },
            game_save_backup_path: PathBuf::new(),
        }
    }
}

impl CacheState<GamePlatform> {
    pub fn new(&mut self) {
        let steam_install_path = system_info::win::get_steam_install_path().unwrap();

        self.platform.steam = steam::Steam::new(&steam_install_path);
        // self.steam_library_folder_list = game_library::steam::find_steam_library_folder_list(system_info::win::get_all_drives());

        let insed = self.platform.steam.get_installed_game_list();

        for x in insed {
            println!("{:?}", x);
        }

        self.game_save_backup_path = PathBuf::from("C:\\Users\\james\\Desktop\\game_save_backup");
        self.inited = true;
    }
}

pub struct GRState {
    pub cache: Mutex<CacheState<GamePlatform>>,
}

impl Default for GRState {
    fn default() -> Self {
        GRState {
            cache: Mutex::new(CacheState::default()),
        }
    }
}
