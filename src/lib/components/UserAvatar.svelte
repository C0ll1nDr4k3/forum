<script lang="ts">
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
</script>

<Avatar class={avatarSize}>
	<AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${getUserInitials(userId)}`} />
	<AvatarFallback>{getUserInitials(userId)}</AvatarFallback>
</Avatar>