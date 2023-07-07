<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { Tauri } from "$lib/services/tauri";
    
    let path: string = '';
    async function openDialog() {
        await Tauri.instance.invoke('plugin:home|open_file_dialog');
    }
</script>
<div>
    <audio controls src={'asset://' + path} />
    <Button type="button" on:click={openDialog}>
        Open
    </Button>
</div>
