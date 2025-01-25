import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/auth/signin/$types";

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch("/api/posts");

	return {
		posts: await response.json()
	};
};
