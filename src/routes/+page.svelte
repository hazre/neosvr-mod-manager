<script>
	import {
		getHandle,
		setHandleHashes,
		verifyPermission,
		getLatestVersion,
		getFilenameUrl
	} from '$lib/helper';
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import ListItem from './ListItem.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Pageheader from './Pageheader.svelte';
	import { onMount } from 'svelte';
	import Supportmodal from './Supportmodal.svelte';
	import { get } from 'idb-keyval';

	/** @type {import('./$types').PageData} */
	export let data;

	let vh = 0;
	let hh = 0;

	let list = Object.values(data.list.mods);
	let sortedList = list.sort((a, b) => a.name.localeCompare(b.name));
	// remove plugins
	sortedList = sortedList.filter(function (item) {
		return item.category != 'Plugins';
	});
	// enchance list
	sortedList.map((mod) => {
		const key = Object.keys(mod.versions);
		mod.latest = getLatestVersion(key);
		key.map((version_key) => {
			mod.versions[version_key].version = version_key;
			if (mod.versions[version_key]?.dependencies) {
				Object.keys(mod.versions[version_key]?.dependencies).map((dependency) => {
					try {
						const lastdep = Object.keys(data.list.mods[dependency].versions);
						const lastartifact =
							data.list.mods[dependency].versions[getLatestVersion(lastdep)].artifacts[0];
						mod.versions[version_key].dependencies[dependency].url = lastartifact.url;
						mod.versions[version_key].dependencies[dependency].sha256 = lastartifact.sha256;
						mod.versions[version_key].dependencies[dependency].filename = getFilenameUrl(
							lastartifact.url
						);
					} catch (error) {
						console.error(error);
					}
				});
			}
		});
	});

	let categories = data.categories.properties.mods.additionalProperties.properties.category.pattern
		.replace(/[\#^\\;$%@"<>()+,]/g, '')
		.split('|');

	let supported = true;
	let loaded = false;
	let neos_folder = false;
	let hidden = true;
	/**
	 * @type {typeof import("./PickmodalText.svelte").default}
	 */
	let PickmodalText;

	onMount(async () => {
		PickmodalText = (await import('./PickmodalText.svelte')).default;
	});

	// check browser support forFileSystemHandle
	onMount(() => {
		if (window.__TAURI__ === undefined) typeof window.FileSystemHandle != 'undefined' ? (supported = true) : (supported = false);
	});

	onMount(() => {
		const butDir = document.getElementById('setNeosDirectory');
		if (butDir) {
			butDir.addEventListener('click', async () => {
				let directoryHandleOrUndefined = await get('NeosVR');
				if (!directoryHandleOrUndefined) {
					directoryHandleOrUndefined = await getHandle();
				}
				await verifyPermission(directoryHandleOrUndefined, true);
				let hashes = await setHandleHashes(await get('nml_mods'));
				hashes = await setHandleHashes(await get('nml_libs'));
				// @ts-ignore
				hashes.forEach((hash, index) => {
					sortedList.map((mod) => {
						const key = Object.keys(mod.versions);
						key.map((version_key) => {
							Object.values(mod.versions[version_key].artifacts).map((artifact) => {
								if (hash === artifact.sha256) {
									mod.installed = true;
									mod.installed_version = version_key;
								}
							});
						});
					});
				});
				console.info('Mods loaded');
				loaded = true;
				neos_folder = true;
				hidden = false;
				return;
			});
		}
	});

	/**
	 * @type {any[]}
	 */
	let installedList = [];
	let installed = false;
	$: if (installed) {
		installedList = sortedList.filter((item) => item.installed !== undefined || false);
	} else {
		installedList = [...sortedList];
	}

	/**
	 * @type {any[]}
	 */
	let categoryList = [];
	/**
	 * @type {any[]}
	 */
	let categoryFilter = [];
	$: if (categoryFilter.length !== 0) {
		categoryList = installedList.filter((item) =>
			categoryFilter.some((cat) => cat === item.category)
		);
	} else {
		categoryList = [...installedList];
	}

	/**
	 * @type {any[]}
	 */
	let filteredList = [];
	let searchTerm = '';
	$: if (searchTerm) {
		filteredList = categoryList.filter(
			(item) =>
				`${item.name} ${item.description} ${Object.keys(item.authors)[0]}`
					.toLowerCase()
					.indexOf(searchTerm.toLowerCase()) !== -1
		);
	} else {
		filteredList = [...categoryList];
	}
</script>

<svelte:window bind:innerHeight={vh} />

{#if !supported}
	<Supportmodal />
{/if}

<main class="flex h-full w-full flex-col">
	<Pageheader
		bind:data
		bind:hh
		bind:searchTerm
		{loaded}
		{categories}
		{neos_folder}
		bind:categoryFilter
		bind:installed
	/>
	<div
		class="list grow divide-y divide-gray-200 dark:divide-gray-700"
		style="--header-height: {hh}px"
	>
		{#if hidden}
			<svelte:component this={PickmodalText} />
		{:else}
			<VirtualList width="100%" height={vh} itemCount={filteredList.length} itemSize={141}>
				<div
					slot="item"
					let:index
					let:style
					{style}
					transition:scale={{ duration: 1000, easing: expoInOut }}
				>
					<ListItem {filteredList} {index} />
				</div>
			</VirtualList>
		{/if}
	</div>
</main>

<style>
	.list :global(.virtual-list-inner) {
		margin-top: var(--header-height);
	}
</style>
