<script>
	const windows_path = `%PROGRAMFILES(X86)%\\Steam\\steamapps\\common\\NeosVR`;
	const linux_path = `~/.steam/steam/steamapps/common/NeosVR`;
</script>

<div class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
	{#if window.navigator.userAgent.toLowerCase().includes('windows')}
		<div class="font-medium">Common NeosVR installation path:</div>
		<div class="flex items-center justify-center space-x-1">
			<p>Windows:</p>
			<code class="select-all rounded bg-gray-100 py-0.5  px-2.5 text-xs dark:bg-gray-600">
				{windows_path}
			</code>
			<button
				class="border-gray-200 p-0.5 text-gray-600 hover:text-blue-700  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white"
				on:click={() => navigator.clipboard.writeText(windows_path)}
			>
				<svg
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/></svg
				>
			</button>
		</div>
	{:else if window.navigator.userAgent.toLowerCase().includes('linux')}
		<div class="font-medium">Common NeosVR installation path:</div>
		<div class="flex items-center justify-center space-x-1">
			Linux:
			<code class="select-all rounded bg-gray-100 py-0.5  px-2.5 text-xs dark:bg-gray-600">
				{linux_path}
			</code>
			<button
				class="border-gray-200 p-0.5 text-gray-600 hover:text-blue-700  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white"
				on:click={() => navigator.clipboard.writeText(linux_path)}
			>
				<svg
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/></svg
				>
			</button>
		</div>
	{/if}
</div>
