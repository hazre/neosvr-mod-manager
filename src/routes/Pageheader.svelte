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
	import HeroiconsEye from '~icons/heroicons/eye';
	import HeroiconsPencilSquare from '~icons/heroicons/pencil-square';
	import HeroiconsQuestionMarkCircle20Solid from '~icons/heroicons/question-mark-circle-20-solid';
	import { DarkMode, DropdownDivider, Popover } from 'flowbite-svelte';
	import Helpmodal from './Helpmodal.svelte';
	import Supportmodal from './Supportmodal.svelte';

	export let ready = false;
	export let searchTerm = '';
	export let loaded = false;
	export let installed = false;
	export let supported = true;
	export let availableUpdates = false;
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
	let helpModal = false;
	let supportModal = false;
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

	// check browser support forFileSystemHandle
	onMount(() => {
		typeof window.FileSystemHandle != 'undefined' ? (supported = true) : (supported = false);
	});

	let isDropdownOpen = false;
	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};
	const handleDropdownFocusLost = ({ relatedTarget, currentTarget }) => {
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		isDropdownOpen = false;
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

	$: availableUpdates ? (installed = true) : (installed = false);

	/**
	 * @type {{ date: { commit: { author: { date: string | number | Date; }; }; }[]; }}
	 */
	export let data;
</script>

<header
	class="fixed top-0 left-0 right-0 z-10 mx-auto flex max-w-8xl flex-col space-y-2 border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-900"
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
		<div
			class="inline-flex cursor-help items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900  dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
			id="mode"
		>
			{#if loaded}
				<HeroiconsPencilSquare class="mr-2 -ml-1 h-5 w-5" />
				Editing Mode
			{:else}
				<HeroiconsEye class="mr-2 -ml-1 h-5 w-5" />
				Browsing Mode
			{/if}
		</div>
		{#if ready}
			<Popover
				triggeredBy="#mode"
				class="w-72 bg-white text-sm font-light text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
				placement="bottom"
			>
				<div class="space-y-2 p-3">
					<h3 class="font-semibold text-gray-900 dark:text-white">Viewing Modes</h3>
					<div class="space-y-1">
						<div>
							<span class="font-medium">Browsing:</span>
							Let's you browse mods without installing them.
						</div>
						<div>
							<span class="font-medium">Editing: </span>Let's you install, update and uninstall your
							mods.
						</div>
					</div>
				</div>
			</Popover>
		{/if}
		{#if supported}
			<button
				id="setNeosDirectory"
				type="button"
				class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
			>
				{#if neos_folder}
					{#if loaded}
						<HeroiconsCheck20Solid class="mr-2 -ml-1 h-5 w-5 text-green-500" />
						Change Folder
					{:else}
						<HeroiconsArrowPath20Solid class="mr-2 -ml-1 h-5 w-5 text-yellow-500" />
						Load Mods
					{/if}
				{:else}
					<HeroiconsXMark20Solid class="mr-2 -ml-1 h-5 w-5 text-red-500" />
					<span>Select NeosVR Folder</span>
				{/if}
			</button>
		{:else}
			<button
				on:click={() => (supportModal = true)}
				class="inline-flex items-center rounded-lg border border-gray-200 px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
			>
				<HeroiconsXMark20Solid class="mr-2 -ml-1 h-5 w-5 text-red-500" />
				<span>Unsupported</span>
			</button>
			<Supportmodal bind:supportModal />
		{/if}
		<button
			on:click={() => (helpModal = true)}
			class="mr-1 hidden items-center rounded-lg border border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:text-gray-300  dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:inline-block"
		>
			<HeroiconsQuestionMarkCircle20Solid class="h-5 w-5" />
			<span class="sr-only">Help</span>
		</button>
		<Helpmodal bind:helpModal />
		<DarkMode
			btnClass="mr-1 hidden items-center rounded-lg border border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:text-gray-300  dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600 sm:inline-block"
		/>
		<a
			href="https://github.com/hazre/neosvr-mod-manager"
			target="_blank"
			rel="noreferrer noopener"
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

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div class="dropdown dropdown-end" on:focusout={handleDropdownFocusLost}>
			<label
				for="filter-category"
				on:click={handleDropdownClick}
				tabindex="0"
				class="inline-flex cursor-pointer items-center rounded-lg bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<HeroiconsAdjustmentsHorizontalSolid class="h-5 w-5" />
			</label>
			<div
				tabindex="0"
				id="dropdownSearch"
				class="dropdown-content z-10 mt-2 w-60 rounded-lg bg-white shadow dark:bg-gray-700"
				style:visibility={isDropdownOpen ? 'visible' : 'hidden'}
			>
				<div class="px-3 py-4">
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
					class="h-48 select-none overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
				>
					{#if loaded}
						<li>
							<div class="w-full rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<div class="flex items-center pl-2">
									<input
										disabled={availableUpdates ? true : false}
										bind:checked={installed}
										id="checkbox-item-installed"
										type="checkbox"
										value=""
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
									/>
									<label
										for="checkbox-item-installed"
										class="ml-2 w-full rounded py-2 text-sm font-medium  {availableUpdates
											? 'text-gray-400 dark:text-gray-500'
											: 'text-gray-900 dark:text-gray-300'}">Installed</label
									>
								</div>
							</div>
						</li>
						<li>
							<div class="w-full rounded hover:bg-gray-100 dark:hover:bg-gray-600">
								<div class="flex items-center pl-2">
									<input
										bind:checked={availableUpdates}
										id="checkbox-item-updates"
										type="checkbox"
										value=""
										class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
									/>
									<label
										for="checkbox-item-updates"
										class="ml-2 w-full rounded py-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>Updates</label
									>
								</div>
							</div>
						</li>
					{/if}
					{#each filteredCategories as category, i}
						{#if i === 0 && loaded}
							<DropdownDivider />
						{/if}
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
