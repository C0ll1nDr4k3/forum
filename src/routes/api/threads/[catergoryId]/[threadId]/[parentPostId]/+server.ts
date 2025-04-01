// /api/threads/[catergoryId]/[threadId]/[parentPostId]/

import { page } from "$app/state";
import sql from "$lib/db/database";

const { categoryId, threadId, parentPostId } = page.params;

export async function GET(event: Request): Promise<Response> {
	console.log("GET request received", event);
	const posts = await sql`
      SELECT posts.post_id,
             posts.thread_id,
             threads.category_id
      FROM posts
               JOIN
           threads ON posts.thread_id = threads.thread_id
      WHERE threads.category_id = ${categoryId}
        AND posts.thread_id = ${threadId}
        AND posts.post_id = ${parentPostId};
	`;
	return new Response(JSON.stringify(posts), {
		headers: { "Content-Type": "application/json" }
	});
}
