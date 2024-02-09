use std::fs::File;
use std::io::Read;
use std::path::{Path, PathBuf};

use keyvalues_serde;
use keyvalues_parser::Vdf;

#[derive(Deserialize, Debug)]
struct LibraryFolder {
    contentid: String,
    label: String,
    launcher: String,
}

#[derive(Deserialize, Debug)]
struct RemoteCacheItem {
    root: String,
    size: String,
    localtime: String,
    time: String,
    remotetime: String,
    sha: String,
    syncstate: String,
    persiststate: String,
    platformstosync2: String,
}

fn read_file(path: &path::Path) -> String {
    let mut file = File::open(path).unwrap();
    let mut content = String::new();
    file.read_to_string(&mut content).unwrap();
    content
}


pub fn find_steam_library_folder_list(parent_list: Vec<String>) -> Vec<PathBuf> {
    parent_list
        .iter()
        .map(Path::new)
        .map(|parent| parent.join("SteamLibrary"))
        // .filter(|steam_library_folder| steam_library_folder.exists())
        .filter(|steam_library_folder| {
            println!("123 {:?}", steam_library_folder);
            steam_library_folder.exists()
        })
        .collect()
}

pub fn find_steam_library_folder_vdf(steam_library_folder: &PathBuf) -> Option<PathBuf> {
    println!("321 {:?}", steam_library_folder.join("libraryfolder.vdf"));
    let vdf = steam_library_folder.join("libraryfolder.vdf");
    println!("123 {:?}", vdf.exists());
    match vdf.exists() {
        true => Some(vdf),
        false => None,
    }
}

pub fn read_vdf_file(file_path: &PathBuf) -> Result<String, std::io::Error> {
    let mut file = match File::open(file_path) {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut content = String::new();
    if let Err(err) = file.read_to_string(&mut content) {
        return Err(err);
    };

    let vdf_content = match keyvalues_serde::from_str(&content) {
        Ok(vdf_content) => vdf_content,
        Err(err) => return Err(std::io::Error::new(std::io::ErrorKind::InvalidData, err)),
    };

    Ok(vdf_content)
}