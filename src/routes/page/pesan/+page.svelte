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
	let handleSelectConversation: HTMLElement | null;

	let inboxContainer: HTMLElement | null;

	// let selectedContact: Talk.User;

	// let dosen: any;
	let daftarmahasiswa: any;

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
			contactList.map(async (user: User, index: number) => {
				const TalkUser = new Talk.User(user);
				const conversation = await session.getOrCreateConversation(Talk.oneOnOneId(me, TalkUser));
				conversation.setParticipant(me);
				conversation.setParticipant(TalkUser);
				return conversation;
			})
		);

		function handleSelectConversation() {
			if (selectedConversation) {
				const selectedConv = conversations.find((c) => c.id === selectedConversation);
				if (selectedConv) {
					chatbox.select(selectedConv);
					chatbox.mount(element);
				}
			}
		}
		handleSelectConversation();
	}

	onMount(async () => {
		await loadContacts();
		await createConversation();
	});
</script>

<svelte:head>
	<title>Pesan</title>
</svelte:head>

<Content title="Pesan" aside_title="Inbox">
	<svelte:fragment slot="head">
		<!-- bind:value={selectedContact} -->
		<select
			bind:value={selectedConversation}
			on:click={handleSelectConversation}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="">Pilih Mahasiswa</option>
			{#each contactList as contact}
				<option value={contact.id}>{contact.name}, {contact.role}</option>
			{/each}
		</select>
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
		<div bind:this={inboxContainer}>
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
