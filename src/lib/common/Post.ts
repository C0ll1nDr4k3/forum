// ```sql
// CREATE TABLE posts
// (
//     post_id        SERIAL PRIMARY KEY,
//     thread_id      INT REFERENCES threads (thread_id) ON DELETE CASCADE,
//     user_id        INT  REFERENCES users (user_id) ON DELETE SET NULL,
//     parent_post_id INT REFERENCES posts (post_id) ON DELETE CASCADE,
//     content        TEXT NOT NULL,
//     likes          INT  DEFAULT 0,
//     created_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//     updated_at     TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );
// ```

import type { Attachment } from "$lib/common/Attachment";

export type Post = {
	postId: number;
	threadId: number;
	userId: number;
	parentPostId?: number;
	content: string;
	likes: number;
	createdAt: string;
	updatedAt: string;

	// This diverts from the original schema, but was added for convenience.
	attachments: Attachment[];
};
