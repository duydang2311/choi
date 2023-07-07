import { writable } from 'svelte/store';
import { langEntries } from '../entries.js';

const form = writable({ name: '', password: '' });

export const prerender = false;
export const ssr = false;

export const entries = () => langEntries;

export const load = () => {
	return { form };
};
