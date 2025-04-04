<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import { Bookmark, Calendar, Clock, Flag, Lock, MoreHorizontal, Share2, ThumbsUp } from "lucide-svelte";
	import { format, formatDistance } from "date-fns";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from "$lib/components/ui/dropdown-menu";
	import UserAvatar from "$lib/components/UserAvatar.svelte";

	const { thread } = $props<{
		thread: {
			title: string;
			user_id: number;
			created_at: string;
			updated_at: string;
			is_sticky?: boolean;
			is_locked?: boolean;
			likes: number;
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

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h1 class="text-3xl font-bold leading-tight">{thread.title}</h1>

		<div class="flex gap-2">
			{#if thread.is_sticky}
				<Badge variant="secondary" class="flex items-center gap-1">
					<Bookmark class="h-3 w-3" />
					<span>Sticky</span>
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

	<div class="flex items-center gap-3 text-sm text-muted-foreground">
		<div class="flex items-center gap-2">
			<UserAvatar userId={thread.user_id} size="small" />
			<span>User #{thread.user_id}</span>
		</div>
		<span class="text-muted-foreground">•</span>
		<div class="flex items-center gap-1" title={formatDate(thread.created_at, true)}>
			<Calendar class="h-4 w-4" />
			<span>{formatDate(thread.created_at)}</span>
		</div>
		{#if thread?.created_at && thread?.updated_at && thread.created_at !== thread.updated_at}
			<span class="text-muted-foreground">•</span>
			<div class="flex items-center gap-1" title={formatDate(thread.updated_at, true)}>
				<Clock class="h-4 w-4" />
				<span>Updated {formatDate(thread.updated_at)}</span>
			</div>
		{/if}
	</div>

	<div class="flex items-center gap-4">
		<Button variant="outline" size="sm" class="flex items-center gap-1">
			<ThumbsUp class="h-4 w-4" />
			<span>{thread.likes}</span>
		</Button>
		<Button variant="outline" size="sm" class="flex items-center gap-1">
			<Share2 class="h-4 w-4" />
			<span>Share</span>
		</Button>
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
</div>