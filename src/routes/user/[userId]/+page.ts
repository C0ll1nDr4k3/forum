import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { User } from "$lib/common/User";

// Define the expected shape of the user data from the API
// Match the fields returned by your API route (excluding sensitive ones)

export const load: PageLoad = async ({ params, fetch }) => {
	const { userId } = params;

	if (!userId) {
		// Should technically not happen with SvelteKit routing, but good practice
		throw error(400, "Username parameter is missing.");
	}

	try {
		// console.log(`[+page.ts] Fetching user data for: ${userId}`);
		const response = await fetch(`/api/users/${userId}`);

		if (!response.ok) {
			// If the API returned a specific error (like 404), propagate it
			if (response.status === 404) {
				throw error(404, "User not found");
			}
			// Otherwise, throw a generic error based on the status
			throw error(response.status, `Failed to load user data: ${response.statusText}`);
		}

		const user = (await response.json()) as User;
		// console.log(`[+page.ts] User data received for: ${userId}`);

		// Return the fetched user data, it will be available as `data.user` in the page
		return {
			user: user
		};
	} catch {
		// Log the error on the server/client where load runs
		// console.error(`[+page.ts] Error loading user ${userId}:`, err);

		// Re-throw SvelteKit errors, or create a generic 500 for others
		throw error(500, "Internal Server Error while fetching user data.");
	}
};
