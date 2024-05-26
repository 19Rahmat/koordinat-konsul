<script>
	// import PrintElements from './print_elements';
	import Consultation from './consultation';
	import consultationTable from './consultation';

	export let reportTable = Consultation;
</script>

<div class="bg-white w-full h-full" id="laporan">
	<header class="flex items-center justify-center px-20">
		<img src="/images/logo-unismuh.png" alt="logo unismuh" width="100" height="100" />

		<div class="text-blue-600 text-xl font-semibold font-sans text-center h-40">
			<h1>UNIVERSITAS MUHAMMADIYAH MAKASSAR</h1>
			<h1>PROGRAM STUDI INFORMATIKA</h1>
			<h1>FAKULTAS TEKNIK</h1>
			<p class="text-sm font-normal my-1">GEDUNG MENARA IQRA LT. 3</p>
			<p class="text-sm font-normal text-black">
				JI. Sultan Alauddin No. 259 Telp. (0411) 866 972 Fax (0-411) 865 588 Makassar 9022 Website:
				www.unismuh.ac.id, e-mail: unismuh@gmail.com Website : <span class="text-blue-600 underline"
					>http://teknik.unismuh.makassar.ac.id</span
				>
			</p>
		</div>
	</header>
	<br />
	<hr class="border-2 border-black" />
	<section class="flex flex-col justify-center items-center text-sm">
		<img src="/images/bismillah.png" alt="bismillah" height="80" width="200" />
		<p>KARTU KONTROL PENASEHAT AKADEMIK</p>
		<p>FAKULTAS TEKNIK</p>
		<p>PROGRAM STUDI : INFORMATIKA</p>
		<p>TAHUN AKADEMIK : 2020 - 2021 (1)</p>
	</section>
	<table>
		<tr>
			<td>Nama</td>
			<td>:</td>
		</tr>
		<tr>
			<td>Stambuk</td>
			<td>:</td>
		</tr>
		<tr>
			<td>Penasehat Akademik</td>
			<td>:</td>
		</tr>
	</table>
	<section class="laporan mt-4">
		<table class="w-full">
			<tr>
				<th>No</th>
				<th>Hari/Tanggal</th>
				<th>Uraian</th>

				<th>Keterangan</th>
			</tr>

			<tr>
				<td>{row.date}</td>
				<td>{row.description}</td>
				<td>{row.ket}</td>
			</tr>
		</table>
	</section>
</div>
<!-- 
// @ts-ignore
<button on:click={PrintElements.print(document.getElementById('laporan'))}>cetak halaman ini</button -->
>

<style>
	td {
		padding-left: 5px;
	}
	.laporan table,
	.laporan th,
	.laporan tr {
		border: 1px solid black;
		border-collapse: collapse;
	}
</style>
