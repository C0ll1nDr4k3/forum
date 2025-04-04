<script lang="ts">
	import "../app.css";

	let { children } = $props();
	import MainMenubar from "$lib/components/Menubar.svelte";
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />

<MainMenubar />

<main>
	{@render children?.()}
</main>
