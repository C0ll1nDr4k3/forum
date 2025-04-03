<script lang="ts">
	import type { Post } from "$lib/common/Post";
	const { post }: { post: Post } = $props();
</script>

<article>
	<header>
		<h2>{post.content}</h2>
		<p>Posted by {post.user_id} on {post.created_at}</p>
	</header>

	{#if post.attachments}
		<figure>
			{#each post.attachments as attachment}
				<img src={attachment.fileUrl} alt={" "} />
			{/each}
		</figure>
	{/if}
</article>
