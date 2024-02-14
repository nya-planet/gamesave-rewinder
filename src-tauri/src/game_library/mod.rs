use std::path::PathBuf;

pub mod steam;

pub enum GamePlatform {
    Steam(steam::SteamGame),
}

impl Game for GamePlatform {
    async fn name(&self, language: Option<String>) -> String {
        match self {
            GamePlatform::Steam(x) => x.name(language).await,
        }
    }
    async fn cover(&self) -> String {
        match self {
            GamePlatform::Steam(x) => x.cover().await,
        }
    }
    async fn header(&self) -> String {
        match self {
            GamePlatform::Steam(x) => x.header().await,
        }
    }
    async fn gamesave(&self) -> Vec<PathBuf> {
        match self {
            GamePlatform::Steam(x) => x.gamesave().await,
        }
    }
}

pub trait Game {
    async fn name(&self, language: Option<String>) -> String;
    async fn cover(&self) -> String;
    async fn header(&self) -> String;
    async fn gamesave(&self) -> Vec<PathBuf>;
}