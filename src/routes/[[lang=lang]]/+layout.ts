import { setLocale } from '$lib/i18n/i18n-svelte.js';
import type { Locales } from '$lib/i18n/i18n-types.js';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async.js';

export const load = async (e) => {
	const locale = e.params.lang as Locales;
	await loadLocaleAsync(locale);
	setLocale(locale);
};
