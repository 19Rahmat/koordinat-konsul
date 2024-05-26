<script>
	import Layout from '../dashboard/Layout.svelte';
	import Auth from '../authentication/Auth.svelte'
	import hasSession from '../authentication/Auth.svelte'

</script>

{#if hasSession}
	<Layout>
		<slot />
	</Layout>
{:else}
<Auth />
{/if} 
