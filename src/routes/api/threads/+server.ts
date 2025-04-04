import sql from "$lib/db/database";
import { json } from "@sveltejs/kit";

export async function GET(): Promise<Response> {
	const threads = await sql`
      SELECT *
      FROM threads
      ORDER BY created_at DESC
	`;
	return json(threads);
}
