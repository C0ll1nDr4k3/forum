/// src/routes/api/posts/+server.ts

import { json } from "@sveltejs/kit";
import sql from "$lib/db/database";
import type { Post } from "$lib/common/Post";

export async function POST(event: Request): Promise<Response> {
	console.log("POST /api/posts");

	try {
		const { threadId, userId, content } = await event.json();
		const [post] = await sql`
						INSERT INTO posts (thread_id, user_id, content)
						VALUES (${threadId}, ${userId}, ${content})
						RETURNING *
				`;
		console.log("Created post", post);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: `Failed to create post with the following error ${error}` }),
			{ status: 500 }
		);
	}
	return new Response(JSON.stringify({ success: true }), {
		headers: { "Content-Type": "application/json" },
		status: 201
	});
}

export async function GET(event: Request): Promise<Response> {
	console.log("GET /api/posts", event);
	const posts: Post[] = [
		{
			threadId: 1,
			postId: 0,
			parentPostId: 1,
			userId: 69,
			content: "This is a test post.",
			likes: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			attachments: []
		}
	];

	return json(posts);
}
