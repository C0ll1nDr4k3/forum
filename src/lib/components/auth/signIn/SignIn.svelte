<script lang="ts">
	import { page } from "$app/state";
	import { SignIn } from "@auth/sveltekit/components";
	import { Button } from "$lib/components/ui/button/index.js";
</script>
<SignIn
	options={{
		redirectTo: page.data.redirectTo
			? `/${decodeURIComponent(page.data.redirectTo).slice(1)}`
			: `/`
	}}
	className="w-full"
>
	<img src="../../../../../static/google.png" alt="Google Logo" />
	<Button href="/auth/signIn">Sign-In with Google</Button>
</SignIn>
<img src="../../../../../static/google.png" alt="Google Logo" />
<Button href="/auth/signIn">Sign-In with Google</Button>
