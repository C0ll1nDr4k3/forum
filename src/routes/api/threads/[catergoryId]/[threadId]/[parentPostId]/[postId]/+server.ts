// /api/threads/[catergoryId]/[threadId]/[postId]/
// This file does not expose a `POST` handler because the database is responsible for generating the `post_id` value.

import { page } from "$app/state";
import sql from "$lib/db/database";

const postId = page.params.postId;

export async function GET(event: Request): Promise<Response> {
	console.log(`GET /api/threads/${postId}`, event);
	const [post] = await sql`
      SELECT *
      FROM posts
      WHERE post_id = ${postId};
	`;
	return new Response(JSON.stringify(post), {
		headers: { "Content-Type": "application/json" }
	});
}
