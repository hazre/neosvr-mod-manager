<script>
	import { deleteFile, download } from '$lib/helper';
	import { values } from 'idb-keyval';

	/**
	 * @type {any[]}
	 */
	export let filteredList = [];
	export let index = 0;
	let hovered = false;
	let loading = false;
	const handleMouseOver = () => (hovered = true);
	const handleMouseOut = () => (hovered = false);

	const getFile = async () => {
		loading = true;
		let result = await download(
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
		<div class="min-w-0 flex-1">
			<a
				class="mr-2 truncate text-xl font-medium text-gray-900 hover:underline dark:text-white"
				href={filteredList[index].sourceLocation}
			>
				{filteredList[index].name}
			</a>
			<span
				class="mr-2 inline-flex items-center rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="mr-1 h-3 w-3"
				>
					<path
						fill-rule="evenodd"
						d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
						clip-rule="evenodd"
					/>
				</svg>
				{filteredList[index].category}
			</span>
			{#if filteredList[index].versions[filteredList[index].latest]?.dependencies}
				{#each Object.values(filteredList[index].versions[filteredList[index].latest]?.dependencies) as dependency}
					<span
						class="mr-2 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs  font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="mr-1 h-3 w-3"
						>
							<path
								fill-rule="evenodd"
								d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
								clip-rule="evenodd"
							/>
						</svg>
						{dependency.filename}
					</span>
				{/each}
			{/if}
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
				<span class="relative bg-white bg-opacity-0 py-2 px-3 transition-all duration-75 ease-in">
					<button
						class="ml-2 inline-flex items-center justify-center rounded bg-blue-100 px-2.5 text-xs font-semibold text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
					>
						{filteredList[index].installed
							? filteredList[index].installed_version
							: Object.keys(filteredList[index].versions)[0]}
					</button>
				</span>
			</div>
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
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<button
					on:click={delFile}
					type="button"
					on:mouseover={handleMouseOver}
					on:mouseout={handleMouseOut}
					class="mr-3 inline-flex items-center rounded-lg border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					{#if loading}
						<svg
							aria-hidden="true"
							role="status"
							class="h-5 w-5 animate-spin text-white"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						<span class="sr-only">Loading...</span>
					{:else if hovered}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-5 w-5 text-red-500"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
						<span class="sr-only">Uninstall Button</span>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							stroke="currentColor"
							class="h-5 w-5 text-green-500"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
						<span class="sr-only">Installed</span>
					{/if}
				</button>
			</div>
		{:else}
			<div class="invisible group-hover/item:visible">
				<button
					on:click={getFile}
					type="button"
					class="mr-3 inline-flex items-center rounded-lg border-gray-200 p-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500  dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
				>
					{#if loading}
						<svg
							aria-hidden="true"
							role="status"
							class="h-5 w-5 animate-spin text-white"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						<span class="sr-only">Loading...</span>
					{:else}
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
								d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
							/>
						</svg>
						<span class="sr-only">Install button</span>
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>
