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
			const mahasiswa = data.daftarmahasiswa as unknown as typeData[];
			objectDatatable = functionCreateDatatable({
				parData: mahasiswa,
				parSearchableColumns: ['nama', 'nim', 'angkatan'],
				parRowsPerPage: '10',
				parSearchString: '',
				parSortBy: 'angkatan',
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
	<div class="flex flex-wrap gap-2 overflow-x-auto">
		<Engine bind:propDatatable={objectDatatable} />
		<div class="flex">
			<div
				class="px-4 inline-flex items-center min-w-fit rounded-s-md border-e-0 font-semibold bg-white"
			>
				<RowsPerPage bind:propDatatable={objectDatatable}>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="all">ALL</option>
				</RowsPerPage>
			</div>
			<div class="py-1 px-2 pe-8 block w-full shadow-sm rounded-e-lg text-sm bg-white">
				<Search
					bind:propDatatable={objectDatatable}
					propPlaceholder="Search"
					class="rounded-md p-1"
				/>
			</div>
		</div>

		<table class="w-full bg-slate-100 rounded-xl">
			<thead>
				<tr>
					<th>
						<Sort bind:propDatatable={objectDatatable} propColumn={'nim'}>NIM</Sort>
					</th>
					<th>
						<Sort bind:propDatatable={objectDatatable} propColumn={'nama'}>NAMA</Sort>
					</th>
					<th>
						<Sort bind:propDatatable={objectDatatable} propColumn={'angkatan'}>ANGKATAN</Sort>
					</th>
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

		<Pagination bind:propDatatable={objectDatatable} propSize="medium" />
	</div>
{/await}
