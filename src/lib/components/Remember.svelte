<script lang="ts">
	export let value: any;

	let lastValue = value;
	$: if (value) lastValue = value;
</script>

{lastValue}
