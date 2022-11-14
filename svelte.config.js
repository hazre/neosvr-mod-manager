import staticAdapter from '@sveltejs/adapter-static'
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: process.env['TAURI_PLATFORM'] !== undefined ? staticAdapter({ strict: false }) : cloudflareAdapter()
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
