<script lang="ts">
	import type { typeDatatable } from 'svelte-datatables-net';
	import { fetchLectureData2 } from '$lib/data/Lecture';
	import {
		Engine,
		functionCreateDatatable,
		Pagination,
		RowsPerPage,
		Search,
		Sort
	} from 'svelte-datatables-net';

	type typeData = {
		nim: string;
		nama: string;
		angkatan: string;
	};

	let objectDatatable: typeDatatable<typeData>;

	async function loadMahasiswa() {
		try {
			const data = await fetchLectureData2();
			const mahasiswa = data.daftarmahasiswa as typeData[];
			objectDatatable = functionCreateDatatable({
				parData: mahasiswa,
				parSearchableColumns: ['nama', 'nim', 'angkatan'],
				parRowsPerPage: '10',
				parSearchString: '',
				parSortBy: 'id',
				parSortOrder: 'ascending'
			});
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
</script>

{#await loadMahasiswa()}
	<span class="text-white">MEMUAT DATA...</span>
{:then}
	<Engine bind:propDatatable={objectDatatable} />

	<span>Search:</span>
	<Search
		bind:propDatatable={objectDatatable}
		propPlaceholder="Type here..."
		class="rounded-md p-1"
	/>

	<p>
		<RowsPerPage bind:propDatatable={objectDatatable}>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="30">30</option>
			<option value="all">ALL</option>
		</RowsPerPage>
		<span>RESULTS PER PAGE</span>
	</p>
	<p>
		<Pagination bind:propDatatable={objectDatatable} propSize="small" />
	</p>

	<table class="w-full bg-white rounded-3xl">
		<thead>
			<tr>
				<th>
					<Sort bind:propDatatable={objectDatatable} propColumn={'nim'}>NIM</Sort>
				</th>
				<th>
					<Sort bind:propDatatable={objectDatatable} propColumn={'nama'}>NAMA</Sort>
				</th>
				<th>ANGKATAN</th>
			</tr>
		</thead>
		<tbody>
			{#each objectDatatable.arrayData as row}
				<tr>
					<td class=" text-center">{row.nim}</td>
					<td>{row.nama}</td>
					<td class=" text-center">{row.angkatan}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/await}
