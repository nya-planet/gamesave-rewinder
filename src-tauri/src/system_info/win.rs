use windows::Win32::Storage::FileSystem;

fn u32_to_binary_vec(num: u32) -> Vec<u8> {
    let mut num = num.clone();
    let mut binary = Vec::new();
    for _ in 0..32 {
        binary.push((num & 1) as u8);
        num >>= 1;
    }
    binary
}

pub fn get_all_drives() -> Vec<String> {
    unsafe {
        let drives = FileSystem::GetLogicalDrives();
        return u32_to_binary_vec(drives)
            .iter()
            .enumerate()
            .filter(|(_, &x)| x == 1)
            .map(|(i, _)| (i as u8 + 65) as char)
            .map(|x| format!("{}:", x))
            .collect();
    }
}