<script lang="ts">
	import ThreadPreview from "$lib/components/forum/ThreadPreview.svelte";
	import type { Thread } from "$lib/common/Thread";

	const { data } = $props();
	const { threads }: { threads: Thread[] } = data;
</script>

<div class="threads">
	{#each threads as thread}
		<ThreadPreview {thread} />
	{/each}
</div>

<style>
	.threads {
		/*padding-top: 10rem;*/
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 90%;
		margin-top: 7.5rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>
