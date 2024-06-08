<script lang="ts">
	import Talk from 'talkjs';
	import { onMount } from 'svelte';
	import Content from '$lib/components/Content.svelte';
	import { appId, dosenMe } from './talkJsConfig';
	import { fetchLectureData2 } from '$lib/data/Lecture';
	import { fetchStudentsData } from '$lib/data/Students';
	import { getRole } from '$lib/function/getData';

	let element: HTMLElement | null;

	let showContactList = false;
	let talkSession: any;
	let conversations: any[] = [];

	let mahasiswa: any[] = [];
	let contactList: any[] = [];
	let contactDosen: any[] = [];
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
			if (getRole() === 'dosen') {
				data = await fetchLectureData2();
				contactList = data.daftarmahasiswa.map((mahasiswa: any) => ({
					id: mahasiswa.nim,
					name: mahasiswa.nama,
					photoUrl: `https://simakad.unismuh.ac.id/upload/mahasiswa/${mahasiswa.nim}_.jpg?1714763929`,
					role: 'mahasiswa'
				}));
			} else {
				data = await fetchStudentsData();
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function initTalk() {
		Talk.ready.then(function () {
			let me = null;
			let mhs: any;
			let dosen: any;
			if (getRole() === 'dosen') {
				const { nama, nidn } = data.dosen;
				dosen = {
					id: nidn,
					name: nama,
					photoUrl: `https://simakad.unismuh.ac.id/upload/dosen/${nidn}_.jpg?1714763929`,
					role: 'default'
				};
				me = new Talk.User(dosen);
			} else {
				const { nim, nama } = data.data.mahasiswa;
				mhs = {
					id: nim,
					name: nama,
					photoUrl: `https://simakad.unismuh.ac.id/upload/mahasiswa/${nim}_.jpg?1714763929`,
					role: 'mahasiswa'
				};
				me = new Talk.User(mhs);
			}

			talkSession = new Talk.Session({
				appId: 'tgziXhR8',
				me
			});

			chatbox = talkSession.createChatbox();
			chatbox.select(null);
			chatbox.mount(element);

			if (getRole() === 'dosen') {
				conversations = contactList.map((contact) => {
					const talkUser = new Talk.User(contact);
					const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, talkUser));
					conversation.setParticipant(me);
					conversation.setParticipant(talkUser);
					return conversation;
				});
			} else {
				const dosenTalk = new Talk.User(dosenMe);
				console.log(dosenTalk);
				const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, dosenTalk));
				conversation.setParticipant(me);
				conversation.setParticipant(dosenTalk);
				chatbox.select(conversation);
				return conversation;
			}
		});
	}

	onMount(async () => {
		await loadContacts();
		initTalk();
		// console.log('di onMount', contactList);
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
				class="text-sm rounded-lg w-full overflow-x-auto mt-11 h-96 lg:w-1/3 p-2.5 z-10 absolute inset-y-0 left-0 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
			>
				{#each contactList as contact, index}
					<div
						class=" hover:bg-blue-500 contact-container"
						on:click={() => chatbox.select(conversations[index])}
					>
						{contact.name}
					</div>
				{/each}
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="w-full min-h-screen h-full">
			<div bind:this={element} class="flex items-center w-full h-4/5">
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
