import { json } from "@sveltejs/kit";

export async function GET(event: Request): Promise<Response> {
	console.log("GET request received", event);
	return json({ message: "GET request received" });
}
