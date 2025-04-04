<script lang="ts">
	import { formatDistance, format } from "date-fns";
	import { Separator } from "$lib/components/ui/separator";
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge";
	import {
		ThumbsUp,
		MessageSquare,
		Calendar,
		Clock,
		Lock,
		Bookmark,
		Share2,
		Flag,
		MoreHorizontal
	} from "lucide-svelte";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from "$lib/components/ui/dropdown-menu";
	import { onMount } from "svelte";
	import type { Post } from "$lib/common/Post";
	import type { Attachment } from "$lib/common/Attachment";

	// Use optional chaining for potentially undefined data
	// Ensure we have defaults for thread and posts
	const { data } = $props();
	const { thread, posts } = data;

	// Organize posts into a hierarchy (parent posts and their replies)
	const postHierarchy = $derived(organizePostsHierarchy(posts || []));

	function organizePostsHierarchy(posts: Post[]) {
		// Make sure posts is an array
		if (!Array.isArray(posts)) {
			console.error("Posts is not an array:", posts);
			return { parentPosts: [], repliesByParentId: {} };
		}

		// Ensure posts have required properties
		const validPosts = posts.filter(post => post && typeof post === "object");

		const parentPosts = validPosts.filter(post => !post.parent_post_id);
		const repliesByParentId: Record<number, Post[]> = {};

		validPosts.filter(post => post.parent_post_id).forEach(reply => {
			if (!reply.parent_post_id) return;

			if (!repliesByParentId[reply.parent_post_id]) {
				repliesByParentId[reply.parent_post_id] = [];
			}
			repliesByParentId[reply.parent_post_id].push(reply);
		});

		// Sort parent posts by created_at (if any exist)
		if (parentPosts.length > 0) {
			parentPosts.sort((a, b) => {
				// Safe date comparison with fallbacks
				const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
				const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
				return dateA - dateB;
			});
		}

		// Sort replies by created_at for each parent
		Object.keys(repliesByParentId).forEach(parentId => {
			repliesByParentId[Number(parentId)].sort((a, b) => {
				// Safe date comparison with fallbacks
				const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
				const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
				return dateA - dateB;
			});
		});

		return {
			parentPosts,
			repliesByParentId
		};
	}

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

	// Get user initials for avatar
	function getUserInitials(userId: number) {
		return `U${userId}`;
	}

	// Handle attachment display logic
	function getAttachmentPreview(attachment: Attachment) {
		// Extract file type from fileType or from the file extension in fileUrl
		const fileType = attachment.fileType ||
			(attachment.fileUrl.split(".").pop()?.toLowerCase() || "");

		// Determine preview type based on file type
		if (fileType.includes("image") || ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(fileType)) {
			return { type: "image", url: attachment.fileUrl };
		} else if (fileType.includes("video") || ["mp4", "webm", "ogg", "mov"].includes(fileType)) {
			return { type: "video", url: attachment.fileUrl };
		} else {
			// For other file types, extract filename from URL
			const filename = attachment.fileUrl.split("/").pop() || "file";
			return { type: "file", url: attachment.fileUrl, name: filename };
		}
	}

	// Reply state
	let replyContent = $state("");
</script>

