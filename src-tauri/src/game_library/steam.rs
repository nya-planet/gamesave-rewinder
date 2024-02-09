use std::path::{Path, PathBuf};

use keyvalues_serde;
use keyvalues_parser::Vdf;
use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct LibraryFolder {
    pub contentid: String,
    pub label: String,
    pub launcher: String,
}

static RemoteCacheIgnoreKeyList : [&str; 2] = ["ChangeNumber", "ostype"];

#[derive(Deserialize, Debug)]
pub struct RemoteCache {
    #[serde(rename = "ChangeNumber")]
    pub change_number: String,
    pub ostype: String,
    pub item_list: Vec<(String, RemoteCacheItem)>,
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

pub fn find_steam_library_folder_list(parent_list: Vec<String>) -> Vec<PathBuf> {
    parent_list
        .iter()
        .map(Path::new)
        .map(|parent| parent.join("SteamLibrary"))
        .filter(|steam_library_folder| steam_library_folder.exists())
        .collect()
}

pub fn find_steam_library_folder_vdf(steam_library_folder: &PathBuf) -> Option<PathBuf> {
    let vdf = steam_library_folder.join("libraryfolder.vdf");
    match vdf.exists() {
        true => Some(vdf),
        false => None,
    }
}

pub fn read_libraryfolder_vdf(content: String) -> Result<LibraryFolder, ()> {
    let library_folder: LibraryFolder = keyvalues_serde::from_str(&content).unwrap();
    Ok(library_folder)
}

pub fn read_remotecache_vdf(content: String) -> Result<RemoteCache, ()> {
    let object = Vdf::parse(&content).unwrap().value.unwrap_obj();
    let change_number = object.clone();
    let change_number = change_number.get("ChangeNumber").unwrap();
    let ostype = object.clone();
    let ostype = ostype.get("ostype").unwrap();

    let remote_cache_item_list : Vec<(String, RemoteCacheItem)>= object.into_vdfs()
        .into_iter()
        .filter(|o| !RemoteCacheIgnoreKeyList.contains(&o.key.to_string().as_str()))
        .map(|o| (o.key.to_string(), keyvalues_serde::from_vdf(o).unwrap()))
        .collect();
    
    println!("change_number {:?}", change_number);
    println!("ostype {:?}", ostype);
    println!("remote_cache_item_list {:?}", remote_cache_item_list);

    Ok(RemoteCache {
        change_number: String::from(""),
        ostype: String::from(""),
        item_list: remote_cache_item_list,
    })
}