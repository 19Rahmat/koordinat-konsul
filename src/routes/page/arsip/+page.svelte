<script lang="ts">
	import Content from '../../../lib/components/Content.svelte';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { db } from '$lib/data/firebase';
	import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
	import { fetchLectureData2 } from '$lib/data/getData';
	import { fetchSignatureUrl } from '$lib/data/configFirestore';

	let dosen: any[] = [];
	let contactList: any[] = [];

	let reportTable: any = [];
	let reportTableVisible = false;
	// data PA
	let namaPA: any;
	let gelarPA: any;
	let ttdUrl: any;
	let file: any;

	let approve = false;
	async function loadContacts() {
		try {
			const data = await fetchLectureData2();
			namaPA = data.dosen.nama;
			gelarPA = data.dosen.gelar_belakang;
			subcollectionNames = data.daftarmahasiswa.map((mahasiswa: any) => mahasiswa.nim);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
	// <!-- =================================================== -->

	interface SubcollectionItem {
		id: string;
		date: string;
		desc: string;
		approve: boolean;
	}

	// Store for the subcollection items
	let items: Writable<SubcollectionItem[]> = writable([]);
	let newItem: Omit<SubcollectionItem, 'id'> = { date: '', desc: '', approve: false };
	let isEditing: boolean = false;
	let editingItemId: any;

	let mainDocId: any;
	let subcollectionNames: any[] = [];
	let selectedSubcollection: string;

	// Fetch and display the data from the selected subcollection in Firestore
	async function fetchItems() {
		const subcollectionRef = collection(db, 'koordinatKonsul', mainDocId, selectedSubcollection);
		const querySnapshot = await getDocs(subcollectionRef);
		const fetchedItems: SubcollectionItem[] = [];

		querySnapshot.forEach((doc) => {
			const data = doc.data();

			fetchedItems.push({ id: doc.id, ...data } as SubcollectionItem);
		});
		items.set(fetchedItems);
	}

	// Add or update an item in Firestore
	async function saveItem() {
		const subcollectionRef = collection(db, 'koordinatKonsul', mainDocId, selectedSubcollection);
		if (isEditing && editingItemId) {
			const docRef = doc(subcollectionRef, editingItemId);
			await setDoc(docRef, newItem);
			isEditing = false;
			editingItemId = null;
		} else {
			const docRef = doc(subcollectionRef);
			await setDoc(docRef, newItem);
		}
		newItem = { date: '', desc: '', approve: false };
		fetchItems();
	}

	// Edit an item
	function editItem(item: SubcollectionItem) {
		newItem = { date: item.date, desc: item.desc, approve: item.approve };
		isEditing = true;
		editingItemId = item.id;
	}

	// Delete an item from Firestore
	async function deleteItem(id: string) {
		const subcollectionRef = collection(db, 'koordinatKonsul', mainDocId, selectedSubcollection);
		const docRef = doc(subcollectionRef, id);
		await deleteDoc(docRef);
		fetchItems();
	}

	const uploadUrl = 'https://upload.imagekit.io/api/v1/files/upload';
	const publicKey = 'private_pAfesmM8enhg2Up/GfC9OBWUMnY=';

	const handleFileUpload = async () => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', file.name);

		try {
			const response = await fetch(uploadUrl, {
				method: 'POST',
				headers: {
					Authorization: `Basic ${btoa(publicKey + ':')}`
				},
				body: formData
			});

			const data = await response.json();
			console.log('Success:', data);
			ttdUrl = data.url;

			console.log(ttdUrl);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleFileChange = async (event: any) => {
		file = event.target.files[0];
		handleFileUpload();
	};

	onMount(async () => {
		await loadContacts();
		mainDocId = localStorage.getItem('userLogin');
		ttdUrl = await fetchSignatureUrl(mainDocId);
		console.log(ttdUrl);
	});

	// Fetch items on component mount or when selected subcollection changes
	$: selectedSubcollection, fetchItems();
	$: ttdUrl;
</script>

<svelte:head>
	<title>Arsip</title>
</svelte:head>

<Content title="Arsip" aside_title="Form Konsultasi" visit={true}>
	<svelte:fragment slot="head">
		<select
			bind:value={selectedSubcollection}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="">Pilih Mahasiswa</option>
			{#each subcollectionNames as studentId}
				<option value={studentId}>{studentId}</option>
			{/each}
		</select>
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="flex gap-3 justify-center items-center">
			{#if selectedSubcollection}
				<div class="w-full">
					<div class="bg-white w-full h-full rounded-3xl overflow-hidden border-2 border-gray-600">
						<header class="flex items-center justify-center px-3">
							<img src="/images/kop_surat.png" alt="logo unismuh" class="w-full h-full" />
						</header>
						<section class="flex flex-col justify-center items-center text-sm">
							<p>KARTU KONTROL PENASEHAT AKADEMIK</p>
							<p>FAKULTAS TEKNIK</p>
							<p>PROGRAM STUDI : INFORMATIKA</p>
							<p>TAHUN AKADEMIK : 2023 - 2024 (1)</p>
						</section>
						<sectxion class="text-black">
							<table>
								<thead>
									<!-- <tr>
										<td>Nama</td>
										<td>:</td>
										<td />
									</tr> -->
									<tr>
										<td>Nim Mahasiswa</td>
										<td>:</td>
										<td>{selectedSubcollection}</td>
									</tr>
									<tr>
										<td>Penasehat Akademik</td>
										<td>:</td>
										<td>{namaPA}, {gelarPA}</td>
									</tr>
								</thead>
							</table>
							<table id="laporan">
								<thead>
									<tr>
										<th>No</th>
										<th>Tanggal</th>
										<th>Uraian</th>
										<th>Keterangan</th>
									</tr>
								</thead>
								<tbody>
									{#each $items as row, index}
										<tr class=" cursor-pointer hover:bg-gray-300" on:click={() => editItem(row)}>
											<td>{index + 1}</td>
											<td>{row.date}</td>
											<td>{row.desc}</td>
											<td>{row.approve ? 'disetujui' : 'tidak disetujui'}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</sectxion>
						<section class=" mt-6 flex justify-around p-3">
							<div
								style="background-image: url(https://ik.imagekit.io/nurman/koordinat-konsul/muhyiddin_ttd.png?updatedAt=1722470314307); background-size: cover;background-position: center;"
								class=" flex-col items-center"
							>
								<p>Ketua Program Studi</p>
								<br /><br /><br /><br />

								<p class="underline font-bold">Muhyiddin A. M Hayat, S.Kom., MT.</p>
								<p>NBM.</p>
							</div>
							{#if $items.length == 8 && ttdUrl}
								<!-- <input type="file" /> -->
								<!-- {:else if ttdUrl} -->
								<div
									style={`background-image: url(${ttdUrl}); background-size: cover;background-position: center;`}
									class="flex-col items-center"
								>
									<p>Penasehat Akademik</p>
									<br /><br /><br /><br />

									<p class="underline font-bold">{namaPA}, {gelarPA}</p>
									<p>{mainDocId}</p>
								</div>
							{:else if ttdUrl == undefined}
								<div class="flex items-center justify-center w-1/3">
									<label
										for="dropzone-file"
										class="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-500 border-dashed rounded-2xl cursor-pointer hover:bg-gray-100"
									>
										<div class="flex flex-col items-center justify-center pt-5 pb-6">
											<svg
												class="w-8 h-8 mb-4 text-gray-500"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 20 16"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
												/>
											</svg>
											<p class="mb-2 text-sm text-gray-500">
												<span class="font-semibold">Click to upload</span>
											</p>
											<p class="text-xs text-gray-500">or drag signature</p>
										</div>
									</label>
									<input
										id="dropzone-file"
										type="file"
										class="hidden"
										on:change={handleFileChange}
									/>
								</div>
							{:else}
								<div class="flex justify-center items-center">
									<p>konsultasi belum selesai</p>
								</div>
							{/if}
						</section>
					</div>
				</div>
			{:else}
				<div
					class="border-2 border-gray-600 flex items-center justify-center rounded-3xl w-full h-64"
				>
					<p class="text-white text-lg font-semibold">Mahasiswa Belum Melakukan Konsultasi</p>
				</div>
			{/if}
		</section>
	</svelte:fragment>
	<svelte:fragment slot="aside_body">
		<div class="w-full p-1">
			<div class="bg-white rounded-lg p-4 gap-1 flex flex-col">
				<span>Ubah | Tambah Konsultasi</span>
				<div class="flex rounded-lg shadow-sm">
					<span
						class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-700"
						><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
							<rect
								width="416"
								height="384"
								x="48"
								y="80"
								fill="none"
								stroke="currentColor"
								stroke-linejoin="round"
								stroke-width="32"
								rx="48"
							/>
							<circle cx="296" cy="232" r="24" fill="currentColor" />
							<circle cx="376" cy="232" r="24" fill="currentColor" />
							<circle cx="296" cy="312" r="24" fill="currentColor" />
							<circle cx="376" cy="312" r="24" fill="currentColor" />
							<circle cx="136" cy="312" r="24" fill="currentColor" />
							<circle cx="216" cy="312" r="24" fill="currentColor" />
							<circle cx="136" cy="392" r="24" fill="currentColor" />
							<circle cx="216" cy="392" r="24" fill="currentColor" />
							<circle cx="296" cy="392" r="24" fill="currentColor" />
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="32"
								d="M128 48v32m256-32v32"
							/>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linejoin="round"
								stroke-width="32"
								d="M464 160H48"
							/>
						</svg></span
					>
					<input
						type="date"
						bind:value={newItem.date}
						class="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-e-lg text-sm"
					/>
				</div>

				<div class="flex rounded-lg shadow-sm">
					<span
						class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-700"
						><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
							<g
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								color="currentColor"
							>
								<path
									d="M10.29 21.961h-.9c-3.248 0-4.873 0-5.882-1.025S2.5 18.261 2.5 14.961v-5c0-3.3 0-4.95 1.01-5.974C4.517 2.96 6.142 2.96 9.39 2.96h2.953c3.249 0 5.147.056 6.156 1.08c1.01 1.026 1 2.62 1 5.92v1.187M15.945 2v2m-5-2v2m-5-2v2M7 15h4m-4-5h8"
								/>
								<path
									d="M20.76 14.879c-.906-1.015-1.449-.954-2.052-.773c-.423.06-1.871 1.75-2.475 2.29c-.991.978-1.987 1.986-2.052 2.118c-.188.305-.362.845-.447 1.449c-.157.906-.383 1.925-.097 2.013s1.087-.08 1.992-.213c.604-.11 1.026-.23 1.328-.411c.423-.254 1.207-1.147 2.56-2.476c.847-.893 1.665-1.51 1.907-2.113c.241-.906-.12-1.39-.664-1.885"
									opacity="0.93"
								/>
							</g>
						</svg></span
					>
					<input
						type="text"
						bind:value={newItem.desc}
						placeholder="Uraian konsultasi"
						class="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-e-lg text-sm"
					/>
				</div>

				<div class="flex rounded-lg shadow-sm">
					<span
						class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-600"
						><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 5h8m-8 4h5m-5 6h8m-8 4h5M3 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
							/>
						</svg></span
					>

					<div class="flex rounded-lg py-2 px-3 shadow-sm border border-e-0 border-gray-300 w-full">
						<label class="inline-flex gap-3 items-center cursor-pointer">
							<span class=" text-gray-400 text-sm dark:text-gray-400">Setujui</span>
							<input type="checkbox" bind:checked={newItem.approve} class="sr-only peer" />
							<div
								class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
							/>
						</label>
					</div>
				</div>
				<button
					on:click={() => deleteItem(editingItemId)}
					class="text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-red-600 hover:bg-red-700"
					>Hapus</button
				>
			</div>
			<div class="flex mt-2">
				<button
					on:click={saveItem}
					class="py-2 px-3 pe-11 block w-full shadow-sm rounded-lg text-sm font-medium bg-green-200"
					>{isEditing ? 'Save Change' : 'New Data'}</button
				>
			</div>
		</div></svelte:fragment
	>
</Content>

<style>
	#laporan {
		width: 100%;
		text-align: center;
		border: 1px solid black;
	}
	#laporan th {
		border: 1px solid black;
	}
	#laporan td {
		border-left: 1px solid black;
		border-right: 1px solid black;
		border-collapse: collapse;
	}
</style>
