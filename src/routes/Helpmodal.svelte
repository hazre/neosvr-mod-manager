<script>
	import { Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	export let helpModal = false;

	const emojis = ['😓', '🤨', '🫤', '🤐', '🫠', '😩', '🥺', '😳', '🥴', '😭'];

	const randomEmoji = Math.floor(Math.random() * emojis.length);

	/**
	 * @type {typeof import("./Pickmodalpath.svelte").default}
	 */
	let Pickmodalpath;

	onMount(async () => {
		Pickmodalpath = (await import('./Pickmodalpath.svelte')).default;
	});
</script>

<Modal title="How things work.. {emojis[randomEmoji]}" bind:open={helpModal} autoclose size="md">
	<div class="space-y-2 text-center">
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			To use NeosVR mod manager, you to <a
				class="text-gray-900 hover:underline dark:text-white"
				href="https://github.com/neos-modding-group/NeosModLoader#installation"
				target="_blank"
				rel="noreferrer noopener">install NeosModLoader</a
			>
			and then select your <span class="text-gray-900 dark:text-white">NeosVR</span>
			installation folder.
		</p>
		<svelte:component this={Pickmodalpath} />
		<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
			<b>Note:</b> due to security reasons, accessing local files inside a browser always requires a
			user interaction. That's why to you this tool, you need to click the load mods button everytime
			you load the page.
		</p>
		<p class="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
			<b>PS:</b> If you would like to give feedback, please make a issue on
			<a
				class="hover:underline"
				href="https://github.com/hazre/neosvr-mod-manager/issues"
				target="_blank"
				rel="noreferrer noopener">Github</a
			>.
		</p>
	</div>
</Modal>
