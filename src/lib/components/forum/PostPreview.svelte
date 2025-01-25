<script lang="ts">
	import type { Post } from "$lib/forum/Post";
	const { post }: { post: Post } = $props();
</script>

<article>
	<header>
		<h2>{post.content}</h2>
		<p>Posted by {post.userId} on {post.createdAt}</p>
	</header>

	{#if post.attachments}
		<figure>
			{#each post.attachments as attachment}
				<img src={attachment.fileUrl} alt={" "} />
			{/each}
		</figure>
	{/if}
</article>
