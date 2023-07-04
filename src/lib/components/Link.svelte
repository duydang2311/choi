<script lang="ts">
	export let href: string;
</script>

<a
	{...$$restProps}
	{href}
	class="font-bold text-fill-900 underline underline-offset-2
	transition ease-in-out outline-none rounded
	hover:underline-fill-950
	focus-visible:ring-2 focus-visible:ring-fill-400
	visited:text-fill-700 {$$restProps.class}"><slot /></a
>
