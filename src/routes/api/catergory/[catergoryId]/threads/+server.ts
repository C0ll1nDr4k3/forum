// src/routes/api/category/[categoryId]/threads/+server.js
// import sql from "$lib/db/database"; // Assuming you have a db module using porsager/postgres
//
// export async function GET({ params }): Promise<Response> {
// 	const { categoryId } = params;
// 	try {
// 		const threads = await sql`
//             SELECT * FROM threads
//             WHERE category_id = ${categoryId}
//             ORDER BY created_at DESC
//             LIMIT 50
//         `;
// 		return new Response(JSON.stringify(threads), {
// 			headers: { "Content-Type": "application/json" }
// 		});
// 	} catch {
// 		return new Response(JSON.stringify({ error: "Failed to fetch threads" }), { status: 500 });
// 	}
// }
//
// // import { getSession } from "$lib/session"; // Function to get user session
//
// export async function POST({ params, request }) {
// 	const session = await getSession(request.headers.get("cookie"));
// 	if (!session.user) {
// 		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
// 	}
//
// 	const { categoryId } = params;
// 	const { title, content } = await request.json();
//
// 	try {
// 		const [thread] = await sql`
//             INSERT INTO threads (category_id, user_id, title)
//             VALUES (${categoryId}, ${session.user.id}, ${title})
//             RETURNING *
//         `;
//
// 		const [post] = await sql`
//             INSERT INTO posts (thread_id, user_id, content)
//             VALUES (${thread.thread_id}, ${session.user.id}, ${content})
//             RETURNING *
//         `;
//
// 		return new Response(JSON.stringify({ thread, post }), {
// 			headers: { "Content-Type": "application/json" },
// 			status: 201
// 		});
// 	} catch (error) {
// 		return new Response(
// 			JSON.stringify({ error: `Failed to create thread with the following error ${error}` }),
// 			{ status: 500 }
// 		);
// 	}
// }
