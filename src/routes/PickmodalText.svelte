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
	<p class="font-light italic text-gray-900 dark:text-white">Click the funny buttons</p>
	<div class="max-w-lg text-center">
		<div>
			<div>
				<!-- Modal header -->
				<div class="flex items-center justify-center rounded-t border-b p-4 dark:border-gray-600">
					<!-- <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Initial setup process</h3> -->
					<!-- <button
					on:click={() => window.close()}
					type="button"
					class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					data-modal-toggle="defaultModal"
				>
					<svg
						aria-hidden="true"
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="sr-only">Close modal</span>
				</button> -->
				</div>
				<!-- Modal body -->
				<div class="space-y-6 px-6 py-5">
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						To use NeosVR mod manager, you need to select your <span
							class="text-gray-900 underline dark:text-white">nml_mods</span
						>
						and <span class="text-gray-900 underline dark:text-white">nml_libs</span> folders inside
						your NeosVR installation folder.
					</p>
					<Pickmodalpath />
				</div>
				<!-- Modal footer -->
			</div>
		</div>
	</div>
</div>
