/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#F2FDF6',
					100: '#D7F9E3',
					200: '#A5F3C0',
					300: '#79ECA1',
					400: '#48E57F',
					500: '#1ED760',
					600: '#18AA4B',
					700: '#128239',
					800: '#0C5525',
					900: '#062D14',
					950: '#03160A'
				},
				fill: {
					50: '#FFFFFF',
					100: '#F2F2F2',
					200: '#D6D6D6',
					300: '#BABABA',
					400: '#9C9C9C',
					500: '#808080',
					600: '#636363',
					700: '#474747',
					800: '#2B2B2B',
					900: '#0F0F0F',
					950: '#000000'
				}
			},
			fontSize: {
				h1: ['2.441rem', '1.5'],
				h2: ['1.953rem', '1.5'],
				h3: ['1.563rem', '1.5'],
				h4: ['1.25rem', '1.5'],
				h5: ['1rem', '1.5'],
				p: ['1rem', '1.5'],
				h6: ['0.8rem', '1.5']
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
};
