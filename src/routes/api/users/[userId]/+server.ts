import { error, json } from "@sveltejs/kit";
import sql from "$lib/db/database";
import type { RequestHandler } from "@sveltejs/kit";

// --- GET Request Handler ---
export const GET: RequestHandler = async (event) => {
	const { userId } = event.params;

	if (!userId) {
		throw error(400, "Username parameter is required.");
	}

	try {
		// console.log(`Fetching user data for username: ${userId}...`);

		// --- Database Query ---
		// Select specific fields, EXCLUDING password_hash
		// Use LIMIT 1 for efficiency, although username is UNIQUE
		const result = await sql`
            SELECT
                user_id,
                username,
                -- email, -- Uncomment ONLY if you INTEND to expose email publicly
                display_name,
                bio,
                avatar_url,
                created_at,
                updated_at
            FROM
                users
            WHERE
                user_id = ${userId}
            LIMIT 1;
        `;

		// --- Handle Result ---
		if (result.length === 0) {
			// console.log(`User not found: ${userId}`);
			// Use SvelteKit's error helper for standard error responses
			throw error(404, "User not found");
		}

		const [userProfile] = result;

		// console.log(`Successfully fetched user: ${userId}.`);
		// Return the user data as JSON
		return json(userProfile);
	} catch {
		// Log the detailed error on the server for debugging
		// console.error(`Error fetching user ${userId}:`, err);

		// Check if it's a SvelteKit thrown error, otherwise return 500
		// Generic server error for unexpected issues
		throw error(500, "Internal Server Error");
	}
};
