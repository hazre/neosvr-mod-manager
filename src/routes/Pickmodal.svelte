<script>
	import { onMount } from 'svelte';

	/**
	 * @type {typeof import("./Pickmodalpath.svelte").default}
	 */
	let Pickmodalpath;
	export let mods_selected = false;
	onMount(async () => {
		Pickmodalpath = (await import('./Pickmodalpath.svelte')).default;
	});
</script>

<div
	id="popup-modal"
	tabindex="-1"
	class="fixed inset-0 top-0 right-0 left-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-sm"
	aria-hidden="true"
>
	<div class="relative mx-auto my-0 h-full w-full max-w-xl p-4 md:h-auto">
		<div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
			<!-- Modal header -->
			<div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Initial setup process</h3>
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
					To use NeosVR mod manager, you need to select your <span class="text-white underline"
						>nml_mods</span
					>,
					<span class="text-white underline">nml_libs</span>
					and <span class="text-white underline">Libraries</span> folders inside your NeosVR installation
					folder.
				</p>
				<svelte:component this={Pickmodalpath} />
			</div>
			<!-- Modal footer -->
			<div
				class="flex items-center space-x-2 rounded-b border-t border-gray-200 px-6 py-5 dark:border-gray-600"
			>
				<button
					id="butDirectory"
					type="button"
					class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-red-500"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					nml_mods
				</button>
				<button
					type="button"
					class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					{#if mods_selected}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="mr-2 -ml-1 h-5 w-5 text-green-500"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="mr-2 -ml-1 h-5 w-5 text-red-500"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
					nml_libs
				</button>
				<button
					type="button"
					class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-red-500"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
					Libraries
				</button>
				<!-- <button
					type="button"
					class="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-green-500"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
					Nml_mods
				</button> -->
			</div>
		</div>
	</div>
</div>
