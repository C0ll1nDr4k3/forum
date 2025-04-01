// /api/thread/[categoryId]

import { page } from "$app/state";
import sql from "$lib/db/database";

const categoryId = page.params.categoryId;

export async function GET(event: Request): Promise<Response> {
	console.log(`GET /api/thread/${categoryId}`, event);
	const threads = await sql`
				SELECT * FROM threads
				WHERE category_id = ${categoryId};
		`;
	return new Response(JSON.stringify(threads), {
		headers: { "Content-Type": "application/json" }
	});
}

export async function POST(event: Request): Promise<Response> {
	console.log(`POST /api/thread/${categoryId}`);
	const { userId, title, content } = await event.json();
	const [thread] = await sql`
      INSERT INTO threads (category_id, user_id, title)
      VALUES (${categoryId}, ${userId}, ${title}, ${content})
      RETURNING *;
	`;
	console.log("Created thread", thread);
	const { thread_id } = thread;
	const [post] = await sql`
			INSERT INTO posts (thread_id, user_id, content)
			VALUES (${thread_id}, ${userId}, ${content});
		`;
	console.log("Created post", post);
	return new Response(JSON.stringify({ success: true }), {
		headers: { "Content-Type": "application/json" },
		status: 201
	});
}
