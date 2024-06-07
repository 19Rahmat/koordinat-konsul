<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchLectureData2 } from '$lib/data/Lecture';

	interface contactsList {
		id: number;
		name: string;
		photoUrl: string;
	}

	export let selectedContact: contactsList | null = null;
	// let selectedContact;
	let dosen: any[] = [];
	let contactList: any[] = [];

	async function loadContacts() {
		try {
			const data = await fetchLectureData2();
			dosen = data.dosen;
			console.log(dosen);
			contactList = data.daftarmahasiswa.map((mahasiswa) => ({
				id: mahasiswa.nim, // Use nim as unique identifier
				name: mahasiswa.nama,
				photoUrl: `https://simakad.unismuh.ac.id/upload/mahasiswa/${mahasiswa.nim}_.jpg?1714763929`,
				role: mahasiswa.angkatan.toString()
			}));
			console.log(contactList);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
	onMount(() => {
		const contactsListDivs = Array.from(
			document.getElementsByClassName('contact-container')
		) as HTMLDivElement[];

		contactsListDivs.forEach((div: HTMLDivElement, index: number) => {
			div.addEventListener('click', () => {
				selectedContact = contactList[index];
			});
		});
	});
</script>

<div id="contacts-list">
	<h2>Contacts</h2>
	{#each contactList as contact}
		<div class="contact-container" bind:this={contact}>
			<img src={contact.photoUrl} alt={contact.name} />
			<div class="contact-name">
				<span>{contact.name}</span>
			</div>
		</div>
	{/each}
</div>

<style>
	#contacts-list {
		margin-top: auto;
		width: 700px;
		border: #d0d8dc solid 1px;
		height: 510px;
		color: #111;
		font-family: 'Open Sans', sans-serif;
	}

	#contacts-list h2 {
		color: #111;
		background: #e7ecee;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		font-size: 14px;
		font-weight: 700;
		margin: 0;
		padding-top: 20px;
		padding-left: 20px;
		text-align: left;
		height: 40px;
	}

	.contact-container {
		height: 50px;
		display: flex;
		margin: 5px 0;
		padding: 5px 0;
		cursor: pointer;
	}

	.contact-container:hover {
		background-color: #e7ecee;
	}

	.contact-name {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	img {
		height: 40px;
		width: 40px;
		border-radius: 200px;
		margin-left: 20px;
		margin-right: 20px;
	}
</style>
