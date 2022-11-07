<script>
	/**
	 * @type {any[]}
	 */
	export let filteredList = [];
	export let index = 0;
	// export let listOffsetHeight = 0;
	// export let hidden = true;
</script>

<div class="group/item rounded-xl py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 sm:py-4">
	<div class="mb-4 flex items-baseline space-x-4">
		<div class="min-w-0 flex-1">
			<a href={filteredList[index].sourceLocation}>
				<p class="truncate text-xl font-medium text-gray-900 hover:underline dark:text-white">
					{filteredList[index].name}
				</p>
			</a>
			<p class="truncate text-base text-gray-500 dark:text-gray-400">
				{filteredList[index].description}
			</p>
		</div>
		{#if filteredList[index].installed && filteredList[index].installed_version !== filteredList[index].latest}
			<button
				class="group/update relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-xs font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover/update:from-cyan-500 group-hover/update:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
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
				class="relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden bg-opacity-0 p-0.5 text-xs"
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
			<!-- <button class="py-2 px-3">
				<span
					class="rounded bg-blue-100 px-2.5 text-xs font-semibold text-blue-800 hover:bg-blue-200 dark:bg-blue-200 dark:text-blue-800 dark:hover:bg-blue-300"
					>{Object.keys(filteredList[index].versions)[0]}
				</span>
			</button> -->
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
			<span class="font-medium dark:text-white">{Object.keys(filteredList[index].authors)[0]}</span>
		</div>
		{#if filteredList[index].installed}
			<div
				class="inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-white "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
				<span class="sr-only">Icon description</span>
			</div>
		{:else}
			<div class="invisible group-hover/item:visible">
				<button
					type="button"
					class="inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium text-white hover:bg-gray-100 dark:hover:bg-gray-800"
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
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>

					<span class="sr-only">Icon description</span>
				</button>
			</div>
		{/if}
	</div>
</div>
