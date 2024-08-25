<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchSubcollectionItems } from '$lib/data/configFirestore';
	import { fetchStudentsData } from '$lib/data/getData';
	import { fetchSignatureUrl } from '$lib/data/configFirestore';

	export let subcollectionItems: any[] | undefined = [];
	// let ttdUrl: any;
	let ttdUrl = 'https://ik.imagekit.io/nurman/titin_ttd_U7Olefhie.png?updatedAt=1724587513202';
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
		// ttdUrl = await fetchSignatureUrl(nidnFireStore);
	});
</script>

{#if subcollectionItems && Array.isArray(subcollectionItems) && subcollectionItems.length > 0}
	<div id="reportKonsul" class="bg-white w-full h-fit p-2 rounded-3xl">
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
						<td>{PA},{gelar}</td>
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
			<!-- {#if subcollectionItems.length >= 8 && ttdUrl}
				<div
					style={`background-image: url(${ttdUrl}); background-size: cover;background-position: center;`}
					class="flex-col items-center"
				>
					<p>Penasehat Akademik</p>
					<br /><br /><br /><br />

					<p class="underline font-bold">{PA}, {gelar}</p>
					<p>{nidnFireStore}</p>
				</div>
			{:else if ttdUrl == undefined}
				<div class="text-red-600 flex items-center text-center">
					<p>Dosen PA belum <br /> memberikan tanda tangan</p>
				</div>
			{:else}
				<div class="flex justify-center items-center">
					<p>konsultasi belum selesai</p>
				</div>
			{/if} -->
			<div
				style={`background-image: url(${ttdUrl}); background-size: cover;background-position: center;`}
				class="flex-col items-center"
			>
				<p>Penasehat Akademik</p>
				<br /><br /><br /><br />

				<p class="underline font-bold">TITIN WAHYUNI,S.Pd, M.T</p>
				<p>0903058406</p>
			</div>
		</section>
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
