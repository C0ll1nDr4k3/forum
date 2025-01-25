import type { Post } from "$lib/forum/Post";

// `Thread`s encapsulate `Post`s.

// ```sql
// CREATE TABLE threads
// (
//     thread_id   SERIAL PRIMARY KEY,
//     category_id INT          REFERENCES categories (category_id) ON DELETE SET NULL,
//     user_id     INT          REFERENCES users (user_id) ON DELETE SET NULL,
//     title       VARCHAR(255) NOT NULL,
//     created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     is_locked   BOOLEAN                  DEFAULT FALSE,
//     is_sticky   BOOLEAN                  DEFAULT FALSE
// );
// ```

export type Thread = {
	threadId: number;
	categoryId: number;
	userId: number;
	title: string;
	createdAt: string;
	updatedAt: string;
	isLocked: boolean;
	isSticky: boolean;

	// This diverts from the original schema, but was added for convenience.
	posts: Post[];
};
