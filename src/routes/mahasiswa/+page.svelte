<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import { onMount } from 'svelte';
	import Talk from 'talkjs';
	import { fetchStudentsData } from '$lib/data/getData';
	import { createDocumentWithSubcollection } from '$lib/data/configFirestore';
	import { fetchSubcollectionItems } from '$lib/data/configFirestore';

	let subcollectionItems: any[] | undefined = [];

	let nimFireStore = '';
	let nidnFireStore = '';

	let element: HTMLElement | null;
	let talkSession: any;
	let chatbox: any;
	let data: any;

	async function loadContacts() {
		try {
			data = await fetchStudentsData();
			nidnFireStore = data.data.mahasiswa.dosenPA;
			nimFireStore = data.data.mahasiswa.nim;
			console.log('nidn', nidnFireStore, '  ', 'nim', nimFireStore);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	function initTalk() {
		Talk.ready.then(function () {
			let me = null;
			let mhs: any;
			const { nim, nama } = data.data.mahasiswa;
			mhs = {
				id: nim,
				name: nama,
				photoUrl: `https://simakad.unismuh.ac.id/upload/mahasiswa/${nim}_.jpg?1714763929`,
				role: 'mahasiswa'
			};
			me = new Talk.User(mhs);

			talkSession = new Talk.Session({
				appId: 'tgziXhR8',
				me
			});

			chatbox = talkSession.createChatbox();
			chatbox.select(null);
			chatbox.mount(element);

			const { dosenPA } = data.data.mahasiswa;
			const dosenTalk = new Talk.User({
				id: dosenPA,
				name: 'Dosen PA',
				photoUrl: `https://simakad.unismuh.ac.id/upload/dosen/${dosenPA}_.jpg?1714763929`,
				role: 'default'
			});
			console.log(dosenTalk);
			const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, dosenTalk));
			conversation.setParticipant(me);
			conversation.setParticipant(dosenTalk);

			chatbox.select(conversation);
			chatbox.onCustomConversationAction('ajukanPersetujuan', (event: any) => {
				createDocumentWithSubcollection(nidnFireStore, nimFireStore);

				alert('Permohonan berhasil terkirim');
			});
			chatbox.onCustomMessageAction('nurmanAct', (event: any) => {
				alert('hahah');
			});
		});
	}

	onMount(async () => {
		await loadContacts();
		initTalk();
		subcollectionItems = await fetchSubcollectionItems(nidnFireStore, nimFireStore);
	});
</script>

<Content title="Beranda" aside_title="Konsultasi" visit={true}>
	<svelte:fragment slot="body">
		<section class="w-full min-h-screen h-4/5">
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
	<svelte:fragment slot="aside_body">
		<section
			class="h-80 border-t border-gray-400 w-full flex flex-col items-center justify-center gap-3"
		>
			<h1 class="text-9xl font-bold text-gray-200">{subcollectionItems?.length}/8</h1>
			<p class=" text-xl font-semibold text-white">selesai</p>
		</section>
	</svelte:fragment>
</Content>
