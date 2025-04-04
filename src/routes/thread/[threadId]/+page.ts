import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	// Access the URL slug from params
	// For example, if your route is /thread/[threadId]
	const { threadId } = params;

	// Now you can use the threadId to fetch data
	const thread = await fetch(`/api/threads/${threadId}`);
	const posts = await fetch(`/api/posts/${threadId}`);
	// console.log(await posts.json());
	return {
		thread: await thread.json(),
		posts: await posts.json()
	};
};
