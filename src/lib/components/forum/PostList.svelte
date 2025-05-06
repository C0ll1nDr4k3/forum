<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import Post from "$lib/components/forum/Post.svelte";
	import Reply from "$lib/components/forum/Reply.svelte";
	import type { Post as PostType } from "$lib/common/Post";

	const { posts } = $props<{
		posts: PostType[];
	}>();

	// Create hierarchical structure for posts and replies
	const postHierarchy = $derived(organizePostsHierarchy(posts || []));

	function organizePostsHierarchy(posts: PostType[]) {
		// Make sure posts is an array
		if (!Array.isArray(posts)) {
			console.error("Posts is not an array:", posts);
			return { parentPosts: [], repliesByParentId: {} };
		}

		// Ensure posts have required properties
		const validPosts = posts.filter((post) => post && typeof post === "object");

		const parentPosts = validPosts.filter((post) => !post.parent_post_id);
		const repliesByParentId: Record<number, Post[]> = {};

		validPosts
			.filter((post) => post.parent_post_id)
			.forEach((reply) => {
				if (!reply.parent_post_id) return;

				if (!repliesByParentId[reply.parent_post_id]) {
					repliesByParentId[reply.parent_post_id] = [];
				}
				repliesByParentId[reply.parent_post_id].push(reply);
			});

		// Sort parent posts by created_at (if any exist)
		if (parentPosts.length > 0) {
			parentPosts.sort((a, b) => {
				// Safe date comparison with fallbacks
				const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
				const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
				return dateA - dateB;
			});
		}

		// Sort replies by created_at for each parent
		Object.keys(repliesByParentId).forEach((parentId) => {
			const replies: Post[] = repliesByParentId[Number(parentId)];
			replies.sort((a, b) => {
				// Safe date comparison with fallbacks
				const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
				const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
				return dateA - dateB;
			});
		});

		return {
			parentPosts,
			repliesByParentId
		};
	}
</script>

<!-- Post count summary -->
<div class="mb-6">
	<h2 class="text-lg font-semibold">
		{Array.isArray(posts) ? posts.length : 0}
		{Array.isArray(posts) && posts.length === 1 ? "Post" : "Posts"}
	</h2>
</div>

<Separator class="mb-6" />

<!-- Posts Section -->
<div class="space-y-6">
	{#each postHierarchy.parentPosts as post (post.post_id)}
		<div class="mb-6">
			<!-- Parent Post -->
			<Post {post} isHighlighted={true} />

			<!-- Replies to this post -->
			{#if postHierarchy.repliesByParentId[post.post_id]}
				<div class="ml-12 mt-4 space-y-4">
					{#each postHierarchy.repliesByParentId[post.post_id] as reply}
						<Reply {reply} />
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
