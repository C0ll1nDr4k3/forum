import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/auth/signIn/$types";

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch("/api/threads");

	return {
		threads: await response.json()
	};
};
