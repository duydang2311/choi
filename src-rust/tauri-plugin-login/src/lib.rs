use tauri::{plugin::{Builder, TauriPlugin}, Runtime};

#[tauri::command]
fn login(username: &str, password: &str) -> bool {
  username == "user" && password == "user"
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("login")
    .invoke_handler(tauri::generate_handler![login])
    .build()
}
