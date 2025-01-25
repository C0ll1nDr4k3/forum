<script lang="ts">
	import { Map, MessageCircleQuestion, Search, Settings } from "lucide-svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Menubar from "$lib/components/ui/menubar/index.js";

	import { Waypoints, FolderTree, Network } from "lucide-svelte";
	let defaultMap = "graph";

	// Menu items.
	const items = [
		{
			title: "Map",
			url: "",
			icon: Map,
			items: [
				{
					title: "Graph",
					url: "/map/graph",
					icon: Waypoints
				},
				{
					title: "Directory",
					url: "/map/directory",
					icon: FolderTree
				},
				{
					title: "Tree",
					url: "/map/tree",
					icon: Network
				}
			]
		},
		{
			title: "Forum",
			url: "/forum",
			icon: MessageCircleQuestion,
			items: []
		},
		{
			title: "Search",
			url: "/search",
			icon: Search,
			items: []
		},
		{
			title: "Settings",
			url: "/settings",
			icon: Settings,
			items: []
		}
	];
</script>

<div class="menubar flex items-center space-x-4">
	<Menubar.Root>
		{#each items as item (item.title)}
			<Menubar.Menu>
				<Menubar.Trigger class="font-medium">
					<div class="menubar-item flex items-center">
						{#if item.url !== ""}
							<a href={item.url} class="flex items-center space-x-2">
								<item.icon class="h-4 w-4" style="margin-right: .5rem" />
								{item.title}
							</a>
						{:else}
							<div class="flex items-center space-x-2">
								<item.icon class="h-4 w-4" style="margin-right: .5rem" />
								{item.title}
							</div>
						{/if}
					</div>
				</Menubar.Trigger>
				{#if item.items.length > 0}
					<Menubar.Content>
						{#each item.items as subitem, index}
							<Menubar.Item>
								<a href={subitem.url} class="flex items-center space-x-2">
									<subitem.icon class="h-4 w-4" style="margin-right: .5rem" />
									{subitem.title}
								</a>
							</Menubar.Item>
							{#if index < item.items.length - 1}
								<Menubar.Separator />
							{/if}
						{/each}
					</Menubar.Content>
				{/if}
			</Menubar.Menu>
		{/each}
	</Menubar.Root>
</div>

<style>
	.menubar {
		margin: 1rem;
		z-index: 1000;
	}
	.menubar-item {
		padding: 0.05rem;
	}
</style>
