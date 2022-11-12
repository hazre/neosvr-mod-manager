<script>
	import HeroiconsClipboardDocument from '~icons/heroicons/clipboard-document';

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
			<!-- <p>If your installation is under <code>Program Files (x86)</code> you need to create a</p> -->
			<!-- <button
				class="border-gray-200 p-0.5 text-gray-600 hover:text-blue-700  dark:border-gray-600 dark:text-gray-400 dark:hover:text-white"
				on:click={() => navigator.clipboard.writeText(windows_path)}
			>
				<HeroiconsClipboardDocument class="h-4 w-4" />
			</button> -->
		</div>
		<br />
		<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
			<b>Important:</b> Due to restrictions in the browser, users who have their Neos installation
			on the <code>C:\</code>
			drive will need to create a "junction link" to their Neos installation folder. Doing this allows
			the browser to access the folder from a form of shortcut rather than access the directory directly,
			bypassing the restriction and allowing native access to your Neos installation folder. Instructions
			for creating a directory junction can be found
			<a
				class="hover:underline"
				href="https://mywindowshub.com/how-to-create-and-delete-a-junction-link-on-windows-10/"
				target="_blank"
				rel="noreferrer noopener">here</a
			>
		</p>
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
				<HeroiconsClipboardDocument class="h-4 w-4" />
			</button>
		</div>
		<br />
		<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
			<b>Important:</b> You might need to create a symbolic link to your Neos installation, if your browser
			is saying that it can't access system files.
		</p>
	{/if}
</div>
