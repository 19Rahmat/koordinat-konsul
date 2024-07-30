<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchSubcollectionItems } from '$lib/data/configFirestore';
	import { fetchStudentsData } from '$lib/data/getData';

	let subcollectionItems: any[] | undefined = [];
	let nimFireStore = '';
	let nidnFireStore = '';
	let nameFireStore = '';
	let PA = '';
	let gelar = '';

	async function loadContacts() {
		try {
			const data = await fetchStudentsData();
			console.log(data);
			nidnFireStore = data.data.mahasiswa.dosenPA;
			nimFireStore = data.data.mahasiswa.nim;
			nameFireStore = data.data.mahasiswa.nama;
			PA = data.data.mahasiswa.dosenPenasehat.nama;
			gelar = data.data.mahasiswa.dosenPenasehat.gelar_belakang;
			console.log('nidn', nidnFireStore, '  ', 'nim', nimFireStore);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	onMount(async () => {
		await loadContacts();
		subcollectionItems = await fetchSubcollectionItems(nidnFireStore, nimFireStore);
		console.log(subcollectionItems, 'ini sub col');
	});
</script>

{#if subcollectionItems?.length > 0}
	<!-- <div
	id="reportKonsul"
	class="bg-white w-full h-full rounded-3xl overflow-hidden border-2 border-gray-600"
> -->
	<div id="reportKonsul" class="bg-white w-full h-fit">
		<header class="flex items-center justify-center px-3">
			<img src="/images/kop_surat.png" alt="logo unismuh" class="w-full h-full" />
		</header>
		<section class="flex flex-col justify-center items-center text-sm">
			<p>KARTU KONTROL PENASEHAT AKADEMIK</p>
			<p>FAKULTAS TEKNIK</p>
			<p>PROGRAM STUDI : INFORMATIKA</p>
			<p>TAHUN AKADEMIK : 2023 - 2024 (2)</p>
		</section>
		<sectxion class="text-black">
			<table>
				<thead>
					<tr>
						<td>Nama</td>
						<td>:</td>
						<!-- <td>{selectedStudent}</td> -->
						<td>{nameFireStore}</td>
					</tr>
					<tr>
						<td>Stambuk</td>
						<td>:</td>
						<td>{nimFireStore}</td>
					</tr>
					<tr>
						<td>Penasehat Akademik</td>
						<td>:</td>
						<td>{PA} ,{gelar}</td>
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
					{#each subcollectionItems as item, index}
						<tr>
							<td>{index + 1}</td>
							<td>{item.date}</td>
							<td>{item.desc}</td>
							<td>{item.approve ? 'Approved' : 'Not Approved'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</sectxion>
	</div>
{:else}
	<div class="border-2 border-gray-400 flex items-center justify-center rounded-lg w-full h-64">
		<p class="text-gray-400 text-lg font-semibold">Konsultasi ke DosenPA Terlebih Dahulu</p>
	</div>
{/if}

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
