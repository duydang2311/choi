<script lang="ts">
	export let value: string | undefined = undefined;
</script>

<input
	on:blur
	on:input
	bind:value
	{...$$restProps}
	class="transition ease-in-out border-fill-300 placeholder-text-fill-950 rounded
    outline-none
    focus:ring-2 focus:ring-fill-400 focus:border-transparent"
/>
