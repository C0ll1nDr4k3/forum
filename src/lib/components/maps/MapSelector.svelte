<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Waypoints, FolderTree, Network } from "lucide-svelte";
	import { goto } from "$app/navigation";

	let options = { graph: Waypoints, tree: Network, directory: FolderTree };

	let selected = "graph";

	function onClick(option: string) {
		selected = option;
		goto(`/map/${option}`);
	}
</script>

<div class="flex space-x-4">
	{#each Object.entries(options) as [Option, Icon]}
		<Button variant={selected === Option ? "outline" : "default"} onclick={() => onClick(Option)}>
			<Icon />
			{Option}
		</Button>
	{/each}
</div>
