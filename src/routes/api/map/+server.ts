import { json } from '@sveltejs/kit'

export function GET(event: Request): Response {
	console.log("GET request received", event);
	return json({ message: "GET request received" });
}
