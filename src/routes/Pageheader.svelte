<script>
	import { onMount } from 'svelte';
	import { get } from 'idb-keyval';

	export let searchTerm = '';
	export let hh = 0;
	let neos_folder = false;
	export let loaded = false;

	onMount(async () => {
		if (await get('NeosVR')) {
			neos_folder = true;
		}
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
		<div class="flex flex-1 items-center space-x-2">
			<img
				class="hidden h-9 w-9 saturate-[.8] hover:animate-spin sm:inline-block"
				src="/neos.svg"
				alt="Neos Logo"
			/>
			<h1 class="text-xl font-extrabold text-gray-900 dark:text-white sm:text-2xl ">
				NeosVR
				<small class=" font-semibold text-gray-500 dark:text-gray-400">Mod Manager </small>
				<span
					class="rounded bg-orange-100 px-2.5 py-0.5 text-[.6rem] font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900"
					>Alpha</span
				>
			</h1>
		</div>
		<!-- <button
			id="butDirectory"
			type="button"
			class="mr-2 rounded-md border border-gray-800 px-2.5 py-1 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
			>Open Folder</button
		> -->
		<button
			id="setNeosDirectory"
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			{#if neos_folder}
				{#if loaded}
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
					Loaded
				{:else}
					<!-- <svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-red-500"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg> -->
					<!-- <svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-yellow-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
						/> 
					</svg>-->
					<!-- 
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-yellow-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg> -->

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="mr-2 -ml-1 h-5 w-5 text-yellow-500"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>

					Load Mods
				{/if}
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
				<span>Select <code>NeosVR</code> Folder</span>
			{/if}
		</button>
		<a
			href="https://github.com/hazre/neosvr-mod-manager"
			data-tooltip-target="tooltip-github-2"
			class="mr-1 hidden items-center rounded-lg border border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:text-gray-300  dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:inline-block"
		>
			<svg
				class="h-5 w-5"
				aria-hidden="true"
				focusable="false"
				data-prefix="fab"
				data-icon="github"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 496 512"
				><path
					fill="currentColor"
					d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
				/></svg
			>
			<span class="sr-only">View on Github</span>
		</a>
		<!-- <button
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			FAQ
		</button> -->
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
					placeholder="Search for Mods name, description, author..."
					bind:value={searchTerm}
				/>
			</div>
		</div>

		<button
			id="dropdownSearchButton"
			data-dropdown-toggle="dropdownSearch"
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
			</svg></button
		>

		<!-- Dropdown menu -->
		<div
			id="dropdownSearch"
			class="z-10 hidden w-60 rounded bg-white shadow dark:bg-gray-700"
			style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 10px);"
			data-popper-reference-hidden=""
			data-popper-escaped=""
			data-popper-placement="bottom"
		>
			<div class="p-3">
				<label for="input-group-search" class="sr-only">Search</label>
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-5 w-5 text-gray-500 dark:text-gray-400"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"
							/></svg
						>
					</div>
					<input
						type="text"
						id="input-group-search"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="Search user"
					/>
				</div>
			</div>
			<ul
				class="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
				aria-labelledby="dropdownSearchButton"
			>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-11"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-11"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Bonnie Green</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							checked
							id="checkbox-item-12"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-12"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Jese Leos</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-13"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-13"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Michael Gough</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-14"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-14"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Robert Wall</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-15"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-15"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Joseph Mcfall</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-16"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-16"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Leslie Livingston</label
						>
					</div>
				</li>
				<li>
					<div class="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
						<input
							id="checkbox-item-17"
							type="checkbox"
							value=""
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
						/>
						<label
							for="checkbox-item-17"
							class="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300"
							>Roberta Casas</label
						>
					</div>
				</li>
			</ul>
			<a
				href="#"
				class="flex items-center border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline dark:border-gray-600 dark:bg-gray-700 dark:text-red-500 dark:hover:bg-gray-600"
			>
				<svg
					class="mr-1 h-5 w-5"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z"
					/></svg
				>
				Delete user
			</a>
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

	<div
		class="flex flex-col items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:flex-row"
	>
		<div>
			{#if data.date[0]?.commit !== undefined}
				<span>
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
			{/if}
		</div>
		<span class="hidden sm:inline-block">&bull;</span>
		<span
			>Powered by <a
				class="hover:underline"
				href="https://www.neosmodloader.com/"
				target="_blank"
				rel="noreferrer noopener">NeosModLoader</a
			></span
		>
		<span class="hidden sm:inline-block">&bull;</span>
		<span
			>Made by <a
				class="hover:underline"
				href="https://twitter.com/hazreh"
				target="_blank"
				rel="noreferrer noopener">hazre</a
			></span
		>
	</div>
</header>
