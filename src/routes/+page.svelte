<script>
	// @ts-nocheck
	import { getHandle, getHash, setHandleHashes, verifyPermission, getHighest } from '$lib/helper';
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import ListItem from './ListItem.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Pageheader from './Pageheader.svelte';
	import { onMount } from 'svelte';
	import Supportmodal from './Supportmodal.svelte';
	import { get, set } from 'idb-keyval';

	/** @type {import('./$types').PageData} */
	export let data;

	let vh = 0;
	let hh = 0;
	// let listOffsetHeight = 0;

	let list = Object.values(data.list.mods);
	let sortedList = list.sort((a, b) => a.name.localeCompare(b.name));
	let categories = data.categories.properties.mods.additionalProperties.properties.category.pattern
		.replace(/[\#^\\;$%@"<>()+,]/g, '')
		.split('|');

	let supported = true;
	let hidden = true;

	onMount(() => {
		if (typeof window.FileSystemHandle != 'undefined') {
			supported = true;
		} else {
			supported = false;
		}
	});

	onMount(() => {
		const butDir = document.getElementById('butDirectory');
		butDir.addEventListener('click', async () => {
			const directoryHandleOrUndefined = await get('mods');
			if (directoryHandleOrUndefined) {
				await verifyPermission(directoryHandleOrUndefined, true);
				console.log(directoryHandleOrUndefined);
				const hashes = await setHandleHashes(directoryHandleOrUndefined);
				hashes.forEach((hash, index) => {
					sortedList.map((mod) => {
						mod.latest = getHighest(Object.keys(mod.versions));
						Object.keys(mod.versions).map((version_key) => {
							Object.values(mod.versions).map((version) => {
								version.version = version_key;
								Object.values(version.artifacts).map((artifact) => {
									if (hash === artifact.sha256) {
										mod.installed = true;
										mod.installed_version = version_key;
									}
								});
							});
						});
					});
				});
				console.log('done');
				hidden = false;
				return;
			}
			console.log(await getHandle());
		});
	});

	/**
	 * @type {any[]}
	 */
	let filteredList = [];
	let searchTerm = '';
	$: if (searchTerm) {
		filteredList = sortedList.filter(
			(item) =>
				`${item.name} ${item.description} ${Object.keys(item.authors)[0]}`
					.toLowerCase()
					.indexOf(searchTerm.toLowerCase()) !== -1
		);
	} else {
		filteredList = [...sortedList];
	}
</script>

<svelte:window bind:innerHeight={vh} />

{#if !supported}
	<Supportmodal />
	<!-- {:else}
	<Pickmodal /> -->
{/if}

<main class="flex h-full w-full flex-col">
	<Pageheader bind:data bind:hh bind:searchTerm />
	<div
		class="list grow divide-y divide-gray-200 dark:divide-gray-700"
		style="--header-height: {hh}px"
	>
		{#if hidden}
			<div
				class="fixed inset-0 top-0 right-0 left-0 flex h-full flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
			>
				<p class="text-4xl font-medium">Mods are not loaded... 🤨</p>
				<p class=" font-light italic">Click on the funny button</p>
			</div>
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
