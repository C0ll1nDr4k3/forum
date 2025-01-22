import sql from "$lib/db/database"; // Assuming you have a db module using porsager/postgres

export async function GET({ params }) {
	const { username } = params;
	try {
		const user = await sql`
            SELECT user_id, username, display_name, bio, avatar_url, created_at
            FROM users
            WHERE username = ${username}
        `;
		if (user.length === 0) {
			return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
		}
		return new Response(JSON.stringify(user[0]), {
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: `Failed to fetch user profile with the following error: ${error}.` }),
			{ status: 500 }
		);
	}
}
