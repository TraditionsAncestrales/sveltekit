/** @type {import("prettier").Config} */
export default {
	printWidth: 140,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
