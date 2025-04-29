<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"; // Adjust path if needed
	import { Badge } from "$lib/components/ui/badge"; // Adjust path if needed
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card"; // Adjust path if needed
	import { Separator } from "$lib/components/ui/separator"; // Optional, for visual separation
	import type { User } from "$lib/common/User.ts";

	const { data } = $props(); // The data loaded by +page.ts

	// Access the user data passed from the load function
	const user: User = data.user;

	// Helper function to format date (optional, could use a library like date-fns)
	function formatDate(dateString: string): string {
		try {
			return new Date(dateString).toLocaleDateString(undefined, {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		} catch {
			return "Invalid Date";
		}
	}

	// Helper for Avatar Fallback (e.g., display initials)
	function getInitials(displayName: string | null | undefined, username: string): string {
		if (displayName && displayName.trim().length > 0) {
			const names = displayName.split(" ");
			if (names.length > 1) {
				return (names[0][0] + names[names.length - 1][0]).toUpperCase();
			}
			return names[0].substring(0, 2).toUpperCase();
		}
		return username.substring(0, 2).toUpperCase();
	}
</script>

<svelte:head>
	<title>{user.display_name ?? user.username}'s Profile</title>
	{#if user.bio}
		<meta name="description" content={user.bio} />
	{/if}
</svelte:head>

<div class="container mx-auto max-w-3xl p-4 md:p-8">
	<Card class="w-full">
		<CardHeader>
			<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
				<!-- Avatar -->
				<Avatar class="h-24 w-24 border sm:h-32 sm:w-32">
					{#if user.avatar_url}
						<AvatarImage src={user.avatar_url} alt={user.display_name ?? user.username} />
					{/if}
					<AvatarFallback class="text-3xl sm:text-4xl">
						{getInitials(user.display_name, user.username)}
					</AvatarFallback>
				</Avatar>

				<!-- User Info -->
				<div class="mt-4 text-center sm:mt-0 sm:text-left">
					<CardTitle class="text-2xl lg:text-3xl">
						{user.display_name ?? user.username}
					</CardTitle>
					{#if user.display_name}
						<CardDescription class="text-lg">
							<Badge variant="secondary">@{user.username}</Badge>
						</CardDescription>
					{/if}
					<p class="mt-3 text-sm text-muted-foreground">
						Member since: {formatDate(user.created_at)}
					</p>
				</div>
			</div>
		</CardHeader>
		<CardContent>
			{#if user.bio}
				<Separator class="my-4" />
				<h3 class="mb-2 text-lg font-semibold">Bio</h3>
				<p class="text-muted-foreground">{user.bio}</p>
			{/if}

			<!-- You could add more sections here -->
			<!-- e.g., Recent Activity, Links, etc. -->
		</CardContent>
	</Card>
</div>
