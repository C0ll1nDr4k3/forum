<script lang="ts">
	export type Attachment = {
		attachmentId: number;
		postId: number;
		fileUrl: string;
		fileType?: string;
		fileSize?: number;
		uploadedAt: string;
	};

	const { attachments, gridCols = "sm:grid-cols-3" } = $props<{
		attachments: Attachment[];
		gridCols?: string;
	}>();

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
</script>

{#if attachments && attachments.length > 0}
	<div class="mt-4 grid grid-cols-2 {gridCols} gap-2">
		{#each attachments as attachment}
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