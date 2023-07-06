import { writable } from 'svelte/store';

const form = writable({ name: '', password: '' });

export const prerender = false;
export const ssr = false;

export const entries = () => [
	{
		lang: 'en'
	},
	{
		lang: 'vi'
	}
];

export const load = () => {
	return { form };
};
