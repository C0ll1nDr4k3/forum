<script lang="ts">
	import PostPreview from "$lib/components/forum/PostPreview.svelte";

	import type { PageData } from "./$types";
	import type { Post } from "$lib/forum/Post";
	const { data } = $props();

	let { posts }: { posts: Post[] } = data;
</script>

{#each posts as post}
	<PostPreview {post} />
{/each}
