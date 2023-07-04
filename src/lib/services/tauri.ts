import { tauri } from '@tauri-apps/api';
import type { InvokeArgs } from '@tauri-apps/api/tauri';

export class Tauri {
	private static _instance: Tauri;

	private constructor() {}

	public static get instance() {
		Tauri._instance ??= new Tauri();
		return Tauri._instance;
	}

	public invoke<TReturn>(name: string, args?: InvokeArgs): Promise<TReturn> {
		return tauri.invoke(name, args);
	}
}
