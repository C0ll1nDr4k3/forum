<script>
	import { writable } from "svelte/store";
	import { SvelteFlow } from "@xyflow/svelte";

	const nodes = writable([
		{ id: "a", data: { label: "node a" }, position: { x: 0, y: 0 } },
		{ id: "b", data: { label: "node b" }, position: { x: 0, y: 100 } }
	]);

	const edges = writable([{ id: "e1-2", source: "a", target: "b" }]);
</script>

<SvelteFlow {nodes} {edges} fitView />
