export type User = {
	user_id: number;
	username: string;
	// email?: string; // Only include if your API actually returns it
	display_name: string | null;
	bio: string | null;
	avatar_url: string | null;
	created_at: string; // Dates are typically strings after JSON serialization
	updated_at: string;
};
