<script>
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<div class="h-full flex flex-col p-6">
	<main class="text-center">
		<h1 class="uppercase font-bold mb-0">OOPS!</h1>
		<p class="mt-0">Something went wrong, we cannot find the page you are referring to.</p>
		<p class="mt-12">
			<Link href="/" class="underline-none">
				<Button class="px-4">Go back</Button>
			</Link>
		</p>
	</main>
</div>
