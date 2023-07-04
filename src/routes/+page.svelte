<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('DOMContentLoaded', () => {
			console.log('ok');
		});
	});
</script>

<div class="w-full h-full flex flex-col gap-y-4 items-center justify-center">
	<Button>
		<Link href="/en/login" class="no-underline px-8">Log in</Link>
	</Button>
</div>