<div class="posts container max-w-4xl mx-auto py-6 px-4 sm:px-6">
	<!-- Thread Header -->
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
				<Avatar class="h-6 w-6">
					<AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials(thread.user_id)}`} />
					<AvatarFallback>{getUserInitials(thread.user_id)}</AvatarFallback>
				</Avatar>
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

	<Separator class="my-6" />

	<!-- Post count summary -->
	<div class="mb-6">
		<h2 class="text-lg font-semibold">
			{Array.isArray(posts) ? posts.length : 0} {(Array.isArray(posts) && posts.length === 1) ? 'Post' : 'Posts'}
		</h2>
	</div>

	<!-- Posts Section -->
	<div class="space-y-6">
		{#each postHierarchy.parentPosts as post (post.post_id)}
			<!-- Parent Post -->
			<Card class="border-l-4 border-l-primary">
				<CardHeader class="pb-3">
					<div class="flex justify-between">
						<div class="flex items-center gap-3">
							<Avatar>
								<AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials(post.user_id)}`} />
								<AvatarFallback>{getUserInitials(post.user_id)}</AvatarFallback>
							</Avatar>
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

					<!-- Attachments Grid -->
					{#if post.attachments && post.attachments.length > 0}
						<div class="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
							{#each post.attachments as attachment}
								{@const preview = getAttachmentPreview(attachment)}
								{#if preview.type === 'image'}
									<div class="relative aspect-square rounded-md overflow-hidden border bg-muted">
										<img src={preview.url} alt={preview.name} class="object-cover w-full h-full" />
									</div>
								{:else if preview.type === 'video'}
									<div class="relative aspect-video rounded-md overflow-hidden border bg-muted">
										<video src={preview.url} controls class="object-cover w-full h-full">
											<track kind="captions" src="" />
										</video>
									</div>
								{:else}
									<div class="flex items-center p-2 border rounded-md bg-muted">
										<span class="truncate text-xs">{preview.name}</span>
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				</CardContent>

				<CardFooter class="flex justify-between pt-0">
					<div class="flex items-center gap-4">
						<Button variant="ghost" size="sm" class="h-8 flex items-center gap-1">
							<ThumbsUp class="h-4 w-4" />
							<span>{post.likes}</span>
						</Button>
						<Button variant="ghost" size="sm" class="h-8 flex items-center gap-1">
							<MessageSquare class="h-4 w-4" />
							<span>Reply</span>
						</Button>
					</div>

					<Button variant="ghost" size="sm" class="h-8">
						<Share2 class="h-4 w-4 mr-1" />
						<span>Share</span>
					</Button>
				</CardFooter>
			</Card>

			<!-- Replies to this post -->
			{#if postHierarchy.repliesByParentId[post.post_id]}
				<div class="ml-12 space-y-4">
					{#each postHierarchy.repliesByParentId[post.post_id] as reply}
						<Card>
							<CardHeader class="py-3">
								<div class="flex justify-between">
									<div class="flex items-center gap-3">
										<Avatar class="h-8 w-8">
											<AvatarImage
												src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials(reply.user_id)}`} />
											<AvatarFallback>{getUserInitials(reply.user_id)}</AvatarFallback>
										</Avatar>
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

									<DropdownMenu>
										<DropdownMenuTrigger>
											<Button variant="ghost" size="icon" class="h-8 w-8">
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

							<CardContent class="py-2">
								<div class="prose prose-sm max-w-none dark:prose-invert">
									{@html reply.content}
								</div>

								<!-- Attachments for replies -->
								{#if reply.attachments && reply.attachments.length > 0}
									<div class="mt-2 grid grid-cols-2 gap-2">
										{#each reply.attachments as attachment}
											{@const preview = getAttachmentPreview(attachment)}
											{#if preview.type === 'image'}
												<div class="relative aspect-square rounded-md overflow-hidden border bg-muted">
													<img src={preview.url} alt={preview.name} class="object-cover w-full h-full" />
												</div>
											{:else if preview.type === 'video'}
												<div class="relative aspect-video rounded-md overflow-hidden border bg-muted">
													<video src={preview.url} controls class="object-cover w-full h-full">
														<track kind="captions" src="" />
													</video>
												</div>
											{:else}
												<div class="flex items-center p-2 border rounded-md bg-muted">
													<span class="truncate text-xs">{preview.name}</span>
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							</CardContent>

							<CardFooter class="py-2">
								<div class="flex items-center gap-3">
									<Button variant="ghost" size="sm" class="h-7 px-2 flex items-center gap-1">
										<ThumbsUp class="h-3 w-3" />
										<span>{reply.likes}</span>
									</Button>
								</div>
							</CardFooter>
						</Card>
					{/each}
				</div>
			{/if}
		{/each}
	</div>

	<!-- Post Reply Area (hidden if thread is locked) -->
	{#if !thread.is_locked}
		<Card class="mt-8">
			<CardHeader>
				<CardTitle class="text-lg">Post a Reply</CardTitle>
			</CardHeader>
			<CardContent>
				<textarea
					class="w-full min-h-[120px] p-3 border rounded-md bg-background"
					placeholder="Write your reply here..."
					bind:value={replyContent}
				></textarea>
				<div class="mt-3 flex gap-2">
					<Button>Post Reply</Button>
					<Button variant="outline">Cancel</Button>
				</div>
			</CardContent>
		</Card>
	{:else}
		<div class="mt-8 p-4 border rounded-md bg-muted flex items-center justify-center">
			<Lock class="h-4 w-4 mr-2" />
			<span>This thread is locked. New replies cannot be added.</span>
		</div>
	{/if}
</div>

<style>
    .posts {
        /*padding-top: 10rem;*/
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 800px;
        margin-top: 7.5rem;
        margin-left: auto;
        margin-right: auto;
    }
</style>