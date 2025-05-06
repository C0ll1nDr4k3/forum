// /src/routes/graph/+page.ts
import type { Load } from "@sveltejs/kit";
import type { Node, Edge } from "@xyflow/svelte";

// Define the expected shape of the data returned by the load function
export interface GraphData {
	nodes: Node[];
	edges: Edge[];
	error?: string; // Optional error property
}

export const load: Load = async ({ fetch }): Promise<GraphData> => {
	// console.log("Loading data for /graph page...");
	try {
		const response = await fetch("/api/map"); // Fetch from your API route

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({})); // Try to parse error details
			throw new Error(
				`API request failed with status ${response.status}: ${errorData?.error || response.statusText}`
			);
		}

		const data = await response.json();

		// Validate the structure slightly (more robust validation could be added)
		if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
			throw new Error("Invalid data structure received from API");
		}

		// console.log(`Successfully loaded ${data.nodes.length} nodes and ${data.edges.length} edges.`);
		return {
			nodes: data.nodes as Node[], // Cast to specific types
			edges: data.edges as Edge[]
		};
	} catch (error) {
		console.error("Failed to load graph data:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown fetch error";
		return {
			nodes: [], // Return empty arrays on error
			edges: [],
			error: `Failed to load graph data: ${errorMessage}` // Pass error message to the page
		};
	}
};
