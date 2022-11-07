<script>
	// @ts-nocheck
	import { getHandle, setHandleHashes, verifyPermission, getHighest, isMobile } from '$lib/helper';
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import ListItem from './ListItem.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
	import Pageheader from './Pageheader.svelte';
	import { onMount } from 'svelte';
	import Supportmodal from './Supportmodal.svelte';
	import { get } from 'idb-keyval';
	// import { invalidateAll } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	let vh = 0;
	let hh = 0;
	// let listOffsetHeight = 0;

	let list = Object.values(data.list.mods);
	let sortedList = list.sort((a, b) => a.name.localeCompare(b.name));
	sortedList = sortedList.filter(function (item) {
		return item.category != 'Plugins';
	});
	let categories = data.categories.properties.mods.additionalProperties.properties.category.pattern
		.replace(/[\#^\\;$%@"<>()+,]/g, '')
		.split('|');

	let supported = true;
	let mobile = false;
	let hidden = true;
	let PickmodalText;

	onMount(async () => {
		PickmodalText = (await import('./PickmodalText.svelte')).default;
	});

	onMount(() => {
		if (typeof window.FileSystemHandle != 'undefined') {
			supported = true;
		} else {
			supported = false;
		}
	});

	onMount(() => {
		if (isMobile()) {
			mobile = true;
		}
	});

	onMount(() => {
		const butDir = document.getElementById('butDirectory');
		butDir.addEventListener('click', async () => {
			const directoryHandleOrUndefined = await get('nml_mods');
			if (directoryHandleOrUndefined) {
				await verifyPermission(directoryHandleOrUndefined, true);
				const hashes = await setHandleHashes(directoryHandleOrUndefined);
				// TODO: clean up this mess..
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
				console.info('Mods loaded');
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
	// TODO: add categories and other filter options
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
{/if}

<!-- {#if mobile}
	<p>mobile</p>
{/if} -->

<main class="flex h-full w-full flex-col">
	<Pageheader bind:data bind:hh bind:searchTerm />
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
