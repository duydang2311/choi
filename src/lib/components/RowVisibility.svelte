<script lang="ts">
	export let visible = false;
</script>

<div
	class="grid ease-in-out duration-300 transition-[grid-template-rows_opacity] {!visible
		? 'grid-rows-[0fr]'
		: 'grid-rows-[1fr]'}"
>
	<div class="overflow-hidden">
		<div class={$$restProps.class}>
			<slot />
		</div>
	</div>
</div>
