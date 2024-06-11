<script>
	import Layout from '$lib/dashboard/Layout.svelte';
	import Login from '../lib/authentication/Login.svelte';
	import { onMount } from 'svelte';
	import { isLoggedIn } from '$lib/data/getData';

	let hasSession = false;

	onMount(() => {
		checkSession();
	});

	function checkSession() {
		hasSession = isLoggedIn();
	}
</script>

{#if hasSession}
	<Layout>
		<slot />
	</Layout>
{:else}
	<Login />
{/if}
