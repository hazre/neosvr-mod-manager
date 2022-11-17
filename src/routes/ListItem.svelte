<script>
	import { deleteFile, downloadFile } from '$lib/helper';
	import HeroiconsCheck20Solid from '~icons/heroicons/check-20-solid';
	import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid';
	import HeroiconsArrowDownTray20Solid from '~icons/heroicons/arrow-down-tray-20-solid';
	import HeroiconsTagSolid from '~icons/heroicons/tag-solid';
	import HeroiconsExclamationTriangleSolid from '~icons/heroicons/exclamation-triangle-solid';
	import HeroiconsLink20Solid from '~icons/heroicons/link-20-solid';
	import Loadingicon from './Loadingicon.svelte';
	import Changelog from './Changelog.svelte';
	import { Accordion, AccordionItem } from 'svelte-accessible-accordion';

	/**
	 * @type {any[]}
	 */
	export let filteredList = [];
	export let index = 0;
	export let loaded = false;
	let hovered = false;
	let loading = false;
	let showChangelog = false;
	const handleMouseOver = () => (hovered = true);
	const handleMouseOut = () => (hovered = false);

	const getFile = async () => {
		loading = true;
		let result = await downloadFile(
			filteredList[index].versions[filteredList[index].latest].artifacts[0]
		);
		if (!result) return null;
		filteredList[index].installed = true;
		filteredList[index].installed_version = filteredList[index].latest;
		loading = false;
		console.log(filteredList[index]);
	};

	const delFile = async () => {
		loading = true;
		let result = await deleteFile(
			filteredList[index].versions[filteredList[index].installed_version].artifacts[0]
		);
		if (!result) return null;
		filteredList[index].installed = false;
		loading = false;
		console.log(filteredList[index]);
	};
</script>

<div class="group/item rounded-xl py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 sm:py-4">
	<div class="mb-4 flex items-baseline space-x-4">
		<div class="flex min-w-0 flex-1 flex-col items-start">
			<div class="flex flex-wrap items-center">
				<a href={filteredList[index].sourceLocation} class="max-w-xl">
					<p
						class="mr-2 truncate text-xl font-medium text-gray-900 hover:underline dark:text-white"
					>
						{filteredList[index].name}
					</p>
				</a>
				<span
					class="mr-2 inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
				>
					<HeroiconsTagSolid class="mr-1 h-3 w-3" />
					{filteredList[index].category}
				</span>
				{#if filteredList[index].versions[filteredList[index].latest]?.dependencies}
					{#each Object.values(filteredList[index].versions[filteredList[index].latest]?.dependencies) as dependency}
						<span
							class="mr-2 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs  font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
						>
							<HeroiconsExclamationTriangleSolid class="mr-1 h-3 w-3" />
							{dependency.filename}
						</span>
					{/each}
				{/if}
			</div>
			<p class="truncate text-base text-gray-500 dark:text-gray-400">
				{filteredList[index].description}
			</p>
		</div>
		{#if filteredList[index].installed && filteredList[index].installed_version !== filteredList[index].latest}
			<button
				on:click={getFile}
				class="group/update relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-xs font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover/update:from-cyan-500 group-hover/update:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
			>
				<span
					class="relative rounded-md bg-white py-2 px-3 transition-all duration-75 ease-in group-hover/update:bg-opacity-0 dark:bg-gray-900"
				>
					Update
					<span
						class="ml-2 inline-flex items-center justify-center rounded bg-blue-100 px-2.5 text-xs font-semibold text-blue-800 group-hover/update:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:group-hover/update:bg-blue-300"
					>
						{filteredList[index].latest}
					</span>
				</span>
			</button>
		{:else}
			<div
				class="relative inline-flex items-center justify-center overflow-hidden bg-opacity-0 p-0.5 text-xs"
			>
				<span class="relative bg-opacity-0 py-2 px-3 transition-all duration-75 ease-in">
					<button
						on:click={() => (showChangelog = true)}
						class="ml-2 inline-flex items-center justify-center rounded bg-blue-100 px-2.5 text-xs font-semibold text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
					>
						{filteredList[index].installed_version
							? filteredList[index].installed_version
							: filteredList[index].latest}
					</button>
				</span>
			</div>
		{/if}
		{#if showChangelog}
			<Changelog on:close={() => (showChangelog = false)}>
				<Accordion class="w-full max-w-2xl">
					{#each Object.keys(filteredList[index].versions).sort( (a, b) => b.localeCompare(a) ) as version, i}
						<AccordionItem title={filteredList[index].name + ' - ' + version} expanded={i === 0}>
							{#if filteredList[index].versions[version]?.changelog}
								{filteredList[index].versions[version]?.changelog}
							{:else}
								No Changelog
							{/if}
						</AccordionItem>
					{/each}
				</Accordion>
			</Changelog>
		{/if}
	</div>
	<div class="flex items-baseline space-x-4">
		<div class="flex min-w-0 flex-1 items-center space-x-2">
			<object
				data="https://github.com/{new URL(filteredList[index].sourceLocation).pathname.split(
					'/'
				)[1]}.png?size=200"
				type="image/png"
				title="profile image"
				class="h-7 w-7 rounded-full"
			>
				<div
					class="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600"
				>
					<span class="font-medium uppercase text-gray-600 dark:text-gray-300">
						{Object.keys(filteredList[index].authors)[0].charAt(0)}
					</span>
				</div>
			</object>
			<span class="font-medium text-gray-900 dark:text-white"
				>{Object.keys(filteredList[index].authors)[0]}</span
			>
		</div>
		{#if filteredList[index].installed}
			<div>
				<!-- TODO: Add Enable/Disable -->
				<!-- <label for="small-toggle" class="relative mb-5 inline-flex cursor-pointer items-center">
					<input type="checkbox" value="" id="small-toggle" class="peer sr-only" checked />
					<div
						class="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
					/>
				</label> -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<button
					on:click={delFile}
					type="button"
					on:mouseover={handleMouseOver}
					on:mouseout={handleMouseOut}
					class="mr-3 inline-flex items-center rounded-lg border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					{#if loading}
						<Loadingicon />
						<span class="sr-only">Loading...</span>
					{:else if hovered}
						<HeroiconsXMark20Solid class="h-5 w-5 text-red-500" />
						<span class="sr-only">Uninstall Button</span>
					{:else}
						<HeroiconsCheck20Solid class="h-5 w-5 text-green-500" />
						<span class="sr-only">Installed</span>
					{/if}
				</button>
			</div>
		{:else if !loaded}
			<div class="invisible group-hover/item:visible">
				<a
					href={filteredList[index].versions[filteredList[index].latest].releaseUrl}
					target="_blank"
					rel="noreferrer noopener"
					class="mr-3 inline-flex items-center rounded-lg border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					<HeroiconsLink20Solid class="h-5 w-5" />
					<span class="sr-only">Link to release</span>
				</a>
			</div>
		{:else}
			<div class="{loading ? 'visible' : 'invisible'} group-hover/item:visible">
				<button
					on:click={getFile}
					type="button"
					class="mr-3 inline-flex items-center rounded-lg border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					{#if loading}
						<Loadingicon />
						<span class="sr-only">Loading...</span>
					{:else}
						<HeroiconsArrowDownTray20Solid class="h-5 w-5" />
						<span class="sr-only">Install button</span>
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>
