use std::fs::File;
use std::io::Read;
use std::path::Path;

pub fn read_to_string(path: &Path) -> String {
    let mut file = File::open(path).unwrap();
    let mut content = String::new();
    file.read_to_string(&mut content).unwrap();
    content
}