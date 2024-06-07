<script lang="ts">
	import Talk from 'talkjs';
	import { onMount } from 'svelte';
	import Content from '$lib/components/Content.svelte';
	import { appId, dosenMe } from './talkJsConfig';
	import { fetchLectureData2 } from '$lib/data/Lecture';
	import { whosLogin } from '$lib/function/getData';
	// import { User } from 'talkjs/all';
	let selectedConversation: string | null = null;
	let element: HTMLElement | null;

	let showContactList = false;
	let daftarmahasiswa: any;
	let selectedContact: Talk.UserOptions;
	let talkSession;

	let contacts: any[] = [];
	let dosen: any[] = [];
	let contactList: any[] = [];
	//   let conversations: any[] = [];
	interface User {
		id: string;
		name: string;
		// Add any other properties of the user object
	}

	async function loadContacts() {
		try {
			const data = await fetchLectureData2();
			dosen = data.dosen;
			console.log(dosen);
			contactList = data.daftarmahasiswa.map((mahasiswa) => ({
				id: mahasiswa.nim, // Use nim as unique identifier
				name: mahasiswa.nama,
				role: mahasiswa.angkatan.toString()
			}));
			console.log(contactList);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async function createConversation() {
		await Talk.ready;

		const me = new Talk.User(dosenMe);
		const session = new Talk.Session({ appId, me });
		const chatbox = session.createChatbox();
		// chatbox.select = null;
		const conversations: any[] = await Promise.all(
			contactList.map(async (user: User) => {
				const TalkUser = new Talk.User(user);
				const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, TalkUser));
				conversation.setParticipant(me);
				conversation.setParticipant(TalkUser);
				return conversation;
			})
		);

		let contactsListDivs = document.getElementsByClassName('contact-container');
		conversations.forEach((conversation, index) => {
			contactsListDivs[index].addEventListener('click', () => {
				chatbox.select(conversation);
			});
		});
	}

	onMount(async () => {
		await loadContacts();
		const me = new Talk.User(dosenMe);

		// Start TalkJS Session
		talkSession = new Talk.Session({
			appId: 'tgziXhR8',
			me: me
		});

		// Create and mount the chatbox
		const chatbox = talkSession.createChatbox();
		chatbox.mount(element);

		// Handle contact selection
	});
</script>

<svelte:head>
	<title>Pesan</title>
</svelte:head>

<Content title="Pesan" aside_title="Inbox">
	<svelte:fragment slot="head">
		<!-- bind:value={selectedContact} -->
		<button
			on:click={() => (showContactList = !showContactList)}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
			>Pilih Mahasiswa</button
		>
		{#if showContactList}
			<div
				class="text-sm rounded-lg w-full overflow-x-auto mt-11 h-96 lg:w-1/3 p-2.5 z-10 absolute inset-y-0 left-0 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
			>
				{#each contactList as contact}
					<div class=" hover:bg-blue-500 contact-container">
						{contact.name}, {contact.role}
						<img
							src={`https://simakad.unismuh.ac.id/upload/mahasiswa/${contact.id}_.jpg?1714763929`}
							alt=""
							class=" rounded-full contact-img"
						/>
					</div>
				{/each}
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="w-full min-h-screen h-full">
			<div bind:this={element} class="flex items-center">
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
	<svelte:fragment slot="aside_body">
		<div>
			<img
				src="https://ik.imagekit.io/nurman/koordinat-konsul/loading.svg?updatedAt=1717038962097"
				height="100px"
				width="100px"
				alt="loading chat"
			/>
			<p class=" text-white">Loading inbox...</p>
		</div>
	</svelte:fragment>
</Content>

<style>
	.contact-img {
		height: 40px;
		width: 40px;
	}
</style>
