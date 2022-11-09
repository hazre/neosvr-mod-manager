<script>
	import Pickmodalpath from './Pickmodalpath.svelte';
	import { fly } from 'svelte/transition';

	const emojis = ['😓', '🤨', '🫤', '🤐', '🫠', '😩', '🥺', '😳', '🥴', '😭'];

	const randomEmoji = Math.floor(Math.random() * emojis.length);
</script>

<div
	class="fixed inset-0 top-0 right-0 left-0 flex h-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
	in:fly={{ y: 200, duration: 2000 }}
>
	<p class="text-4xl font-medium text-gray-900 dark:text-white">
		Mods are not loaded... {emojis[randomEmoji]}
	</p>
	<p class="font-light italic text-gray-900 dark:text-white">Click the funny button</p>
	<div class="max-w-lg text-center">
		<div>
			<div>
				<div class="flex items-center justify-center rounded-t border-b p-4 dark:border-gray-600" />
				<div class="space-y-6 px-6 py-5">
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						To use NeosVR mod manager, you need to select your <span
							class="text-gray-900 underline dark:text-white">NeosVR</span
						> installation folder.
					</p>
					<Pickmodalpath />
					<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
						<b>Note:</b> due to security reasons, accessing local files inside a browser always requires
						a user interaction. That's why to you this tool, you need to click the load mods button everytime
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
			</div>
		</div>
	</div>
</div>
