<script lang="ts">
	import { onMount } from 'svelte';
	import Content from '$lib/components/Content.svelte';
	import Talk from 'talkjs';
	import { fetchLectureData2 } from '$lib/data/getData';

	let element: HTMLElement | null;

	let showContactList = false;
	let talkSession: any;
	let conversations: any[] = [];

	let contactList: any[] = [];
	let chatbox: any;

	let data: any;

	interface User {
		id: string;
		name: string;
		photoUrl: string;
		role: string;
	}

	async function loadContacts() {
		try {
			data = await fetchLectureData2();
			contactList = data.daftarmahasiswa.map((mahasiswa: any) => ({
				id: mahasiswa.nim,
				name: mahasiswa.nama,
				photoUrl: `https://simakad.unismuh.ac.id/upload/mahasiswa/${mahasiswa.nim}_.jpg?1714763929`,
				role: 'mahasiswa'
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function initTalk() {
		Talk.ready.then(function () {
			let me = null;
			let dosen: any;
			const { nama, nidn } = data.dosen;
			dosen = {
				id: nidn,
				name: nama,
				photoUrl: `https://simakad.unismuh.ac.id/upload/dosen/${nidn}_.jpg?1714763929`,
				role: 'default'
			};
			me = new Talk.User(dosen);

			talkSession = new Talk.Session({
				appId: 'tgziXhR8',
				me
			});

			chatbox = talkSession.createChatbox();
			chatbox.select(null);
			chatbox.mount(element);
			conversations = contactList.map((contact) => {
				const talkUser = new Talk.User(contact);
				const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, talkUser));
				conversation.setParticipant(me);
				conversation.setParticipant(talkUser);
				return conversation;
			});
		});
	}

	onMount(async () => {
		await loadContacts();
		initTalk();
	});
</script>

<svelte:head>
	<title>Pesan</title>
</svelte:head>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<Content title="Pesan" aside_title="inbox" visit={false}>
	<svelte:fragment slot="head">
		<button
			on:click={() => (showContactList = !showContactList)}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
			>Pilih Mahasiswa</button
		>
		{#if showContactList}
			<div
				on:mouseleave={() => (showContactList = false)}
				class="text-sm rounded-lg w-full overflow-x-auto mt-11 h-96 lg:w-1/3 p-2.5 z-10 absolute inset-y-0 left-0 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
			>
				{#each contactList as contact, index}
					<div
						class=" hover:bg-blue-500 contact-container cursor-pointer"
						on:click={() => chatbox.select(conversations[index])}
					>
						{contact.name}
					</div>
				{/each}
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="w-full min-h-screen h-4/5 border border-gray-600 rounded-xl">
			<div bind:this={element} class="flex items-center w-full h-full">
				<img
					src="https://ik.imagekit.io/nurman/koordinat-konsul/loading.svg?updatedAt=1717038962097"
					height="100px"
					width="100px"
					alt="loading chat"
				/>
				<p class=" text-white">Loading chat...</p>
			</div>
		</section>
	</svelte:fragment>
</Content>
