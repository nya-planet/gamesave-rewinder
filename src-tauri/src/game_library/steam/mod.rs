use std::{collections::BTreeMap, convert::TryFrom, path::{Path, PathBuf}};
use std::fmt::Display;

use keyvalues_serde;
use keyvalues_parser::Vdf;
use serde::Deserialize;

use crate::utils::read_to_string;
use super::Game;

pub static LIBRARYFOLDER_VDF_FILENAME: &str = "libraryfolder.vdf";
pub static LIBRARYFOLDERS_VDF_FILENAME: &str = "libraryfolders.vdf";
static REMOTE_CACHE_IGNORE_KEY_LIST : [&str; 2] = ["ChangeNumber", "ostype"];

#[derive(Deserialize, Debug)]
pub struct InstalledDepots {
    pub manifest: String,
    pub size: String,
}

#[derive(Deserialize, Debug)]
pub struct SteamAppConfigurationFile {
    pub appid: String,
    pub universe: Option<String>,
    #[serde(rename = "LauncherPath")]
    pub launcher_path: Option<String>,
    pub name: Option<String>,
    #[serde(rename = "StateFlags")]
    pub state_flags: Option<String>,
    pub installdir: Option<String>,
    #[serde(rename = "LastUpdated")]
    pub last_updated: Option<String>,
    #[serde(rename = "SizeOnDisk")]
    pub size_on_disk: Option<String>,
    #[serde(rename = "StagingSize")]
    pub staging_size: Option<String>,
    pub buildid: Option<String>,
    #[serde(rename = "LastOwner")]
    pub last_owner: Option<String>,
    #[serde(rename = "UpdateResult")]
    pub update_result: Option<String>,
    #[serde(rename = "BytesToDownload")]
    pub bytes_to_download: Option<String>,
    #[serde(rename = "BytesDownloaded")]
    pub bytes_downloaded: Option<String>,
    #[serde(rename = "BytesToStage")]
    pub bytes_to_stage: Option<String>,
    #[serde(rename = "BytesStaged")]
    pub bytes_staged: Option<String>,
    #[serde(rename = "TargetBuildID")]
    pub target_build_id: Option<String>,
    #[serde(rename = "AutoUpdateBehavior")]
    pub auto_update_behavior: Option<String>,
    #[serde(rename = "AllowOtherDownloadsWhileRunning")]
    pub allow_other_downloads_while_running: Option<String>,
    #[serde(rename = "ScheduledAutoUpdate")]
    pub scheduled_auto_update: Option<String>,
    #[serde(rename = "InstalledDepots")]
    pub installed_depots: Option<BTreeMap<String, InstalledDepots>>,
    #[serde(rename = "SharedDepots")]
    pub shared_depots: Option<BTreeMap<String, String>>,
    #[serde(rename = "UserConfig")]
    pub user_config: Option<BTreeMap<String, String>>,
    #[serde(rename = "MountedConfig")]
    pub mounted_config: Option<BTreeMap<String, String>>,
}

impl TryFrom<String> for SteamAppConfigurationFile {
    type Error = ();

    fn try_from(content: String) -> Result<Self, Self::Error> {
        match keyvalues_serde::from_str(&content) {
            Ok(x) => Ok(x),
            Err(err) => {
                println!("err {:?}", err);
                Err(())
            },
        }
    }
}

pub trait SteamLibrary {
    fn steamapps(&self) -> PathBuf;
    fn get_game_acf_list(&self) -> Result<BTreeMap<String, SteamAppConfigurationFile>, ()>;
    fn get_game_acf(&self, appid: &str) -> Result<SteamAppConfigurationFile, ()>;
}

pub struct Steam {
    pub install_path: PathBuf,
    pub steamapps: PathBuf,
    pub userdata: PathBuf,
    pub appcache: PathBuf,
    pub librarycache: PathBuf,
    pub libraryfolder_list: Vec<SteamLibraryfolder>,
    pub game_list: Vec<SteamGame>,
}

