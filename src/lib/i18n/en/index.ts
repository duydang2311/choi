import type { BaseTranslation } from '../i18n-types';

const en = {
	error: {
		fetch: 'There has been a problem while fetching: {message:string}.',
		message: {
			badNetwork: 'Bad network'
		}
	},
	login: {
		h1: 'Log in to Choi.',
		name: {
			label: 'Email or username',
			placeholder: 'Email or username',
			empty: 'Email or username must not be empty.'
		},
		password: {
			label: 'Password',
			placeholder: 'Password',
			forgot: 'Forgot your password?',
			empty: 'Password must not be empty.'
		},
		submit: 'Log in',
		noAccount: "Don't have an acccount?",
		signUp: 'Sign up',
		wrong: 'Either email or username or password is not correct.',
		ok: 'You have logged in to Choi successfully.'
	}
} satisfies BaseTranslation;

export default en;
