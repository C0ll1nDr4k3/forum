<script lang="ts">
	import "../app.css";

	let { children } = $props();
	import MainMenubar from "$lib/components/Menubar.svelte";

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<MainMenubar />
<main>
	{@render children?.()}
</main>

