<script lang="ts">
	export let pending: boolean;
</script>

<div class="relative overflow-hidden">
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition duration-200 {!pending
			? 'ease-out scale-0 opacity-0'
			: 'ease-in'}"
	>
		<slot name="pending" />
	</div>
	<div
		class="transition text-icon-base {pending
			? 'duration-200 ease-in scale-0 opacity-0'
			: 'duration-500 ease-out'}"
	>
		<slot />
	</div>
</div>
