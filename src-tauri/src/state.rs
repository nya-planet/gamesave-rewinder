use std::{path::{Path, PathBuf}, sync::Mutex};

use crate::{command::steam_library, game_library::{self, steam}, system_info, utils};

pub struct CacheState {
    pub steam_install_path: PathBuf,
    pub steam_install_dir: steam::SteamInstallDir,
    pub steam_library_folder_list: Vec<PathBuf>,
    pub game_save_backup_path: PathBuf,
    pub inited: bool,
}

impl Default for CacheState {
    fn default() -> Self {
        CacheState {
            steam_install_path: PathBuf::new(),
            steam_install_dir: steam::SteamInstallDir {
                steamapps: PathBuf::new(),
                userdata: PathBuf::new(),
                appcache: PathBuf::new(),
                librarycache: PathBuf::new(),
            },
            steam_library_folder_list: Vec::new(),
            game_save_backup_path: PathBuf::new(),
            inited: false,
        }
    }
}

impl CacheState {
    pub fn new(& mut self) {
        let steam_install_path = system_info::win::get_steam_install_path();

        match steam_install_path {
            Some(x) => self.steam_install_path = x,
            None => return,
        }

        self.steam_install_dir = steam::SteamInstallDir::new(&self.steam_install_path);
        self.steam_library_folder_list = game_library::steam::find_steam_library_folder_list(system_info::win::get_all_drives());

        let insed = steam::get_installed_game_list(&self.steam_install_dir);

        for x in insed {
            println!("{:?}", x);
        }

        let vdf_path_list = self.steam_library_folder_list
            .iter()
            .map(|x| game_library::steam::find_steam_library_folder_vdf(x))
            .filter(Option::is_some)
            .map(Option::unwrap)
            .collect::<Vec<PathBuf>>();

        let vdf_list = vdf_path_list
            .iter()
            .map(|x| game_library::steam::read_libraryfolder_vdf(utils::read_to_string(x)))
            .filter(Result::is_ok)
            .map(Result::unwrap)
            .collect::<Vec<game_library::steam::LibraryFolder>>();

        println!("{:?}", vdf_path_list);

        let a = system_info::win::get_steam_install_path();

        self.game_save_backup_path = PathBuf::from("C:\\Users\\james\\Desktop\\game_save_backup");
        self.inited = true;
    }
}

pub struct GRState {
    pub cache: Mutex<CacheState>,
}

impl Default for GRState {
    fn default() -> Self {
        GRState {
            cache: Mutex::new(CacheState::default()),
        }
    }
}