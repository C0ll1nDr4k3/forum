<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Lock } from "lucide-svelte";
	import SvelteMarkdown from "svelte-markdown";

	const { isLocked = false } = $props<{
		isLocked?: boolean;
	}>();

	// Reply state
	let replyContent = $state("");

	function handleSubmit() {
		if (!replyContent.trim()) return;

		// Here you would dispatch an event or call a function to submit the reply
		const event = new CustomEvent("submitReply", {
			detail: { content: replyContent }
		});

		dispatchEvent(event);
		replyContent = ""; // Clear the form after submission
	}

	function handleCancel() {
		replyContent = ""; // Clear the form
	}
</script>

{#if !isLocked}
	<Card class="mt-8">
		<CardHeader>
			<CardTitle class="text-lg">Post a Reply</CardTitle>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit}>
				<textarea
					class="min-h-[120px] w-full rounded-md border bg-background p-3"
					placeholder="Write your reply here... We support Markdown, too."
					bind:value={replyContent}
				></textarea>
				<SvelteMarkdown source={replyContent}/>
				<div class="mt-3 flex gap-2">
					<Button type="submit">Post Reply</Button>
					<Button type="button" variant="outline" onclick={handleCancel}>Cancel</Button>
				</div>
			</form>
		</CardContent>
	</Card>
{:else}
	<div class="mt-8 flex items-center justify-center rounded-md border bg-muted p-4">
		<Lock class="mr-2 h-4 w-4" />
		<span>This thread is locked. New replies cannot be added.</span>
	</div>
{/if}
