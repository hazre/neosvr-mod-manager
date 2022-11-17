<script>
	import { Modal } from 'flowbite-svelte';
	export let supportModal = false;
</script>

<Modal size="xs" bind:open={supportModal} autoclose>
	<div class="space-y-2 p-6 text-center">
		<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
			You seem to be using an unsupported browser
		</h3>
		<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
			NeosVR Mod Manager's <b>Editing mode</b> currently works only on the following browsers
		</p>
		<div class="flex justify-center space-x-2">
			<img class="h-8 w-8" src="/edge.svg" alt="Edge Browser" />
			<img class="h-8 w-8 opacity-40 grayscale" src="/firefox.svg" alt="Firefox Browser" />
			<img class="h-8 w-8" src="/chrome.svg" alt="Chrome Browser" />
			<img class="h-8 w-8 opacity-40 grayscale" src="/safari.svg" alt="Safari Browser" />
			<img class="h-8 w-8" src="/brave.svg" alt="Brave Browser" />
		</div>
	</div>
</Modal>
