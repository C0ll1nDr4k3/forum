<script lang="ts">
	// Import shadcn components
	// import { Card, CardContent, Card.CardDescription, Card.CardFooter, CardHeader, Card.CardTitle } from "$lib/components/ui/card";
	// import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge";
	import { formatDistance } from "date-fns";
	import { Calendar, Clock, ThumbsUp } from "lucide-svelte";
	import type { Thread } from "$lib/common/Thread";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";


	const { thread }: { thread: Thread } = $props();

	// Format the dates for better readability
	const formattedCreatedDate = formatDistance(new Date(thread.created_at), new Date(), { addSuffix: true });
	const formattedUpdatedDate = formatDistance(new Date(thread.updated_at), new Date(), { addSuffix: true });

	// Get user initials for avatar fallback
	const userInitials = thread.user_id.toString().substring(0, 2).toUpperCase();
</script>

<Card.Root class="w-full max-w-3xl hover:shadow-md transition-shadow">
	<Card.CardHeader class="pb-2">
		<div class="flex justify-between items-start">
			<div class="flex-1">
				<Card.CardTitle class="text-xl leading-tight hover:text-primary transition-colors">
					<a href={`/thread/${thread.thread_id}`}>{thread.title}</a>
				</Card.CardTitle>
				<Card.CardDescription class="flex items-center gap-2 mt-1">
					<Avatar.Root class="w-6 h-6">
						<!--						<Avatar.AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userInitials}`} alt="User avatar" />-->
						<Avatar.AvatarFallback>{userInitials}</Avatar.AvatarFallback>
					</Avatar.Root>
					<span>Posted by User #{thread.user_id} {formattedCreatedDate}</span>
				</Card.CardDescription>
			</div>

			<div class="flex gap-1">
				{#if thread.is_sticky}
					<Badge variant="secondary">Sticky</Badge>
				{/if}
				{#if thread.is_locked}
					<Badge variant="destructive">Locked</Badge>
				{/if}
			</div>
		</div>
	</Card.CardHeader>

	<Card.CardFooter class="pt-4 flex justify-between text-sm text-muted-foreground">
		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1">
				<ThumbsUp class="w-4 h-4" />
				<span>{thread.likes}</span>
			</div>
			<!--			<div class="flex items-center gap-1">-->
			<!--				<MessageSquare class="w-4 h-4" />-->
			<!--				<span>{thread.replies_count || 0}</span>-->
			<!--			</div>-->
		</div>

		<div class="flex items-center gap-4">
			<div class="flex items-center gap-1" title="Created at">
				<Calendar class="w-4 h-4" />
				<span>{formattedCreatedDate}</span>
			</div>
			{#if thread.updated_at !== thread.created_at}
				<div class="flex items-center gap-1" title="Updated at">
					<Clock class="w-4 h-4" />
					<span>{formattedUpdatedDate}</span>
				</div>
			{/if}
		</div>
	</Card.CardFooter>
</Card.Root>
