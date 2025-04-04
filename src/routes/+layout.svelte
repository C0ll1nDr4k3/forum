<script lang="ts">
	import "../app.css";
	import MainMenubar from "$lib/components/Menubar.svelte";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher />

<MainMenubar />

<main>
	{@render children?.()}
</main>
