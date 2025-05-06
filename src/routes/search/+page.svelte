<script lang="ts">
	import { browser } from "$app/environment"; // To ensure effect runs client-side

	// --- Core SvelteKit/Svelte ---
	import { onDestroy } from "svelte";

	// --- UI Components (shadcn-svelte) ---
	import { Input } from "$lib/components/ui/input"; // Changed from Textarea
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	// import { Label } from "$lib/components/ui/label"; // Removed Label for cleaner search look

	// --- Icons (lucide-svelte) ---
	// You might need to install lucide-svelte: npm install lucide-svelte
	import { Search, Loader2 } from "lucide-svelte";

	// --- Types ---
	interface EncodingApiResponse {
		embedding: number[];
		model_name: string;
		// text_truncated?: boolean; // Add if needed
	}

	// --- State using Runes ---
	let inputText = $state(""); // Start empty for a search bar
	let isLoading = $state(false);
	let errorMessage = $state<string | null>(null);
	let apiResult = $state<EncodingApiResponse | null>(null);
	let debounceTimeoutId: number | undefined = $state(); // Store timeout ID for debouncing

	const DEBOUNCE_DELAY = 500; // milliseconds

	// --- Effect for Automatic Search/Encoding ---
	$effect(() => {
		if (!browser) return;

		const textToSearch = inputText.trim();

		clearTimeout(debounceTimeoutId);

		if (!textToSearch) {
			isLoading = false;
			errorMessage = null;
			apiResult = null;
			return;
		}

		debounceTimeoutId = setTimeout(async () => {
			console.log("[Effect] Debounced: Searching/Encoding text:", textToSearch);
			isLoading = true;
			errorMessage = null;
			apiResult = null;

			try {
				// NOTE: Still calling /api/encode. If this were a *real* search,
				// you'd likely call a different endpoint (e.g., /api/search)
				// and expect a different response structure (e.g., search results).
				const response = await fetch("/api/encode", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ text: textToSearch })
				});

				console.log("[Effect] Response status from API:", response.status);

				if (!response.ok) {
					let errorMsgFromServer = `Request failed with status ${response.status}`;
					try {
						const errorBody = await response.json();
						errorMsgFromServer = errorBody.message || JSON.stringify(errorBody);
					} catch {
						// Ignore if response body isn't valid JSON
						errorMsgFromServer = await response.text();
					}
					throw new Error(errorMsgFromServer);
				}

				const result: EncodingApiResponse = await response.json();
				console.log("[Effect] Received result:", result);
				apiResult = result;
			} catch (err: unknown) {
                const error = err as Error;
				console.error("[Effect] Error during fetch:", error);
				errorMessage = error.message || "An unknown error occurred.";
				apiResult = null;
			} finally {
				isLoading = false;
			}
		}, DEBOUNCE_DELAY);
	});

    // --- Cleanup Effect ---
    // Ensure timeout is cleared if the component is destroyed
    onDestroy(() => {
        clearTimeout(debounceTimeoutId);
    });

</script>

<!-- Use Tailwind for layout -->
<div class="container mx-auto flex max-w-xl flex-col items-center space-y-4 p-4" style="padding-top: 7.5rem">
	<h1 class="text-2xl font-semibold tracking-tight">Search Example (using Encoder API)</h1>

	<!-- Search Input Section -->
	<div class="relative w-full">
		<!-- Search Icon -->
		<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
			<Search class="h-5 w-5 text-muted-foreground" />
		</div>

		<!-- Input Field -->
		<Input
			type="text"
			id="search-input"
			placeholder="Type to search..."
			bind:value={inputText}
			disabled={isLoading}
			class="pl-10 pr-10"
		/>

		<!-- Loading Spinner (conditional) -->
		{#if isLoading}
			<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
				<Loader2 class="h-5 w-5 animate-spin text-primary" />
			</div>
		{/if}
	</div>

	<!-- Error Display -->
	{#if errorMessage}
		<Alert variant="destructive" class="w-full">
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{errorMessage}</AlertDescription>
		</Alert>
	{/if}

	<!-- Result Display (Kept original result display for demonstration) -->
	{#if apiResult && !isLoading}
		<Card class="w-full">
			<CardHeader>
				<CardTitle>API Result (Encoding)</CardTitle>
				<CardDescription>Model: {apiResult.model_name}</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<p class="text-sm font-medium">
						Embedding ({apiResult.embedding.length} dimensions total):
					</p>
					<pre
						class="mt-1 max-h-48 overflow-x-auto rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">{JSON.stringify(
							apiResult.embedding.slice(0, 10), // Show first 10 dims
							null,
							2
						)} ...</pre>
				</div>
			</CardContent>
		</Card>
	{/if}

    <!-- Optional: Placeholder when no results and not loading/error -->
    {#if !apiResult && !isLoading && !errorMessage && inputText.trim()}
        <p class="text-sm text-muted-foreground">No results found for "{inputText.trim()}" (or API returned empty).</p>
    {:else if !apiResult && !isLoading && !errorMessage && !inputText.trim()}
         <p class="text-sm text-muted-foreground">Enter text above to search.</p>
    {/if}

</div>
