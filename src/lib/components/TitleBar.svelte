<script lang="ts">
	import { appWindow } from '@tauri-apps/api/window';
	import Minus from '~icons/heroicons/minus';
	import Stop from '~icons/heroicons/stop';
	import XMark from '~icons/heroicons/x-mark';
	import Square2Stack from '~icons/heroicons/square-2-stack';
	import Logo from './Logo.svelte';
	import { onMount } from 'svelte';

	let maximized = false;

	async function toggleMaximized() {
		maximized = await appWindow.toggleMaximize().then(() => appWindow.isMaximized());
	}

	onMount(async () => {
		maximized = await appWindow.isMaximized();
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header
	data-tauri-drag-region
	class="fixed top-0 left-0 right-0 flex justify-between items-start px-2 py-2"
	on:dblclick={async () => {
		maximized = await appWindow.isMaximized();
	}}
>
	<Logo class="h-10 pointer-events-none" />
	<nav
		class="z-[calc(9e99)] flex gap-x-2 justify-end
		select-none items-center transition duration-100 ease-in-out"
	>
		<button
			class="p-0 border-none transition ease-in-out hover:text-yellow-500 cursor-default"
			on:click={() => {
				appWindow.minimize();
			}}
		>
			<Minus class="w-6 h-6" />
		</button>
		{#if maximized}
			<button
				class="p-0 border-none transition ease-in-out hover:text-green-500 cursor-default"
				on:click={toggleMaximized}
			>
				<Square2Stack class="w-6 h-6" />
			</button>
		{:else}
			<button
				class="p-0 border-none transition ease-in-out hover:text-green-500 cursor-default"
				on:click={toggleMaximized}
			>
				<Stop class="w-6 h-6" />
			</button>
		{/if}
		<button
			class="p-0 border-none transition ease-in-out hover:text-red-500 cursor-default"
			on:click={() => {
				appWindow.close();
			}}
		>
			<XMark class="w-6 h-6" />
		</button>
	</nav>
</header>
