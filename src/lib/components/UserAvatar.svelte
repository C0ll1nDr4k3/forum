<!-- <script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";

	const { userId, size = "default" } = $props<{
		userId: number;
		size?: "small" | "default" | "large";
	}>();

	// Get user initials for avatar
	function getUserInitials(userId: number) {
		return `U${userId}`;
	}

	// Size classes mapping
	const sizeClasses = {
		small: "h-6 w-6",
		default: "h-10 w-10",
		large: "h-12 w-12"
	};

	const avatarSize = sizeClasses[size];
</script> -->

<!-- <Avatar class={avatarSize}>
	<AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials(userId)}`} />
	<AvatarFallback>{getUserInitials(userId)}</AvatarFallback>
</Avatar> -->

<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"; // Adjust path if needed

	// Using $props for Svelte 5 runes syntax (ensure your Svelte version supports this)
	// If using older Svelte, you'd use `export let userId: number; export let size: ... = 'default';`
	const { userId, size = "default" } = $props<{
		userId: number;
		size?: "small" | "default" | "large";
	}>();

	// Get user initials for avatar - simplified assuming seed just needs to be unique per user
	// Using Dicebear with initials seed often uses the actual initials, but U + ID works too.
	function getUserInitialsSeed(id: number): string {
		// You might want a more complex function if you need actual initials later
		return `User${id}`;
	}

	// Size classes mapping
	const sizeClasses = {
		small: "h-6 w-6",
		default: "h-10 w-10",
		large: "h-12 w-12"
	};

	const avatarSize = sizeClasses[size];
	const initialsSeed = getUserInitialsSeed(userId); // Calculate seed once

	// Construct the dynamic user profile link
	const userProfileLink = `/user/${userId}`;
</script>

<!-- Wrap the Avatar with an anchor tag for navigation -->
<a href={userProfileLink} aria-label={`View profile for user ${userId}`}>
	<Avatar class={avatarSize}>
		<!-- Using the pre-calculated seed -->
		<AvatarImage
			src={`https://api.dicebear.com/7.x/initials/svg?seed=${initialsSeed}`}
			alt={`Avatar for user ${userId}`}
		/>
		<!-- Displaying something simple in fallback, could be initials if fetched -->
		<AvatarFallback>{initialsSeed.substring(0, 2).toUpperCase()}</AvatarFallback>
	</Avatar>
</a>
