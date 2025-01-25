// @ts-nocheck
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/auth/signin/$types";

export const load = async ({ fetch }: Parameters<PageServerLoad>[0]) => {
	const response = await fetch("/api/posts");

	return {
		posts: await response.json()
	};
};
