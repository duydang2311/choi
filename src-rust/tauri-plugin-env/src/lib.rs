use tauri::{
    generate_handler,
    plugin::{Builder, TauriPlugin},
    Runtime,
};

#[tauri::command]
fn get_env(name: &str) -> Result<String, ()> {
    match std::env::var(name) {
        Ok(value) => Ok(value),
        Err(_) => Err(()),
    }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("env")
        .invoke_handler(generate_handler![get_env])
        .build()
}
