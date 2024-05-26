<script>
	import Content from '../../../lib/components/Content.svelte';
	import consultationTable from './template_konsul/consultation';

	let selectedStudent = '';
	let no = 1;

	function addRow() {
		if (selectedStudent) {
			consultationTable[selectedStudent] = [
				...consultationTable[selectedStudent],
				{
					date: '',
					description: '',
					ket: ''
				}
			];
		}
	}


	function generateReport() {
		reportTableVisible = true;
	}
	/**
	 * @param {number} index
	 * @param {number} studentId
	 */
	function removeRow(studentId, index) {
		if (consultationTable[studentId]) {
			consultationTable[studentId] = consultationTable[studentId].filter((row, i) => i !== index);
			console.log(studentId);
		}
	}

	/**
	 * @type {any[]}
	 */
	let reportTable = [];
	let reportTableVisible = false;
</script>

<svelte:head>
	<title>Arsip</title>
</svelte:head>

<Content title="Arsip">
	<svelte:fragment slot="body">
		<select bind:value={selectedStudent}>
			<option value="">Pilih Mahasiswa</option>
			{#each Object.keys(consultationTable) as studentId}
				<option value={studentId}>{studentId}</option>
			{/each}
		</select>
		<section class="flex gap-3 justify-center items-center">
			<div class="container w-3/6">
				<table id="form_konsul">
					<thead>
						<tr>
							<th>No</th>
							<th>Tanggal</th>
							<th>Uraian Konsultasi</th>
							<th>Keterangan</th>
						</tr>
					</thead>
					<tbody>
						{#if consultationTable[selectedStudent]}
							{#each consultationTable[selectedStudent] as row, index}
								<tr>
									<td class="text-white">{index + 1}</td>
									<td><input type="date" bind:value={row.date} /></td>
									<td><input type="text" bind:value={row.description} /></td>
									<td><input type="text" bind:value={row.ket} /></td>
									<td>
										<button on:click={() => removeRow(selectedStudent, index)}
											><svg
												fill="#ec2727"
												height="22px"
												width="22px"
												version="1.1"
												id="Capa_1"
												xmlns="http://www.w3.org/2000/svg"
												xmlns:xlink="http://www.w3.org/1999/xlink"
												viewBox="0 0 459.739 459.739"
												xml:space="preserve"
												stroke="#ec2727"
												><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
													id="SVGRepo_tracerCarrier"
													stroke-linecap="round"
													stroke-linejoin="round"
												/><g id="SVGRepo_iconCarrier">
													<path
														d="M229.869,0C102.917,0,0,102.917,0,229.869c0,126.952,102.917,229.869,229.869,229.869s229.869-102.917,229.869-229.869 C459.738,102.917,356.821,0,229.869,0z M313.676,260.518H146.063c-16.926,0-30.649-13.723-30.649-30.649 c0-16.927,13.723-30.65,30.649-30.65h167.613c16.925,0,30.649,13.723,30.649,30.65C344.325,246.795,330.601,260.518,313.676,260.518 z"
													/>
												</g></svg
											></button
										></td
									>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
				<div class="flex justify-between">
					<button on:click={addRow}>Tambah Inputan Konsultasi</button>
					<button on:click={generateReport}>Tampilkan Tabel Laporan</button>
				</div>
			</div>

			{#if reportTableVisible}
				<div class="container w-3/6">
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
										<td>{selectedStudent}</td>
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
									{#each Object.entries(consultationTable) as [studentId, rows]}
										{#each rows as row, index}
											<tr>
												<td>{index + 1}</td>
												<!-- <td>{studentId}</td> -->
												<td>{row.date}</td>
												<td>{row.description}</td>
												<td>{row.ket}</td>
											</tr>
										{/each}
									{/each}
								</tbody>
							</table>
						</sectxion>
					</div>
				</div>
			{:else}
				<div
					class="border-2 border-gray-600 flex items-center justify-center rounded-3xl w-3/6 h-64"
				>
					<p class="text-white text-lg font-semibold">Preview Laporan Konsultasi</p>
				</div>
			{/if}
		</section>
	</svelte:fragment>
</Content>

<style>
	#form_konsul td {
		padding: 10px;
		border-bottom: 1px solid #ddd;
		border-top: 1px solid #ddd;
	}

	#form_konsul th {
		color: white;
		text-align: center;
	}

	#form_konsul input {
		width: 100%;
		padding: 5px;
	}

	button {
		display: block;
		margin: 0 auto;
		padding: 10px 20px;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	td {
		padding-left: 5px;
	}
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
