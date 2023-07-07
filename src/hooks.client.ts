import '@csstools/normalize.css';
import 'sanitize.css';
import 'sanitize.css/sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/system-ui.css';
import 'sanitize.css/ui-monospace.css';
import './app.css';
import { HttpClient } from '$lib/services/http-client';
import { Tauri } from '$lib/services/tauri';

HttpClient.useOptions({
	baseUrl: await Tauri.instance
		.invoke<string>('plugin:env|get_env', { name: 'API_BASE_URL' })
		.then((v) => v)
		.catch(() => {
			throw new ReferenceError('API_BASE_URL environment variable is required');
		})
});
