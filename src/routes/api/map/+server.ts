// /src/routes/api/map/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import sql from "$lib/db/database";
import type { Node, Edge } from "@xyflow/svelte";
import { Position } from "@xyflow/svelte";

// Simple color mapping for categories (expand or make dynamic)
const categoryColors: Record<string, string> = {
	General: "#8BC34A", // Light Green
	Technology: "#2196F3", // Blue
	Support: "#FF9800", // Orange
	Announcements: "#9C27B0", // Purple
	default: "#607D8B" // Blue Grey (fallback)
};

// Helper function to get color based on category name
function getColorForCategory(categoryName: string | null | undefined): string {
	if (categoryName && categoryColors[categoryName]) {
		return categoryColors[categoryName];
	}
	return categoryColors["default"];
}

export async function GET(event: RequestEvent): Promise<Response> {
	// console.log("GET /api/map request received");

	try {
		// Fetch threads and posts in parallel
		const [threads, posts] = await Promise.all([
			sql`
                SELECT
                    t.thread_id,
                    t.title,
                    t.category_id,
                    c.name as category_name
                FROM
                    threads t
                LEFT JOIN
                    categories c ON t.category_id = c.category_id
                ORDER BY
                    t.created_at DESC;
            `,
			sql`
                SELECT
                    p.post_id,
                    p.thread_id,
                    p.parent_post_id,
                    LEFT(p.content, 75) as content_snippet -- Snippet for label
                FROM
                    posts p
                ORDER BY
                    p.created_at ASC;
            `
		]);

		// console.log(threads);
		// console.log(posts);

		const nodes: Node[] = [];
		const edges: Edge[] = [];

		// --- Node and Edge Creation ---

		let threadYOffset = 50;
		const threadXOffset = 0;
		const postXOffset = 350;
		const ySpacing = 100;
		const postYMap = new Map<number, number>(); // Track Y position for posts within a thread

		// Create Thread Nodes
		threads.forEach((thread) => {
			const nodeId = `thread-${thread.thread_id}`;
			const threadColor = getColorForCategory(thread.category_name);

			nodes.push({
				id: nodeId,
				type: "input", // Threads are starting points
				data: { label: `Thread: ${thread.title}` },
				position: { x: threadXOffset, y: threadYOffset },
				sourcePosition: Position.Right,
				targetPosition: Position.Left, // Allow connections back if needed later
				style: `background-color: ${threadColor}; color: white; border-radius: 5px; padding: 10px; width: 200px;`
			});
			postYMap.set(thread.thread_id, threadYOffset); // Initial Y for posts in this thread
			threadYOffset += ySpacing * 1.5; // Increase spacing between threads
		});

		// Create Post Nodes and Edges
		posts.forEach((post) => {
			const nodeId = `post-${post.post_id}`;
			const threadId = post.thread_id;
			const parentPostId = post.parent_post_id;

			// Determine position - very basic layout
			// Posts are positioned vertically relative to their thread's starting Y
			// More sophisticated layout (like tree layout) is complex to do here.
			const currentY = postYMap.get(threadId) ?? 50; // Default Y if thread not found (shouldn't happen)
			postYMap.set(threadId, currentY + ySpacing); // Increment Y for the next post in this thread/column

			nodes.push({
				id: nodeId,
				type: "default", // Regular node for posts
				data: { label: `Post ${post.post_id}: ${post.content_snippet}...` },
				position: { x: postXOffset, y: currentY }, // Simple column layout
				sourcePosition: Position.Right,
				targetPosition: Position.Left,
				style:
					"background-color: #424242; color: white; border-radius: 3px; padding: 8px; font-size: 0.9em; width: 250px;"
			});

			// Create Edges
			let sourceId: string;
			// let sourceHandle: string | undefined = undefined; // Not strictly needed for default handles
			const targetId = nodeId;

			if (parentPostId) {
				// This post is a reply to another post
				sourceId = `post-${parentPostId}`;
			} else {
				// This post is a direct reply to the thread (root post)
				sourceId = `thread-${threadId}`;
			}

			// Ensure source node exists before creating edge (safety check)
			// Note: In a simple fetch-all like this, they should exist, but good practice
			const sourceNodeExists = nodes.some((n) => n.id === sourceId);
			if (sourceNodeExists) {
				edges.push({
					id: `e-${sourceId}-to-${targetId}`,
					source: sourceId,
					target: targetId,
					// sourceHandle: sourceHandle, // Only needed for custom handles
					animated: true,
					style: "stroke: '#ccc', strokeWidth: 2" // Style edges
				});
			} else {
				console.warn(`Source node ${sourceId} not found for edge to ${targetId}`);
			}
		});

		// console.log(`Generated ${nodes.length} nodes and ${edges.length} edges.`);
		return json({ nodes, edges });
	} catch (error) {
		console.error("Error fetching map data:", error);
		// Type assertion for error object
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		return json({ error: "Failed to fetch map data", details: errorMessage }, { status: 500 });
	}
}
