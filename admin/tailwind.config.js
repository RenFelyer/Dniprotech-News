/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				text: '#060D2F',
				dark: '#1E1E62',
				accent: '#546CCF',
				balance: '#97BBFE',
				lights: '#DAEEFE',
				info: '#4B5EAF',
				footerbg: '#3B3B74'
			},
			backgroundImage: {
				sliderBackground: 'url(assets/images/sliderBackground.jpg)',
				logoBackground: 'url(assets/images/logo.svg)'
			}
		}
	},
	plugins: [],
}