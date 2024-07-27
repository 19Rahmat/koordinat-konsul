<script>
	import { onMount } from 'svelte';
	// @ts-ignore
	export let shouldPrint = false;

	onMount(() => {
		if (shouldPrint) {
			printComponent();
		}
	});

	function printComponent() {
		const printContents = document.getElementById('printableTable')?.innerHTML;
		if (!printContents) return;

		const originalContents = document.body.innerHTML;

		document.body.innerHTML = printContents;

		window.print();

		document.body.innerHTML = originalContents;
		window.location.reload();
	}
</script>

<!-- <div class={$shouldPrint ? '' : 'hidden'}> -->
<div class="bg-white w-full h-full rounded-3xl overflow-hidden border-2 border-gray-600">
	<header class="flex items-center justify-center px-3">
		<img src="/images/kop_surat.png" alt="logo unismuh" class="w-full h-full" />
	</header>
	<section class="flex flex-col justify-center items-center text-sm">
		<p>KARTU KONTROL PENASEHAT AKADEMIK</p>
		<p>FAKULTAS TEKNIK</p>
		<p>PROGRAM STUDI : INFORMATIKA</p>
		<p>TAHUN AKADEMIK : 2020 - 2021 (1)</p>
	</section>
	<sectxion class="text-black">
		<table>
			<thead>
				<tr>
					<td>Nama</td>
					<td>:</td>
					<!-- <td>{selectedStudent}</td> -->
					<td />
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
				<!-- {#each Object.entries(consultationTable) as [studentId, rows]}
						{#each rows as row, index}
							<tr>
								<td>{index + 1}</td>
								<td>{row.date}</td>
								<td>{row.description}</td>
								<td>{row.ket}</td>
							</tr>
						{/each}
					{/each} -->
			</tbody>
		</table>
	</sectxion>
</div>

<!-- </div> -->

<style>
	.hidden {
		display: none;
	}
</style>
