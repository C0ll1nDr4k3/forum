import { page } from "$app/state";
import sql from "$lib/db/database";

export async function GET(event: Request): Promise<Response> {
	const threadId = page.params.threadId;
	console.log(`GET /api/posts/${threadId}`, event);
	const posts = await sql`
				SELECT * FROM posts
				WHERE thread_id = ${threadId}
				ORDER BY created_at DESC
		`;
	return new Response(JSON.stringify(posts), {
		headers: { "Content-Type": "application/json" }
	});
}

export async function POST(event: Request): Promise<Response> {
	const threadId = page.params.threadId;
	console.log(`POST /api/posts/${threadId}`);
	const { userId, content, attachments } = await event.json();
	try {
		const [post] = await sql`
						INSERT INTO posts (thread_id, user_id, content)
						VALUES (${threadId}, ${userId}, ${content})
						RETURNING *
				`;
		if (attachments) {
			const { post_id } = post;
			for (const attachment of attachments) {
				await sql`
					INSERT INTO attachments (post_id, file_url)
					VALUES (${post_id}, ${attachment.fileUrl})
				`;
			}
		}
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
