// /api/threads/[threadId]

import sql from "$lib/db/database";
import { json } from "@sveltejs/kit";

export async function GET(event): Promise<Response> {
	const { threadId } = event.params;
	const [thread] = await sql`
      SELECT *
      FROM threads
      WHERE thread_id = ${threadId};
	`;
	return json(thread);
}

// export async function POST(event): Promise<Response> {
// 	const { threadId } = event.params;
// 	console.log(`POST /api/threads/${threadId}`, event);
// 	const { userId, title, content } = await event.json();
// 	const [thread] = await sql`
//       INSERT INTO threads (category_id, user_id, title)
//       VALUES (${userId}, ${title}, ${content})
//       RETURNING *;
// 	`;
// 	console.log("Created thread", thread);
// 	return new Response(JSON.stringify({ success: true }), {
// 		headers: { "Content-Type": "application/json" },
// 		status: 201
// 	});
// }
