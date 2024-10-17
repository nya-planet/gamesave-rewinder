use std::fs::File;
use std::io::Read;
use std::path::Path;

// pub fn read_to_string(path: &Path) -> Result<String, std::io::Error> {
//     // println!("Reading file: {:?}", path);
//     let mut file = File::open(path)?;
//     let mut content = String::new();
//     file.read_to_string(&mut content)?;
//     std::fs::read_to_string(path).map_err(|e| e.into());
//     Ok(content)
// }

// pub fn file_exists(path: &Path) -> bool {
//     File::open(path).is_ok()
// }