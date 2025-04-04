<script lang="ts">
	import { format, formatDistance } from "date-fns";
	import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "$lib/components/ui/card";
	import { Flag, MoreHorizontal } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from "$lib/components/ui/dropdown-menu";
	import type { Attachment } from "./PostAttachments.svelte";
	import PostAttachments from "./PostAttachments.svelte";
	import ActionBar from "./ActionBar.svelte";
	import UserAvatar from "$lib/components/UserAvatar.svelte";

	const { post, isHighlighted = false } = $props<{
		post: {
			post_id: number;
			user_id: number;
			content: string;
			likes: number;
			created_at: string;
			updated_at: string;
			attachments: Attachment[];
		};
		isHighlighted?: boolean;
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

<Card class={isHighlighted ? "border-l-4 border-l-primary" : ""}>
	<CardHeader class="pb-3">
		<div class="flex justify-between">
			<div class="flex items-center gap-3">
				<UserAvatar userId={post.user_id} />
				<div>
					<div class="font-semibold">User #{post.user_id}</div>
					<CardDescription class="flex items-center gap-1">
						<span title={formatDate(post.created_at, true)}>{formatDate(post.created_at)}</span>
						{#if post?.created_at && post?.updated_at && post.updated_at !== post.created_at}
							<span class="text-muted-foreground">•</span>
							<span title={formatDate(post.updated_at, true)}>edited {formatDate(post.updated_at)}</span>
						{/if}
					</CardDescription>
				</div>
			</div>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="ghost" size="icon">
						<MoreHorizontal class="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<Flag class="h-4 w-4 mr-2" />
						<span>Report</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</CardHeader>

	<CardContent>
		<div class="prose prose-sm max-w-none dark:prose-invert">
			{@html post.content}
		</div>

		<PostAttachments attachments={post.attachments} />
	</CardContent>

	<CardFooter class="pt-0">
		<ActionBar likes={post.likes} />
	</CardFooter>
</Card>