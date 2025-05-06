<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Flag, MessageSquare, MoreHorizontal, Share2, ThumbsUp } from "lucide-svelte";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from "$lib/components/ui/dropdown-menu";

	const {
		likes,
		showReply = true,
		size = "default",
		onReplyClick = undefined
	} = $props<{
		likes: number;
		showReply?: boolean;
		size?: "small" | "default";
		onReplyClick?: () => void;
	}>();

	// Size configuration
	const buttonSize = size === "small" ? "h-7 px-2" : "h-8";
	const iconSize = size === "small" ? "h-3 w-3" : "h-4 w-4";
</script>

<div class="flex w-full justify-between">
	<div class="flex items-center gap-4">
		<Button variant="ghost" size="sm" class="{buttonSize} flex items-center gap-1">
			<ThumbsUp class={iconSize} />
			<span>{likes}</span>
		</Button>

		{#if showReply}
			<Button
				variant="ghost"
				size="sm"
				class="{buttonSize} flex items-center gap-1"
				onclick={onReplyClick}
			>
				<MessageSquare class={iconSize} />
				<span>Reply</span>
			</Button>
		{/if}
	</div>

	<div class="flex items-center gap-2">
		<Button variant="ghost" size="sm" class={buttonSize}>
			<Share2 class={iconSize} />
			<span>Share</span>
		</Button>

		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" size="icon" class={buttonSize}>
					<MoreHorizontal class={iconSize} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Flag class="mr-2 h-4 w-4" />
					<span>Report</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</div>
