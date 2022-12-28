/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
      sans: ['Victor Mono', 'sans-serif'],
      mono: ['Victor Mono', 'sans-serif'],
      serif: ['DisplayFont', 'serif'],
    },
		extend: {},
	},
	plugins: [],
	corePlugins: { preflight: false }
}
