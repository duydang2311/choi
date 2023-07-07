import { writable } from 'svelte/store';
import { langEntries } from '../entries';

const form = writable({ email: '', password: '', confirm: '' });

export const prerender = false;
export const ssr = false;

export const entries = () => langEntries;

export const load = () => {
	return { form };
};
