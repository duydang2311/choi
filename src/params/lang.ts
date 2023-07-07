import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	return param === 'en' || param === 'vi';
}) satisfies ParamMatcher;
