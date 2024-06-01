<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import { onMount } from 'svelte';
	import { whosLogin, getPhoto, getSessionToken } from '$lib/function/getData';
	import { fetchStudentsData } from '$lib/data/Students';
	import { fetchLectureData } from '$lib/data/Lecture';
	let nama = 'Potret';

	function getRole() {
		let nim = localStorage.getItem('userLogin');
		let role = whosLogin(nim);
		return role;
	}

	console.log(getRole());

	interface Mahasiswa {
		nim: string;
		angkatan: number;
		nama: string;
		jenisKelamin: string;
		tempatLahir: string;
		tanggalLahir: string;
		hp: string;
		email: string;
		dosenPA: string;
		khs: {
			sksTotal: number;
			statusMahasiswa: string;
			ipk: number;
			tahunAkademik: string;
		};
	}

	interface Dosen {
		nidn: string;
		nama: string;
		gelarBelakang: string;
		tempatLahir: string;
		tanggalLahir: string;
		hp: string;
		email: string;
	}
	let dosen: Dosen | null = null;
	let mahasiswa: Mahasiswa | null = null;

	onMount(async () => {
		try {
			const dataMahasiswa = await fetchStudentsData();
			const dataDosen = await fetchLectureData();
			mahasiswa = dataMahasiswa.data.mahasiswa;
			dosen = dataDosen.data.dosen;
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	}
</script>

<Content title={`Profile ${getRole()}`} aside_title={nama}>
	<svelte:fragment slot="body">
		<section class="w-full bg-white rounded-3xl p-2">
			<div class="w-full lg:w-1/3 font-bold bg-green-300 rounded-3xl p-3 pl-5 flex gap-1">
				<span class="line" />
				<span>IDENTITAS</span>
			</div>
			{#if getRole() === 'mahasiswa'}
				{#if mahasiswa}
					<div class="profile-card">
						<div class="profile-header">
							<h2>{mahasiswa.nama}</h2>
							<p>NIM: {mahasiswa.nim}</p>
						</div>
						<div class="profile-details">
							<table>
								<tr>
									<td>Angkatan</td>
									<td>:</td>
									<td>{mahasiswa.angkatan}</td>
								</tr>
								<tr>
									<td>Jenis Kelamin</td>
									<td>:</td>
									<td>{mahasiswa.jenisKelamin}</td>
								</tr>
								<tr>
									<td>Tempat Lahir</td>
									<td>:</td>
									<td>{mahasiswa.tempatLahir}</td>
								</tr>
								<tr>
									<td>Tanggal Lahir</td>
									<td>:</td>
									<td>{formatDate(mahasiswa.tanggalLahir)}</td>
								</tr>
								<tr>
									<td>Dosen PA</td>
									<td>:</td>
									<td>{mahasiswa.dosenPA}</td>
								</tr>
								<tr>
									<td>Email</td>
									<td>:</td>
									<td>{mahasiswa.email}</td>
								</tr>
								<tr>
									<td>No. HP</td>
									<td>:</td>
									<td>{mahasiswa.hp}</td>
								</tr>
							</table>
							<div class="profile-line" />
						</div>
					</div>
					<div class="w-full lg:w-1/3 font-bold bg-green-300 rounded-3xl p-3 pl-5 flex gap-1">
						<span class="line" />
						<span>INFORMASI AKADEMIK</span>
					</div>
					<div class="profile-card">
						<table>
							<tr>
								<td>SKS Total</td>
								<td>:</td>
								<td>{mahasiswa.khs.sksTotal}</td>
							</tr>
							<tr>
								<td>Status Mahasiswa</td>
								<td>:</td>
								<td>{mahasiswa.khs.statusMahasiswa}</td>
							</tr>
							<tr>
								<td>IPK</td>
								<td>:</td>
								<td>{mahasiswa.khs.ipk}</td>
							</tr>
							<tr>
								<td>Tahun Akademik</td>
								<td>:</td>
								<td>{mahasiswa.khs.tahunAkademik}</td>
							</tr>
						</table>
					</div>

					<!-- {:else}
	<p>Loading...</p> -->
				{/if}
			{:else if getRole() === 'dosen'}
				{#if dosen}
					<div class="profile-card">
						<div class="profile-header">
							<h2>{dosen.nama}</h2>
							<p>NIDN: {dosen.nidn}</p>
						</div>
						<div class="profile-details">
							<table>
								<tr>
									<td>Email</td>
									<td>:</td>
									<td>{dosen.email}</td>
								</tr>
								<tr>
									<td>No. HP</td>
									<td>:</td>
									<td>{dosen.hp}</td>
								</tr>
								<tr>
									<td>Tempat Lahir</td>
									<td>:</td>
									<td>{dosen.tempatLahir}</td>
								</tr>
								<tr>
									<td>Tanggal Lahir</td>
									<td>:</td>
									<td>{formatDate(dosen.tanggalLahir)}</td>
								</tr>
							</table>
							<div class="profile-line" />
						</div>
					</div>
				{/if}
			{:else}
				<p>Loading...</p>
			{/if}
		</section>
	</svelte:fragment>
	<svelte:fragment slot="aside_body">
		<img src={getPhoto()} alt="dosen" class="rounded-3xl w-full h-full" />
	</svelte:fragment>
</Content>

<style>
	.line {
		border-left: blue 2px solid;
	}
	.profile-card {
		background-color: #fff;
		border-radius: 8px;
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
		padding: 24px;
	}

	.profile-header {
		border-bottom: 1px solid #e5e5e5;
		padding-bottom: 16px;
	}

	.profile-line {
		border-bottom: 1px solid #e5e5e5;
		padding-top: 16px;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}

	.profile-details {
		padding-top: 16px;
	}

	h2 {
		margin: 0;
		font-size: 24px;
		font-weight: 600;
	}

	p {
		margin: 8px 0;
		font-size: 16px;
	}
</style>
