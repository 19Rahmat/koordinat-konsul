<script lang="ts">
	import Content from '../../../lib/components/Content.svelte';
	import consultationTable from '$lib/data/consultation';
	import { fetchLectureData2 } from '$lib/data/getData';
	import { onMount } from 'svelte';
	import { db } from '$lib/data/firebase';
	import {
		doc,
		getDoc,
		updateDoc,
		arrayUnion,
		Timestamp,
		deleteField,
		arrayRemove
	} from 'firebase/firestore';

	let selectedStudent = '';

	let dosen: any[] = [];
	let contactList: any[] = [];

	function removeRow(studentId: any, index: any) {
		if (consultationTable[studentId]) {
			consultationTable[studentId] = consultationTable[studentId].filter((row, i) => i !== index);
			console.log(studentId);
		}
	}

	let reportTable: any = [];
	let reportTableVisible = false;

	type KonsulItem = {
		desc: string;
		date: string;
	};

	// let docId = '0903058406';
	let docId: any;
	let data: any = [];
	let fireStoreData: Record<string, KonsulItem[]> = {};
	let date = '';
	let desc = '';
	let approve = false;
	// let d

	let selectedKey = '';

	async function updateDocument(docId: string, key: string, desc: string, date: string) {
		const docRef = doc(db, 'koordinatKonsul', docId);

		try {
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				// Use arrayUnion to add a new element to the array field
				await updateDoc(docRef, {
					[key]: arrayUnion({ desc, date })
				});

				console.log(`Document updated with new data under key ${key}`);
			} else {
				console.log('No such document!');
			}
		} catch (e) {
			console.error('Error updating document: ', e);
		}
	}

	async function fetchDocument() {
		try {
			const docRef = doc(db, 'koordinatKonsul', docId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				fireStoreData = docSnap.data();
				// selectedKey = Object.keys(fireStoreData)[0]; // Default to the first key
				data = fireStoreData[selectedKey];
				console.log('Document data:', fireStoreData);
				// console.log('the data', data);
			} else {
				console.log('No such document!');
			}
		} catch (e) {
			console.error('Error fetching document: ', e);
		}
	}

	function onSelectChange(event: Event): void {
		const target = event.target as HTMLSelectElement;
		selectedKey = target.value;
		data = fireStoreData[selectedKey];
	}

	async function deleteFieldFromDocument(docId: string, field: string, index: number) {
		try {
			const docRef = doc(db, 'koordinatKonsul', docId);
			await updateDoc(docRef, {
				[field]: arrayRemove(index)
			});
			console.log(`Field deleted: ${field}`);
		} catch (e) {
			console.error('Error deleting field: ', e);
		}
	}

	function handleUpdate() {
		const timestamp = Timestamp.fromDate(new Date(date));
		updateDocument(docId, selectedKey, desc, date);
	}

	onMount(async () => {
		docId = localStorage.getItem('userLogin');
		fetchDocument();
	});
</script>

<svelte:head>
	<title>Arsip</title>
</svelte:head>

<Content title="Arsip" aside_title="Form Konsultasi" visit={true}>
	<svelte:fragment slot="head">
		<select
			bind:value={selectedKey}
			on:change={onSelectChange}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="">Pilih Mahasiswa</option>
			{#each Object.keys(fireStoreData) as studentId}
				<option value={studentId}>{studentId}</option>
			{/each}
		</select>
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="flex gap-3 justify-center items-center">
			{#if data}
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
									<tr>
										<td>Nama</td>
										<td>:</td>
										<td>{selectedKey}</td>
									</tr>
									<tr>
										<td>Stambuk</td>
										<td>:</td>
									</tr>
									<tr>
										<td>Penasehat Akademik</td>
										<td>:</td>
									</tr>
								</thead>
							</table>
							<table id="laporan">
								<thead>
									<tr>
										<th>No</th>
										<th>Hari/Tanggal</th>
										<th>Uraian</th>
										<th>Keterangan</th>
									</tr>
								</thead>
								<tbody>
									<!-- {#each Object.entries(fireStoreData) as [studentId, rows]} -->
									{#each data as row, index}
										<tr>
											<td>{index + 1}</td>
											<td>{row.date}</td>
											<td>{row.desc}</td>
										</tr>
									{/each}
									<!-- {/each} -->
								</tbody>
							</table>
						</sectxion>
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
				{#if data}
					{#each data as row, index}
						<span>Konsultasi ke {index}</span>
						<div class="flex rounded-lg shadow-sm">
							<span
								class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-700"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 512 512"
								>
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
								type="datetime-local"
								bind:value={row.date}
								class="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-e-lg text-sm"
							/>
						</div>

						<div class="flex rounded-lg shadow-sm">
							<span
								class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-700"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 24 24"
								>
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
								bind:value={row.desc}
								placeholder="Uraian konsultasi"
								class="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm rounded-e-lg text-sm"
							/>
						</div>

						<div class="flex rounded-lg shadow-sm">
							<span
								class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-300 text-2xl text-gray-600"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="1em"
									height="1em"
									viewBox="0 0 24 24"
								>
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
							<input
								type="text"
								bind:value={row.ket}
								placeholder="Keterangan"
								class="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm rounded-e-lg text-sm"
							/>
						</div>

						<button
							on:click={() => deleteFieldFromDocument(docId, data, index)}
							class="text-white focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-red-600 hover:bg-red-700"
							>Hapus</button
						>
					{/each}
				{:else}
					<div
						class="border-2 border-gray-400 flex items-center justify-center rounded-lg w-full h-64"
					>
						<p class=" text-lg font-semibold">Pilih Mahasiswa <br /> Terlebih Dahulu</p>
					</div>
				{/if}
			</div>

			<div class="flex mt-2">
				<button
					on:click={handleUpdate}
					class="py-2 px-3 pe-11 block w-full shadow-sm rounded-lg text-sm font-medium bg-green-200"
					>Simpan Table Laporan</button
				>
			</div>
			<div class="flex mt-2">
				<button
					class="px-4 inline-flex items-center min-w-fit rounded-s-md border-e-0 bg-indigo-700 text-xl text-white font-semibold"
					>✓</button
				>
				<button
					class="py-2 px-3 pe-11 block w-full shadow-sm rounded-e-lg text-sm font-medium bg-green-200"
					>Tampilkan Tabel Laporan</button
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
