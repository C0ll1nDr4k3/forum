<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Waypoints, FolderTree, Network } from "lucide-svelte";

	let options = { Graph: Waypoints, Tree: Network, Directory: FolderTree };

	let selected = "Graph";
</script>

<div class="flex space-x-4">
	{#each Object.entries(options) as [Option, Icon]}
		<Button
			variant={selected === Option ? "outline" : "default"}
			onclick={() => {
				selected = Option;
			}}
		>
			<Icon />
			{Option}
		</Button>
	{/each}
</div>
