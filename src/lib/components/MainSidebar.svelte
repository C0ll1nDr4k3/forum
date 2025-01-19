<script lang="ts">
	import { Map, MessageCircleQuestion, Search, Settings } from "lucide-svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";

	let defaultMap = "graph";

	// Menu items.
	const items = [
		{
			title: "Map",
			url: `/map/${defaultMap}`,
			icon: Map
		},
		{
			title: "Forum",
			url: "/forum",
			icon: MessageCircleQuestion
		},
		{
			title: "Search",
			url: "/search",
			icon: Search
		},
		{
			title: "Settings",
			url: "/settings",
			icon: Settings
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>P2P Forum</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
