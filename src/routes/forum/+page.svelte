<script lang="ts">
	import PostPreview from "$lib/components/forum/PostPreview.svelte";
	import type { Post } from "$lib/common/Post";

	const { data } = $props();
	const { posts }: { posts: Post[] } = data;
</script>

{#each posts as post}
	<PostPreview {post} />
{/each}
