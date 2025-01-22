import { json } from "@sveltejs/kit";

import sql from "$lib/db/database";

export async function POST(event: Request): Promise<Response> {
	console.log("POST request received", event);
	return json({ message: "POST request received" });
}

export async function GET(event: Request): Promise<Response> {
	console.log("GET request received", event);
	return json({ message: "GET request received" });
}