impl Steam {
    pub fn new(install_path: &Path) -> Steam {
        let steamapps = install_path.join("steamapps");
        let userdata = install_path.join("userdata");
        let appcache = install_path.join("appcache");
        let librarycache = appcache.join("librarycache");

        let libraryfolders_vdf_content = read_to_string(steamapps.join(LIBRARYFOLDERS_VDF_FILENAME).as_path());
        let libraryfolder_map: BTreeMap<String, SteamLibraryfolder> = keyvalues_serde::from_str(&libraryfolders_vdf_content).unwrap();
        let libraryfolder_list: Vec<SteamLibraryfolder> = libraryfolder_map.into_values().collect();
        let game_list: Vec<SteamGame> = libraryfolder_list
            .iter()
            .map(|l| 
                l.get_game_acf_list().unwrap()
                    .into_iter()
                    .map(|(k, v)| SteamGame {
                        appid: k,
                        name: v.name.unwrap(),
                        library: l.clone(),
                    }))
            .flatten()
            .collect();

        Steam {
            install_path: install_path.to_path_buf(),
            steamapps,
            userdata,
            appcache,
            librarycache,
            libraryfolder_list,
            game_list: game_list,
        }
    }

    pub fn refresh(&mut self) {
        let install_path = self.install_path.clone();
        let refreshed = Steam::new(&install_path);
        self.install_path = refreshed.install_path;
        self.steamapps = refreshed.steamapps;
        self.userdata = refreshed.userdata;
        self.appcache = refreshed.appcache;
        self.librarycache = refreshed.librarycache;
        self.libraryfolder_list = refreshed.libraryfolder_list;
        self.game_list = refreshed.game_list;
    }

    pub fn get_game_cover(&self, appid: &str, language: Option<String>) -> PathBuf {
        // match language {
        //     Some(lang) => self.librarycache.join(format!("{}_library_600x900_{}.jpg", appid, lang)),
        //     None => self.librarycache.join(format!("{}_library_600x900.jpg", appid)),
        // }

        self.librarycache.join(format!("{}_library_600x900.jpg", appid))
    }

    pub fn get_game_header(&self, appid: &str, language: Option<String>) -> PathBuf {
        // match language {
        //     Some(lang) => self.librarycache.join(format!("{}_header_600x900_{}.jpg", appid, lang)),
        //     None => self.librarycache.join(format!("{}_header_600x900.jpg", appid)),
        // }

        self.librarycache.join(format!("{}_header.jpg", appid))
    }
}

impl Into<String> for Steam {
    fn into(self) -> String {
        "Steam".to_string()
    }
}

#[derive(Debug)]
pub struct SteamGame {
    pub appid: String,
    pub name: String,
    pub library: SteamLibraryfolder,
}

impl  Game for SteamGame {
    fn name(&self, language: Option<String>) -> String {
        self.name.clone()
    }
    fn cover(&self) -> String {
        String::from("cover")
    }
    fn header(&self) -> String {
        String::from("header")
    }
    fn gamesave(&self, language: Option<String>) -> Vec<PathBuf> {
        vec![]
    }
}

impl Display for SteamGame {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "SteamGame {{ appid: {}, name: {} }}", self.appid, self.name)
    }
}

#[derive(Deserialize, Debug, Clone)]
pub struct SteamLibraryfolder {
    pub path: String,
    pub label: String,
    pub contentid: String,
    pub totalsize: String,
    pub update_clean_bytes_tally: String,
    pub time_last_update_corruption: String,
    pub apps: BTreeMap<String, String>,
}

impl SteamLibrary for SteamLibraryfolder {
    fn steamapps(&self) -> PathBuf {
        PathBuf::from(&self.path).join("steamapps")
    }
    fn get_game_acf(&self, appid: &str) -> Result<SteamAppConfigurationFile, ()> {
        let content = read_to_string(self.steamapps().join(format!("appmanifest_{}.acf", appid)).as_path());
        SteamAppConfigurationFile::try_from(content)
    }
    fn get_game_acf_list(&self) -> Result<BTreeMap<String, SteamAppConfigurationFile>, ()> {
        let apps = self.apps.clone();

        Ok(apps
            .into_iter()
            .map(|(k, _)| (k.clone(), self.steamapps().join(format!("appmanifest_{}.acf", k))))
            .map(|(k, p)| (k, read_to_string(p.as_path())))
            .map(|(k, c)| (k, SteamAppConfigurationFile::try_from(c).unwrap()))
            .collect())
    }
}

#[derive(Deserialize, Debug)]
pub struct Libraryfolder {
    pub contentid: String,
    pub label: String,
    pub launcher: String,
}

impl TryFrom<String> for Libraryfolder {
    type Error = ();

    fn try_from(content: String) -> Result<Libraryfolder, Self::Error> {
        keyvalues_serde::from_str(&content).map_err(|_| ())
    }
}

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

impl TryFrom<String> for RemoteCache {
    type Error = ();

    fn try_from(content: String) -> Result<RemoteCache, Self::Error> {
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
}