<script>
	import { onMount } from 'svelte';
	import { get, set } from 'idb-keyval';
	import { getHandle } from '$lib/helper';

	export let searchTerm = '';
	export let hh = 0;
	let mods_folder = false;
	let libs_folder = false;

	onMount(async () => {
		if (await get('nml_mods')) {
			mods_folder = true;
		}
	});
	onMount(async () => {
		if (await get('nml_libs')) {
			libs_folder = true;
		}
	});

	onMount(() => {
		const setModsDirectory = document.getElementById('setModsDirectory');
		// @ts-ignore
		setModsDirectory.addEventListener('click', async () => {
			const handle = await getHandle();
			if (handle) {
				mods_folder = true;
			}
		});
	});
	onMount(() => {
		const setLibsDirectory = document.getElementById('setLibsDirectory');
		// @ts-ignore
		setLibsDirectory.addEventListener('click', async () => {
			const handle = await getHandle();
			if (handle) {
				libs_folder = true;
			}
		});
	});

	/**
	 * @type {{ date: { commit: { author: { date: string | number | Date; }; }; }[]; }}
	 */
	export let data;
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 mx-4 flex flex-col gap-2 border-gray-200 bg-white py-2.5 dark:bg-gray-900"
	bind:offsetHeight={hh}
>
	<div class="flex items-center space-x-2">
		<h1 class="flex-1 text-2xl font-extrabold dark:text-white">
			NeosVR
			<small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">Mod Manager</small>
		</h1>
		<!-- <button
			id="butDirectory"
			type="button"
			class="mr-2 rounded-md border border-gray-800 px-2.5 py-1 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
			>Open Folder</button
		> -->
		<button
			id="butDirectory"
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			Load Mods
		</button>
		<button
			id="setModsDirectory"
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			{#if mods_folder}
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
			Mods
		</button>
		<button
			id="setLibsDirectory"
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			{#if libs_folder}
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
			Libs
		</button>
	</div>

	<form class="flex items-center space-x-2">
		<div class="w-full">
			<label
				for="default-search"
				class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Search</label
			>
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						aria-hidden="true"
						class="h-5 w-5 text-gray-500 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</div>
				<input
					type="search"
					id="default-search"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
					placeholder="Search Mockups, Logos..."
					required
					bind:value={searchTerm}
				/>
			</div>
		</div>

		<div>
			<button
				id="dropdownCheckboxButton"
				data-dropdown-toggle="dropdownDefaultCheckbox"
				class="inline-flex items-center rounded-lg bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-5 w-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
					/>
				</svg>

				<!-- <svg
					class="ml-2 h-4 w-4"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/></svg> -->
			</button>

			<!-- Dropdown menu -->
			<div
				id="dropdownDefaultCheckbox"
				class="z-10 hidden w-48 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
				style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 442px);"
				data-popper-reference-hidden=""
				data-popper-escaped=""
				data-popper-placement="bottom"
			>
				<ul
					class="space-y-3 p-3 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownCheckboxButton"
				>
					<li>
						<div class="flex items-center">
							<input
								id="checkbox-item-1"
								type="checkbox"
								value=""
								class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
							/>
							<label
								for="checkbox-item-1"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Default checkbox</label
							>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<input
								checked
								id="checkbox-item-2"
								type="checkbox"
								value=""
								class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
							/>
							<label
								for="checkbox-item-2"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Checked state</label
							>
						</div>
					</li>
					<li>
						<div class="flex items-center">
							<input
								id="checkbox-item-3"
								type="checkbox"
								value=""
								class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
							/>
							<label
								for="checkbox-item-3"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>Default checkbox</label
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- <button
			type="submit"
			class="ml-2 rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
			<span class="sr-only">Search</span>
		</button> -->
	</form>

	<span class="text-xs text-gray-500">
		Last updated at {new Date(data.date[0].commit.author.date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'UTC',
			timeZoneName: 'short'
		})}
	</span>
</header>
