use std::path::PathBuf;

pub mod steam;

pub enum GamePlatform {
    Steam(steam::SteamGame),
}

impl Game for GamePlatform {
    fn name(&self, language: Option<String>) -> String {
        match self {
            GamePlatform::Steam(x) => x.name(language),
        }
    }
    fn cover(&self) -> String {
        match self {
            GamePlatform::Steam(x) => x.cover(),
        }
    }
    fn header(&self) -> String {
        match self {
            GamePlatform::Steam(x) => x.header(),
        }
    }
    fn gamesave(&self, language: Option<String>) -> Vec<PathBuf> {
        match self {
            GamePlatform::Steam(x) => x.gamesave(language),
        }
    }
}

pub trait Game {
    fn name(&self, language: Option<String>) -> String;
    fn cover(&self) -> String;
    fn header(&self) -> String;
    fn gamesave(&self, languge: Option<String>) -> Vec<PathBuf>;
}