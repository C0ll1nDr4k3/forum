<script lang="ts">
	import MapSelector from "$lib/components/maps/MapSelector.svelte";
	import Directory from "$lib/components/maps/directory/Directory.svelte";
	import Tree from "$lib/components/maps/tree/Tree.svelte";
	import Graph from "$lib/components/maps/graph/Graph.svelte";
	import selected from "$lib/components/maps/MapSelector.svelte";
</script>

<MapSelector bind:selected />

{#if $selected === "Directory"}
	<Directory />
{:else if selectedp === "Tree"}
	<Tree />
{:else if selectedMap === "Graph"}
	<Graph />
{/if}
