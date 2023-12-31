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
	},
	signup: {
		h1: 'Sign up for Choi.',
		email: {
			label: 'Email',
			placeholder: 'Email',
			empty: 'Email must not be empty.',
			conflict: 'Email has been already used.'
		},
		password: {
			label: 'Password',
			placeholder: 'Password',
			empty: 'Password must not be empty.'
		},
		confirm: {
			label: 'Confirm password',
			placeholder: 'Confirm password',
			empty: 'Password confirmation must not be empty.',
			wrong: 'Password confirmation does not match.'
		},
		submit: 'Sign up',
		hadAccount: 'Already have an account?',
		login: 'Log in',
		ok: 'You have successfully signed up for Choi.'
	}
} satisfies BaseTranslation;

export default en;
