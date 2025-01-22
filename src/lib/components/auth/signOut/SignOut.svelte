<!--<header>-->
<!--	<nav>-->
<!--		<SignOut>-->
<!--			<span slot="submitButton">Signout</span>-->
<!--		</SignOut>-->
<!--	</nav>-->
<!--</header>-->

<script lang="ts">
	import { page } from "$app/state";
	import { SignOut } from "@auth/sveltekit/components";
</script>

<header>
	<nav>
		<SignOut
			options={{
				redirectTo: page.data.redirectTo
					? `/${decodeURIComponent(page.data.redirectTo).slice(1)}`
					: `/dashboard`
			}}
			className="w-full"
		>
			<span slot="submitButton">Sign in</span>
		</SignOut>
	</nav>
</header>
