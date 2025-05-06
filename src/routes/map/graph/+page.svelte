<script lang="ts">
	import { writable } from "svelte/store";

	// Svelte Flow imports
	import {
		Background,
		Controls,
		MiniMap,
		// Position, // Only needed if custom nodes use it directly
		SvelteFlow
	} from "@xyflow/svelte";

	// Import custom node components if you create them
	// import ThreadNode from './ThreadNode.svelte';
	// import PostNode from './PostNode.svelte';

	// Base styles
	import "@xyflow/svelte/dist/style.css";
	import { mode } from "mode-watcher";

	// 1. Access props passed from the load function
	// The type <PageData> provides type safety.
	let { data } = $props();

	// 2. Derive reactive values from the props.
	// Use nullish coalescing (??) to provide default empty arrays/undefined
	// if data or its properties are not yet available or loading failed.
	let nodes = $state(writable(data?.nodes ?? []));
	let edges = $state(writable(data?.edges ?? []));
	let graphError = $derived(data?.error); // Will be undefined if no error

	let bgColor = $state(mode.current === "dark" ? "#030816" : "#ffffff");

	// Define node types if you create custom components.
	// If using default types ('input', 'default') specified in the API,
	// you might not need custom nodeTypes unless overriding behavior/appearance.
	const nodeTypes = {
		// Add custom node types here if needed:
		// selectorNode: ColorSelectorNode, // From your original example
		// threadNode: ThreadNode,
		// postNode: PostNode
	};
</script>

{#if graphError}
	<!-- Display error if loading failed -->
	<div class="error-message">
		<p>Error loading graph:</p>
		<pre>{graphError}</pre>
	</div>
{:else}
	<!-- Render the graph if data loaded successfully -->
	<div class="graph">
		<SvelteFlow
			bind:nodes
			bind:edges
			{nodeTypes}
			style="background: {bgColor}"
			fitView
			fitViewOptions={{ padding: 0.1 }}
		>
			<Background />
			<Controls />
			<MiniMap />
		</SvelteFlow>
	</div>
{/if}

<style>
	.graph {
		height: 100vh;
		width: 100%;
	}
	.error-message {
		padding: 20px;
		background-color: #ffdddd;
		border: 1px solid #f44336;
		color: #f44336;
		margin: 20px;
		border-radius: 5px;
	}
	.error-message pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	/* Add any other necessary styles */
</style>
