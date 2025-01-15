<script lang="ts">
	import "../app.css";

	let { children } = $props();

	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import MainSidebar from "$lib/components/MainSidebar.svelte";
</script>

<Sidebar.Provider>
	<MainSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
