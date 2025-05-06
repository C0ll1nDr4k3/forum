import sql from "$lib/db/database";
import { json } from "@sveltejs/kit";

export async function GET(): Promise<Response> {
	try {
		const result = await sql`
          SELECT *
          FROM
              threads
          ORDER BY
              is_sticky DESC,  -- TRUE values first (sticky)
              likes DESC,      -- Most liked threads first
              updated_at DESC,
              created_at DESC  -- Newest first within sticky/non-sticky groups
        `;
		return json(result);
	} catch (error) {
		console.error("Error fetching threads:", error);
		const errorMessage = error instanceof Error ? error.message : "Unknown database error";
		return json({ error: "Failed to fetch threads", details: errorMessage }, { status: 500 });
	}
}
