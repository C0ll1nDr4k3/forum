// ```sql
// CREATE TABLE attachments
// (
//     attachment_id SERIAL PRIMARY KEY,
//     post_id       INT REFERENCES posts (post_id) ON DELETE CASCADE,
//     file_url      VARCHAR(255) NOT NULL,
//     file_type     VARCHAR(50),
//     file_size     INT,
//     uploaded_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );
// ```

export type Attachment = {
	attachmentId: number;
	postId: number;
	fileUrl: string;
	fileType?: string;
	fileSize?: number;
	uploadedAt: string;
};
