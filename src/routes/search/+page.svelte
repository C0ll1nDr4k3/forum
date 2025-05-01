<script lang="ts">
	import { browser } from "$app/environment"; // To ensure effect runs client-side

	// Import shadcn-svelte components
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";

	// Define the structure of the data we expect back from our OWN /api/encode route
	interface EncodingApiResponse {
		embedding: number[];
		model_name: string;
		// text_truncated?: boolean; // Add if needed
	}

	// --- State using Runes ---
	let inputText = $state("This is a test sentence.");
	let isLoading = $state(false);
	let errorMessage = $state<string | null>(null);
	let apiResult = $state<EncodingApiResponse | null>(null);
	let debounceTimeoutId: number | undefined = $state(); // Store timeout ID for debouncing

	const DEBOUNCE_DELAY = 500; // milliseconds

	// --- Effect for Automatic Encoding ---
	$effect(() => {
		// Only run in the browser
		if (!browser) return;

		// Read the state variable to establish dependency
		const textToEncode = inputText.trim();

		// Clear previous timeout if input changes again quickly
		clearTimeout(debounceTimeoutId);

		// Reset status if input is cleared or too short
		if (!textToEncode) {
			isLoading = false;
			errorMessage = null;
			apiResult = null;
			return; // Don't proceed if input is empty/whitespace
		}

		// Set a new timeout to debounce the API call
		debounceTimeoutId = setTimeout(async () => {
			console.log("[Effect] Debounced: Encoding text:", textToEncode);
			isLoading = true;
			errorMessage = null;
			apiResult = null; // Clear previous result before new request

			try {
				const response = await fetch("/api/encode", {
					// Call OUR internal route
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ text: textToEncode }) // Send the trimmed text
				});

				console.log("[Effect] Response status from /api/encode:", response.status);

				if (!response.ok) {
					let errorMsgFromServer = `Request failed with status ${response.status}`;
					try {
						const errorBody = await response.json();
						errorMsgFromServer = errorBody.message || JSON.stringify(errorBody);
					} catch (e) {
						try {
							errorMsgFromServer = await response.text();
						} catch (e2) {
							/* ignore */
						}
					}
					throw new Error(errorMsgFromServer);
				}

				const result: EncodingApiResponse = await response.json();
				console.log("[Effect] Received result:", result);
				apiResult = result; // Update state with the result
			} catch (err: any) {
				console.error("[Effect] Error during fetch:", err);
				errorMessage = err.message || "An unknown error occurred.";
				apiResult = null;
			} finally {
				isLoading = false;
			}
		}, DEBOUNCE_DELAY);

		// Cleanup function for the effect
		return () => {
			console.log("[Effect Cleanup] Clearing timeout");
			clearTimeout(debounceTimeoutId);
		};
	});

	// Optional: Function for manual trigger if you keep the button
	// function triggerManualEncode() {
	// 	// You could potentially clear the timeout and run immediately,
	// 	// or just let the debounced effect handle it if the text hasn't changed.
	// 	// For simplicity, often the effect handles it automatically.
	// 	console.log("Manual trigger requested (usually handled by effect)");
	// }
</script>

<!-- Use Tailwind classes for overall layout -->
<h1 class="text-2xl font-semibold tracking-tight">Text Encoder (Auto)</h1>

<!-- Input Section -->
<div class="grid w-full gap-1.5">
	<Label for="text-input">Enter text (encodes automatically after typing stops):</Label>
	<Textarea
		id="text-input"
		placeholder="Type your text here..."
		bind:value={inputText}
		disabled={isLoading}
		rows={4}
	/>
	{#if isLoading}
		<p class="flex items-center text-sm text-muted-foreground">
			<svg
				class="-ml-1 mr-2 h-4 w-4 animate-spin text-primary"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			Encoding...
		</p>
	{/if}
</div>

<!-- Action Button - Optional: Keep if manual trigger is desired -->
<!--
	<div>
		<Button on:click={triggerManualEncode} disabled={isLoading} class="w-full sm:w-auto">
			Encode Manually (if needed)
		</Button>
	</div>
	-->

<!-- Error Display -->
{#if errorMessage}
	<Alert variant="destructive">
		<AlertTitle>Error</AlertTitle>
		<AlertDescription>{errorMessage}</AlertDescription>
	</Alert>
{/if}

<!-- Result Display -->
{#if apiResult}
	<Card class="w-full">
		<CardHeader>
			<CardTitle>Encoding Result</CardTitle>
			<CardDescription>Model: {apiResult.model_name}</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-2">
				<p class="text-sm font-medium">
					Embedding ({apiResult.embedding.length} dimensions total):
				</p>
				<pre
					class="mt-1 max-h-48 overflow-x-auto rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">{JSON.stringify(
						apiResult.embedding.slice(0, 10),
						null,
						2
					)} ...</pre>
			</div>
		</CardContent>
	</Card>
{/if}
