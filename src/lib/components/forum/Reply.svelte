<script lang="ts">
	import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "$lib/components/ui/card";
	import { format, formatDistance } from "date-fns";
	import UserAvatar from "$lib/components/UserAvatar.svelte";
	import PostAttachments from "$lib/components/forum/PostAttachments.svelte";
	import ActionBar from "$lib/components/forum/ActionBar.svelte";
	import type { Attachment } from "$lib/common/Attachment";

	const { reply } = $props<{
		reply: {
			post_id: number;
			user_id: number;
			content: string;
			likes: number;
			created_at: string;
			updated_at: string;
			attachments: Attachment[];
		};
	}>();

	// Format utility function with better error handling
	function formatDate(dateString: string | undefined | null, showFull = false) {
		if (!dateString) return "N/A";

		try {
			const date = new Date(dateString);

			// Check if date is valid
			if (isNaN(date.getTime())) {
				console.error("Invalid date:", dateString);
				return "Invalid date";
			}

			if (showFull) {
				return format(date, "PPP p"); // e.g., "April 29th, 2023 at 2:30 PM"
			}
			return formatDistance(date, new Date(), { addSuffix: true });
		} catch (error) {
			console.error("Error formatting date:", error);
			return "Date error";
		}
	}
</script>

<Card>
	<CardHeader class="py-3">
		<div class="flex justify-between">
			<div class="flex items-center gap-3">
				<UserAvatar userId={reply.user_id} size="small" />
				<div>
					<div class="font-semibold text-sm">User #{reply.user_id}</div>
					<CardDescription class="text-xs flex items-center gap-1">
						<span title={formatDate(reply.created_at, true)}>{formatDate(reply.created_at)}</span>
						{#if reply?.created_at && reply?.updated_at && reply.updated_at !== reply.created_at}
							<span class="text-muted-foreground">•</span>
							<span title={formatDate(reply.updated_at, true)}>edited {formatDate(reply.updated_at)}</span>
						{/if}
					</CardDescription>
				</div>
			</div>
		</div>
	</CardHeader>

	<CardContent class="py-2">
		<div class="prose prose-sm max-w-none dark:prose-invert">
			{@html reply.content}
		</div>

		<PostAttachments attachments={reply.attachments} gridCols="grid-cols-2" />
	</CardContent>

	<CardFooter class="py-2">
		<ActionBar likes={reply.likes} showReply={false} size="small" />
	</CardFooter>
</Card>