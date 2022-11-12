import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		Icons({
			autoInstall: true,
			compiler: 'svelte'
		}),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			srcDir: './src',
			scope: '/',
			base: '/',
			outDir: './.svelte-kit/cloudflare',
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			manifest: {
				lang: 'en-us',
				short_name: 'NeosVR Mod Manager',
				name: 'NeosVR Mod Manager',
				start_url: '/',
				description: 'Easily install NeosVR mods and maintain them with ease.',
				scope: '/',
				display: 'standalone',
				theme_color: '#111827',
				background_color: '#111827',
				display_override: ['window-controls-overlay'],
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
};

export default config;
