<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import ThreadHeader from "$lib/components/forum/ThreadHeader.svelte";
	import PostList from "$lib/components/forum/PostList.svelte";
	import ReplyForm from "$lib/components/forum/ReplyForm.svelte";
	import type { Post } from "$lib/common/Post";

	// Main thread view component - connects all the pieces
	const { data } = $props<{
		data: {
			thread: {
				title: string;
				user_id: number;
				created_at: string;
				updated_at: string;
				is_sticky?: boolean;
				is_locked?: boolean;
				likes: number;
			};
			posts: Post[];
		};
	}>();

	const { thread, posts } = data;

	// Handle new reply submission
	function handleReplySubmit(event: CustomEvent) {
		const content = event.detail.content;
		console.log("Submitting reply:", content);
		// Here you would dispatch to your API to save the reply
	}
</script>

<div class="container mx-auto max-w-4xl px-4 py-6 sm:px-6">
	<!-- Thread Header -->
	<ThreadHeader {thread} />

	<Separator class="my-6" />

	<!-- Posts List -->
	<PostList {posts} />

	<!-- Reply Form -->
	<ReplyForm isLocked={thread.is_locked} on:submitReply={handleReplySubmit} />
</div>

<style>
	.container {
		margin-top: 7.5rem;
		max-width: 60%;
	}
</style>
