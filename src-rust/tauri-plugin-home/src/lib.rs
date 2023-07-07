use kira::{
    manager::{backend::DefaultBackend, AudioManager, AudioManagerSettings},
    sound::static_sound::{StaticSoundData, StaticSoundSettings},
};
use std::{borrow::Borrow, fs::File, io::BufReader, time::Duration};

use tauri::{
    api::dialog,
    generate_handler,
    plugin::{Builder, TauriPlugin},
    Runtime,
};

#[tauri::command]
async fn open_file_dialog() -> Result<(), ()> {
    match dialog::blocking::FileDialogBuilder::default().pick_file() {
        Some(path) => {
            let mut manager =
                AudioManager::<DefaultBackend>::new(AudioManagerSettings::default()).unwrap();
            let sound_data =
                StaticSoundData::from_file(path.to_str().unwrap(), StaticSoundSettings::default())
                    .unwrap();
            manager.play(sound_data.clone()).unwrap();
            std::thread::sleep(Duration::from_secs(5));
            // After a couple seconds...
            manager.play(sound_data.clone()).unwrap();
            std::thread::sleep(Duration::from_secs(5));
        }
        _ => {}
    }
    Ok(())
}

// #[tauri::command]
// async fn open_file_dialog() -> Result<(), ()> {
//     match dialog::blocking::FileDialogBuilder::default().pick_file() {
//         Some(path) => {
//             let (_stream, stream_handle) = OutputStream::try_default().unwrap();
//             let sink = Sink::try_new(&stream_handle).unwrap();

//             let file =
//                 BufReader::new(File::open(path.to_str().expect("failed to read path")).unwrap());
//             let source = Decoder::new(file).unwrap();
//             let source = source.periodic_access(Duration::from_secs(1), |s| {
//                 println!(
//                     "{} {}",
//                     s.total_duration().unwrap_or(Duration::default()).as_secs(),
//                     s.current_frame_len().unwrap()
//                 );
//             });
//             sink.append(source);
//             std::thread::sleep(Duration::from_secs(5));
//         }
//         _ => {}
//     }
//     Ok(())
// }

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("home")
        .invoke_handler(generate_handler![open_file_dialog])
        .build()
}
