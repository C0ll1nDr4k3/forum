// /api/threads/[catergoryId]/[threadId]

import sql from "$lib/db/database";
import { page } from "$app/state";

const categoryId = page.params.categoryId;
const threadId = page.params.threadId;

export async function GET(event: Request): Promise<Response> {
	console.log(`GET /api/threads/${categoryId}/${threadId}`, event);
	const [thread] = await sql`
      SELECT *
      FROM threads
      WHERE category_id = ${categoryId}
        AND thread_id = ${threadId};
	`;
	return new Response(JSON.stringify(thread), {
		headers: { "Content-Type": "application/json" }
	});
}

export async function POST(event: Request): Promise<Response> {
	console.log(`POST /api/threads/${categoryId}/${threadId}`, event);
	const { userId, title, content } = await event.json();
	const [thread] = await sql`
      INSERT INTO threads (category_id, user_id, title)
      VALUES (${categoryId}, ${userId}, ${title}, ${content})
      RETURNING *;
	`;
	console.log("Created thread", thread);
	return new Response(JSON.stringify({ success: true }), {
		headers: { "Content-Type": "application/json" },
		status: 201
	});
}
