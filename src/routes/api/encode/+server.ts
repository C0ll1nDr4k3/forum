// src/routes/api/encode/+server.ts

import { ENCODER_SERVICE_URL } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit"; // Use dynamic/private for server-side runtime access

// Define the expected structure of the response from your FastAPI service
interface EncoderServiceResponse {
	embedding: number[];
	model_name: string;
	// text_truncated?: boolean; // Add if you implemented this in FastAPI
}

// Define the expected structure of the request body coming from the SvelteKit frontend
interface RequestPayload {
	text: string;
}

const encoderServiceUrl = ENCODER_SERVICE_URL;

if (!encoderServiceUrl) {
	// Log the error server-side, don't expose details to the client
	console.error("CRITICAL: ENCODER_SERVICE_URL environment variable is not set.");
	// Throw a generic error during startup or request processing
	// For critical config, failing early might be desired during development/build.
	// In production, you might handle this differently depending on requirements.
	throw new Error("Server configuration error: Encoder service URL is missing.");
}

export const POST: RequestHandler = async ({ request }) => {
	let requestData: RequestPayload;

	try {
		requestData = await request.json();
	} catch {
		throw error(400, "Invalid JSON payload");
	}

	const textToEncode = requestData.text;

	if (!textToEncode || textToEncode.trim() === "") {
		throw error(400, 'Missing or invalid "text" field in request body');
	}

	console.log(`[Server Route] Received request to encode text (length: ${textToEncode.length})`);

	const targetUrl = `${encoderServiceUrl}/encode`; // Append the specific endpoint
	console.log(`[Server Route] Calling encoder service at: ${targetUrl}`);

	const response = await fetch(targetUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
			// --- Authentication Placeholder ---
			// If your Cloud Run service needs authentication (e.g., IAM Invoker role):
			// 1. Ensure your SvelteKit hosting environment (e.g., Cloud Run, Vercel)
			//    has a service account with the 'roles/run.invoker' role for the text-encoder service.
			// 2. Use Google Auth libraries (like google-auth-library for Node.js)
			//    to fetch an OIDC identity token and add it as a Bearer token.
			// Example (conceptual - requires installing 'google-auth-library'):
			// import { GoogleAuth } from 'google-auth-library';
			// const auth = new GoogleAuth();
			// const client = await auth.getIdTokenClient(targetUrl);
			// const clientHeaders = await client.getRequestHeaders();
			// 'Authorization': clientHeaders['Authorization']
			// --- End Authentication Placeholder ---
		},
		body: JSON.stringify({ text: textToEncode }) // Body expected by FastAPI
	});

	console.log(`[Server Route] Encoder service response status: ${response.status}`);

	if (!response.ok) {
		let errorDetail: string;
		try {
			// Try to get the 'detail' field FastAPI often uses for errors
			const errorBody = await response.json();
			errorDetail = errorBody.detail || JSON.stringify(errorBody);
		} catch {
			// Fallback to text if JSON parsing fails
			errorDetail = await response.text();
		}
		console.error(`[Server Route] Error from encoder service: ${errorDetail}`);
		// Use 502 Bad Gateway when an upstream service fails
		throw error(502, `Failed to get encoding from upstream service: ${errorDetail}`);
	}

	// Parse the successful JSON response from the FastAPI service
	const result: EncoderServiceResponse = await response.json();
	console.log(
		`[Server Route] Successfully received embedding (dimensions: ${result?.embedding?.length})`
	);

	// Return the successful response to the SvelteKit frontend
	return json(result);
};
