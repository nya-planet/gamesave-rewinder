use std::{collections::BTreeMap, path::{Path, PathBuf}};

use keyvalues_serde;
use keyvalues_parser::Vdf;
use serde::Deserialize;

use crate::utils::read_to_string;
use super::Game;

pub struct SteamInstallDir {
    pub install_path: PathBuf,
    pub steamapps: PathBuf,
    pub userdata: PathBuf,
    pub appcache: PathBuf,
    pub librarycache: PathBuf,
}

impl SteamInstallDir {
    pub fn new(install_path: &Path) -> SteamInstallDir {
        let steamapps = install_path.join("steamapps");
        let userdata = install_path.join("userdata");
        let appcache = install_path.join("appcache");
        let librarycache = appcache.join("librarycache");

        SteamInstallDir {
            install_path: install_path.to_path_buf(),
            steamapps,
            userdata,
            appcache,
            librarycache,
        }
    }
    
}

pub struct SteamGame {
    pub appid: String,
    pub name: String,
}

impl Game for SteamGame {
    async fn name(&self, language: Option<String>) -> String {
        self.name.clone()
    }
    async fn cover(&self) -> String {
        String::from("cover")
    }
    async fn header(&self) -> String {
        String::from("header")
    }
    async fn gamesave(&self) -> Vec<PathBuf> {
        vec![]
    }
}

pub struct SteamLibrary {
    pub steam_install_dir: SteamInstallDir,
    pub game_list: Vec<String>,
}

impl SteamLibrary {
    
}

#[derive(Deserialize, Debug)]
pub struct LibraryfoldersItems {
    pub path: String,
    pub label: String,
    pub contentid: String,
    pub totalsize: String,
    pub update_clean_bytes_tally: String,
    pub time_last_update_corruption: String,
    pub apps: BTreeMap<String, String>,
}

#[derive(Deserialize, Debug)]
pub struct Libraryfolder {
    pub contentid: String,
    pub label: String,
    pub launcher: String,
}

pub static LIBRARYFOLDER_VDF_FILENAME: &str = "libraryfolder.vdf";
pub static LIBRARYFOLDERS_VDF_FILENAME: &str = "libraryfolders.vdf";
static REMOTE_CACHE_IGNORE_KEY_LIST : [&str; 2] = ["ChangeNumber", "ostype"];

#[derive(Deserialize, Debug)]
pub struct RemoteCache {
    #[serde(rename = "ChangeNumber")]
    pub change_number: String,
    pub ostype: String,
    pub item_map: BTreeMap<String, RemoteCacheItem>,
}

#[derive(Deserialize, Debug)]
pub struct RemoteCacheItem {
    pub root: String,
    pub size: String,
    pub localtime: String,
    pub time: String,
    pub remotetime: String,
    pub sha: String,
    pub syncstate: String,
    pub persiststate: String,
    pub platformstosync2: String,
}

pub fn get_install_game_acf_list(library_dir: &PathBuf) -> Vec<PathBuf> {
    library_dir
        .read_dir()
        .unwrap()
        .map(|entry| entry.unwrap().path())
        .filter(|path| path.extension().is_some_and(|ext| ext.eq("acf")))
        .collect::<Vec<PathBuf>>()
}

pub fn get_install_game_id_list(acf_list: Vec<PathBuf>) -> Vec<String> {
    acf_list
        .iter()
        .map(|path| path.file_stem().unwrap().to_str().unwrap().replace("appmanifest_", ""))
        .collect()
}

fn _get_installed_game_list(install_dir: &SteamInstallDir, library_folder: Vec<PathBuf>) -> Vec<String> {
    // let steamapps = install_dir.steamapps.clone();
    let acf_list_from_install_dir = get_install_game_acf_list(&install_dir.steamapps);
    let acf_list_from_library_folder = library_folder
        .iter()
        .map(get_install_game_acf_list)
        .flatten()
        .collect::<Vec<PathBuf>>();

    let acf_list = acf_list_from_install_dir
        .into_iter()
        .chain(acf_list_from_library_folder.into_iter())
        .collect::<Vec<PathBuf>>();

    let game_id_list = get_install_game_id_list(acf_list);

    game_id_list
}

pub fn get_libraryfolder_list(install_dir: &SteamInstallDir) -> Vec<LibraryfoldersItems> {
    let content = read_to_string(&install_dir.steamapps.join(LIBRARYFOLDERS_VDF_FILENAME));
    let libraryfolders = read_libraryfolders_vdf(content).unwrap();
    libraryfolders
        .into_values()
        .collect::<Vec<LibraryfoldersItems>>()
}

pub fn get_installed_game_list(install_dir: &SteamInstallDir) -> Vec<String> {
    let libraryfolder_list = get_libraryfolder_list(install_dir);

    let game_id_list = libraryfolder_list
    .iter()
    .map(|l| 
        l.apps
            .keys()
            .map(|k| k.clone())
            .collect::<Vec<String>>())
    .flatten()
    .collect();

    println!("libraryfolders  {:?}", libraryfolder_list);

    println!("gameidlist  {:?}", game_id_list);

    game_id_list
}

pub fn find_steam_library_folder_list(parent_list: Vec<String>) -> Vec<PathBuf> {
    parent_list
        .iter()
        .map(Path::new)
        .map(|parent| parent.join("SteamLibrary"))
        .filter(|steam_library_folder| steam_library_folder.exists())
        .collect()
}

pub fn find_steam_library_folder_vdf(steam_library_folder: &PathBuf) -> Option<PathBuf> {
    let vdf = steam_library_folder.join(LIBRARYFOLDER_VDF_FILENAME);
    match vdf.exists() {
        true => Some(vdf),
        false => None,
    }
}

pub fn read_libraryfolders_vdf(content: String) -> Result<BTreeMap<String, LibraryfoldersItems>, ()> {
    let library_folders: BTreeMap<String, LibraryfoldersItems> = keyvalues_serde::from_str(&content).unwrap();
    Ok(library_folders)
}

pub fn read_libraryfolder_vdf(content: String) -> Result<Libraryfolder, ()> {
    let library_folder: Libraryfolder = keyvalues_serde::from_str(&content).unwrap();
    Ok(library_folder)
}

pub fn read_remotecache_vdf(content: String) -> Result<RemoteCache, ()> {
    let object = Vdf::parse(&content).unwrap().value.unwrap_obj();
    let change_number = object.clone();
    let change_number = change_number.get("ChangeNumber").unwrap();
    let ostype = object.clone();
    let ostype = ostype.get("ostype").unwrap();

    let remote_cache_item_map = object.into_vdfs()
        .into_iter()
        .filter(|o| !REMOTE_CACHE_IGNORE_KEY_LIST.contains(&o.key.to_string().as_str()))
        .map(|o| (o.key.to_string(), keyvalues_serde::from_vdf(o).unwrap()))
        .collect::<BTreeMap<String, RemoteCacheItem>>();
    
    println!("change_number {:?}", change_number);
    println!("ostype {:?}", ostype);
    println!("remote_cache_item_map {:?}", remote_cache_item_map);

    Ok(RemoteCache {
        change_number: String::from(""),
        ostype: String::from(""),
        item_map: remote_cache_item_map,
    })
}