<script lang="ts">
	// Import shadcn components
	// import { Card, CardContent, Card.CardDescription, Card.CardFooter, CardHeader, Card.CardTitle } from "$lib/components/ui/card";
	// import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge";
	import { formatDistance } from "date-fns";
	import { Calendar, Pin, Clock, ThumbsUp } from "lucide-svelte";
	import type { Thread } from "$lib/common/Thread";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";

	const { thread }: { thread: Thread } = $props();

	// Format the dates for better readability
	const formattedCreatedDate = formatDistance(new Date(thread.created_at), new Date(), {
		addSuffix: true
	});
	const formattedUpdatedDate = formatDistance(new Date(thread.updated_at), new Date(), {
		addSuffix: true
	});

	// Get user initials for avatar fallback
	const userInitials = thread.user_id.toString().substring(0, 2).toUpperCase();
</script>

<Card.Root class="w-full max-w-3xl transition-shadow hover:shadow-md">
	<Card.Header class="pb-2">
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<Card.Title class="text-2xl leading-tight transition-colors hover:text-primary">
					<a href={`/thread/${thread.thread_id}`}>{thread.title}</a>
				</Card.Title>

				<div class="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
					<Avatar.Root class="h-6 w-6">
						<Avatar.Fallback>{userInitials}</Avatar.Fallback>
					</Avatar.Root>
					<span>Posted by User #{thread.user_id} {formattedCreatedDate}</span>
				</div>
			</div>

			<div class="flex gap-1">
				{#if thread.is_sticky}
					<Badge variant="secondary" class="flex items-center gap-1">
						<Pin class="h-3 w-3" />
						<span>Pinned</span>
					</Badge>
				{/if}
				{#if thread.is_locked}
					<Badge variant="destructive" class="flex items-center gap-1">
						<Lock class="h-3 w-3" />
						<span>Locked</span>
					</Badge>
				{/if}
			</div>
		</div>
	</Card.Header>

	<Card.Footer class="flex justify-between pt-4 text-sm text-muted-foreground">
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1">
				<ThumbsUp class="h-4 w-4" />
				<span>{thread.likes}</span>
			</div>
			<!-- Reply count if needed -->
		</div>

		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1" title="Created at">
				<Calendar class="h-4 w-4" />
				<span>{formattedCreatedDate}</span>
			</div>
			{#if thread.updated_at !== thread.created_at}
				<div class="flex items-center gap-1" title="Updated at">
					<Clock class="h-4 w-4" />
					<span>{formattedUpdatedDate}</span>
				</div>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
