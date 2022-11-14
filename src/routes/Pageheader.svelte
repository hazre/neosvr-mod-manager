<script>
	import { onMount } from 'svelte';
	import { get } from 'idb-keyval';
	import { updateCategoryFilter } from '$lib/helper';
	import HeroiconsCheck20Solid from '~icons/heroicons/check-20-solid';
	import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid';
	import SimpleIconsGithub from '~icons/simple-icons/github';
	import HeroiconsMagnifyingGlass20Solid from '~icons/heroicons/magnifying-glass-20-solid';
	import HeroiconsAdjustmentsHorizontalSolid from '~icons/heroicons/adjustments-horizontal-solid';
	import HeroiconsArrowPath20Solid from '~icons/heroicons/arrow-path-20-solid';

	export let searchTerm = '';
	export let loaded = false;
	export let installed = false;
	/**
	 * @type {string[]}
	 */
	export let categories = [];
	/**
	 * @type {any[]}
	 */
	export let categoryFilter = [];
	export let hh = 0;
	// let darkmode = false;
	export let neos_folder = false;
	/**
	 * @type Intl.DateTimeFormatOptions
	 */
	const dateFormat = {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC',
		timeZoneName: 'short'
	};

	onMount(async () => {
		if (await get('NeosVR')) {
			neos_folder = true;
		}
	});

	/**
	 * @type {any[]}
	 */
	let filteredCategories = [];
	let searchTermCategory = '';
	// TODO: add categories and other filter options
	$: if (searchTermCategory) {
		filteredCategories = categories.filter(
			(category) => category.toLowerCase().indexOf(searchTermCategory.toLowerCase()) !== -1
		);
	} else {
		filteredCategories = [...categories];
	}

	/**
	 * @type {{ date: { commit: { author: { date: string | number | Date; }; }; }[]; }}
	 */
	export let data;
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 mx-4 flex flex-col space-y-2 border-gray-200 bg-white py-2.5 dark:bg-gray-900"
	bind:offsetHeight={hh}
>
	<div class="flex items-center space-x-2">
		<div class="flex flex-1 items-center space-x-2">
			<img
				class="hidden h-9 w-9 hover:animate-spin sm:inline-block"
				src="/nml.png"
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
		<button
			id="setNeosDirectory"
			type="button"
			class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
		>
			{#if neos_folder}
				{#if loaded}
					<HeroiconsCheck20Solid class="mr-2 -ml-1 h-5 w-5 text-green-500" />
					Loaded
				{:else}
					<HeroiconsArrowPath20Solid class="mr-2 -ml-1 h-5 w-5 text-yellow-500" />
					Load Mods
				{/if}
			{:else}
				<HeroiconsXMark20Solid class="mr-2 -ml-1 h-5 w-5 text-red-500" />
				<span>Select NeosVR Folder</span>
			{/if}
		</button>
		<a
			href="https://github.com/hazre/neosvr-mod-manager"
			target="_blank"
			rel="noreferrer noopener"
			data-tooltip-target="tooltip-github-2"
			class="mr-1 hidden items-center rounded-lg border border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:text-gray-300  dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:inline-block"
		>
			<SimpleIconsGithub class="h-5 w-5" />
			<span class="sr-only">View on Github</span>
		</a>
	</div>

	<form class="flex items-center space-x-2">
		<div class="w-full">
			<label
				for="default-search"
				class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Search</label
			>
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<HeroiconsMagnifyingGlass20Solid class="h-5 w-5 text-gray-500 dark:text-gray-400" />
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

		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<label
				tabindex="0"
				class="inline-flex cursor-pointer items-center rounded-lg bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<HeroiconsAdjustmentsHorizontalSolid class="h-5 w-5" />
			</label>
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				tabindex="0"
				id="dropdownSearch"
				class="dropdown-content z-10 mt-2 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
			>
				<div class="p-3">
					<label for="input-group-search" class="sr-only">Search</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<HeroiconsMagnifyingGlass20Solid class="h-5 w-5 text-gray-500 dark:text-gray-400" />
						</div>
						<input
							type="text"
							id="input-group-search"
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
							placeholder="Search categories"
							bind:value={searchTermCategory}
						/>
					</div>
				</div>
				<ul
					class="h-48 divide-y divide-gray-100 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:divide-gray-600 dark:text-gray-200"
				>
					<div class="py-1">
						<li>
							<div class="w-full rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<div class="flex items-center pl-2">
									<input
										bind:checked={installed}
										id="checkbox-item-installed"
										type="checkbox"
										value=""
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
									/>
									<label
										for="checkbox-item-installed"
										class="ml-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>Installed</label
									>
								</div>
							</div>
						</li>
					</div>
					<div class="py-1">
						{#each filteredCategories as category, i}
							<li>
								<div class="w-full rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<div class="flex items-center pl-2">
										<input
											on:change={(e) => {
												categoryFilter = updateCategoryFilter(categoryFilter, category);
											}}
											id="checkbox-item-{i}"
											type="checkbox"
											value=""
											class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
										/>
										<label
											for="checkbox-item-{i}"
											class="ml-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
											>{category}</label
										>
									</div>
								</div>
							</li>
						{/each}
					</div>
				</ul>
			</div>
		</div>
	</form>

	<ul
		class="list-horizontal flex flex-col items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 sm:flex-row"
	>
		<li>
			{#if data.date[0]?.commit !== undefined}
				<span>
					Last updated at <a
						href="https://github.com/neos-modding-group/neos-mod-manifest/commits/master/manifest.json"
						class="hover:underline"
						target="_blank"
						rel="noreferrer noopener"
					>
						{new Date(data.date[0].commit.author.date).toLocaleDateString(undefined, dateFormat)}
					</a>
				</span>
			{/if}
		</li>
		<li class="hidden sm:inline-block">&bull;</li>
		<li>
			Not affiliated with <a
				href="https://neos.com/"
				class="hover:underline"
				target="_blank"
				rel="noreferrer noopener">NeosVR</a
			>
		</li>
		<li class="hidden sm:inline-block">&bull;</li>
		<li>
			Powered by <a
				class="hover:underline"
				href="https://www.neosmodloader.com/"
				target="_blank"
				rel="noreferrer noopener">NeosModLoader</a
			>
		</li>
		<li class="hidden sm:inline-block">&bull;</li>
		<li>
			Made by <a
				class="hover:underline"
				href="https://twitter.com/hazreh"
				target="_blank"
				rel="noreferrer noopener">hazre</a
			>
		</li>
	</ul>
</header>
