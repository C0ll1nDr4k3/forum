// @ts-nocheck
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = async (event: Parameters<LayoutServerLoad>[0]) => {
	// Define the list of authentication-related routes
	// const authPages = [
	// 	"/login",
	// 	"/signin",
	// 	"/auth/signin",
	// 	"/signup",
	// 	"/forgot-password",
	// 	"/reset-password"
	// 	// Add any other auth routes here
	// ];
	//
	// const currentPath = event.url.pathname;
	//
	// // Check if the current path is an authentication page
	// const isAuthPage = authPages.some((path) => currentPath === path);
	//
	// if (!isAuthPage) {
	// 	// Perform the session check only if not on an auth page
	// 	const session = await event.locals.auth();
	//
	// 	if (!session?.user?.id) {
	// 		// Use 'throw redirect' to perform the redirect
	// 		throw redirect(303, `/auth/signin`);
	// 	}
	//
	// 	return {
	// 		session
	// 	};
	// }
	//
	// If on an auth page, optionally fetch session or other data as needed
	const session = await event.locals.auth();

	return {
		session
	};
};
