<script lang="ts">
	import {
		FolderTree,
		Map,
		MessageCircleQuestion,
		Moon,
		Network,
		Search,
		Settings,
		Sun,
		Waypoints
	} from "lucide-svelte";
	import { toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Menubar from "$lib/components/ui/menubar/index.js";

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
	<Menubar.Root
		style="backdrop-filter: blur(10px); background-color: rgba(255,255,255,0.03); border-color: transparent; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
		{#each items as item (item.title)}
			<Menubar.Menu>
				<Menubar.Trigger class="font-medium">
					{#if item.url !== ""}
						<a href="{item.url}" class="menubar-item flex items-center">
							<p class="flex items-center space-x-2">
								<item.icon class="h-4 w-4" style="margin-right: .5rem" />
								{item.title}
							</p>
						</a>
					{:else}
						<p class="flex items-center space-x-2">
							<item.icon class="h-4 w-4" style="margin-right: .5rem" />
							{item.title}
						</p>
					{/if}
				</Menubar.Trigger>
				{#if item.items.length > 0}
					<Menubar.Content class="menubar-content">
						{#each item.items as subitem, index}
							<a href="{subitem.url}">
								<Menubar.Item class="menubar-content">
									<p class="flex items-center space-x-2">
										<subitem.icon class="h-4 w-4" style="margin-right: .5rem" />
										{subitem.title}
									</p>
								</Menubar.Item>
							</a>
							{#if index < item.items.length - 1}
								<Menubar.Separator />
							{/if}
						{/each}
					</Menubar.Content>
				{/if}
			</Menubar.Menu>
		{/each}

		<Button onclick={toggleMode} variant="ghost" class="light-dark-toggle">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</Menubar.Root>
</div>

<style>
    .menubar {
        position: fixed;
        padding: 1rem;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        /*background-color: rgba(255, 255, 255, 0.5); !* Semi-transparent background *!*/
        background-color: transparent;
        /*backdrop-filter: blur(10px); !* Blur effect *!*/
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); !* Optional: Add a shadow for better visibility *!*/
    }

    .menubar-item {
        padding: 0.05rem;
    }
</style>
