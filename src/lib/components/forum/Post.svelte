<script lang="ts">
	import type { Post } from "$lib/common/Post";
	const { thread }: { thread: Post } = $props();
</script>

<article>
	<header>
		<h2>{thread.content}</h2>
		<p>Posted by {thread.user_id} on {thread.created_at}</p>
	</header>

	{#if thread.attachments}
		<figure>
			{#each thread.attachments as attachment}
				<img src={attachment.fileUrl} alt={" "} />
			{/each}
		</figure>
	{/if}
</article>

<style>
	article {
		border: 1px solid #ccc;
		padding: 1rem;
		border-radius: 0.5rem;
	}

	header {
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	p {
		color: #666;
	}
</style>