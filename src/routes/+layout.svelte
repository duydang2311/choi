<script lang="ts">
	import TitleBar from '$lib/components/TitleBar.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="fixed w-screen h-screen bg-gradient-to-b from-fill-100 to-fill-50 -z-[calc(9e999)]" />
{#key data.url.href}
	<div class="pt-12 h-full w-full absolute" transition:fade={{ duration: 200, easing: sineInOut }}>
		<slot />
	</div>
{/key}
<TitleBar />
