<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let blue = false;

	const onClose = (e) => {
		if (e.target.id === 'modal-background') close();
	};
</script>

<div
	id="modal-background"
	tabindex="-1"
	class="fixed inset-0 top-0 right-0 left-0 z-50 flex h-full items-center justify-center overflow-y-auto overflow-x-hidden"
	aria-hidden="true"
	on:click={onClose}
>
	<slot />
</div>
<div class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80" />
