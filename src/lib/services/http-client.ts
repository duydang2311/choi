import { http } from '@tauri-apps/api';
import type { FetchOptions, Response } from '@tauri-apps/api/http';

export interface ApiResponse<T> {
	version: string;
	data?: T;
	error?: {
		code: string;
		message: string;
	};
}

export interface HttpClientOptions {
	baseUrl: string;
}

export class HttpClient {
	private static _instance: HttpClient;
	private static _options: HttpClientOptions;

	private _baseUrl: string;

	private constructor(private baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	public static useOptions(options: HttpClientOptions) {
		HttpClient._options = options;
	}

	public static get instance() {
		if (!HttpClient._instance) {
			if (!HttpClient._options) {
				throw new ReferenceError('HttpClient requires an options object for construction');
			}
			HttpClient._instance = new HttpClient(HttpClient._options.baseUrl);
		}
		return HttpClient._instance;
	}

	public fetch<T>(url: string, options?: FetchOptions): Promise<Response<ApiResponse<T>>> {
		return http.fetch(this._baseUrl + url, options);
	}
}
