/// src/routes/api/posts/+server.ts

import { json } from "@sveltejs/kit";
import sql from "$lib/db/database";
import type { Post } from "$lib/forum/Post";

export async function POST(event: Request): Promise<Response> {
	console.log("POST request received", event);
	return json({ message: "POST request received" });
}

export async function GET(event: Request): Promise<Response> {
	console.log("GET request received", event);
	const posts: Post[] = [
		{
			threadId: 1,
			postId: 0,
			parentPostId: 1,
			userId: 1,
			content: "This is a test post",
			likes: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			attachments: []
		}
	];

	return json(posts);
}
