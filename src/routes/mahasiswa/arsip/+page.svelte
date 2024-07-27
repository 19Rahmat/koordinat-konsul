<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import { createConsultation } from '$lib/data/configFirestore';
	import ControlCard from '$lib/components/ControlCard.svelte';
	import { writable } from 'svelte/store';

	let time = '';
	let description = '';
	let studentId = '';
	let Cetak = false;
	function handlePrint() {
		Cetak = true;
	}

	let shouldPrint = false;

	function triggerPrint() {
		shouldPrint = true;
	}
</script>

<Content title="Arsip" aside_title="Tindakan" visit={true}>
	<svelte:fragment slot="body">
		<!-- {#if shouldPrint} -->
		<ControlCard {shouldPrint} />
		<!-- {/if} -->
		<!-- <h2>Consultation</h2>
		<form on:submit|preventDefault={createConsultation}>
			<label>
				Time:
				<input type="datetime-local" bind:value={time} />
			</label>
			<label>
				Description:
				<textarea bind:value={description} />
			</label>
			<label>
				Student ID:
				<input type="text" bind:value={studentId} />
			</label>
			<button type="submit">Create</button>
		</form> -->
	</svelte:fragment>
	<svelte:fragment slot="aside_body">
		<button
			on:click={triggerPrint}
			class=" text-white text-3xl bg-blue-500 p-6 rounded-lg w-full flex items-center justify-center gap-5"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M16 8V5H8v3H6V3h12v5zM4 10h16zm14 2.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4zm2-6v-4q0-.425-.288-.712T19 10H5q-.425 0-.712.288T4 11v4h2v-2h12v2z"
				/></svg
			>
			<span class=" font-semibold">Cetak</span>
		</button>
		<a
			href="/mahasiswa"
			class=" text-white text-3xl bg-green-500 p-6 rounded-lg w-full flex items-center justify-center gap-5 mt-5"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"
				><path
					fill="currentColor"
					d="M4 4h16v12H5.17L4 17.17zm0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm2 10h8v2H6zm0-3h12v2H6zm0-3h12v2H6z"
				/></svg
			>
			<span class=" font-semibold">Konsul Ulang</span>
		</a>
	</svelte:fragment>
</Content>
