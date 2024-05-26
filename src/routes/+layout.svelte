<script>
	import Layout from '../dashboard/Layout.svelte';
	import Login from '../authentication/Login.svelte';
	import { onMount } from 'svelte';
	import {isLoggedIn} from '../lib/function/getData';
	
	let hasSession = false;

onMount(()=>{
	checkSession();
})

function checkSession(){
	hasSession = isLoggedIn()
}

// function handleLogout(){
// 	clearSessionToken()
// 	checkSession()

// }
</script>

{#if hasSession}
	<Layout>
		<!-- <button on:click={handleLogout} class="text-white">Log out</button> -->
		<slot />
	</Layout>
{:else}
<Login />
{/if} 
