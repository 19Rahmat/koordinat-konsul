<script lang="ts">
    import type { typeDatatable } from 'svelte-datatables-net';
    import { Engine, functionCreateDatatable, Pagination, RowsPerPage, Search, Sort } from 'svelte-datatables-net';
    import TopBar from '../TopBar.svelte';

    type typeData = {
        brand: string;
        category: string;
        description: string;
        discountPercentage: number;
        id: number;
        images: string[];
        price: number;
        rationg: number;
        stock: number;
        thumbnail: string;
        title: string;
    };

    let objectDatatable: typeDatatable<typeData>;

    const functionReadData = async function () {
        const responseData = await fetch('https://dummyjson.com/products');
        const jsonData = await responseData.json();
        const arrayData = jsonData.products as typeData[];
        objectDatatable = functionCreateDatatable({
            parData: arrayData,
            parSearchableColumns: ['id', 'brand', 'category', 'description'],
            parRowsPerPage: '10',
            parSearchString: '',
            parSortBy: 'id',
            parSortOrder: 'ascending'
        });
    };
</script>

{#await functionReadData()}
    READING DATA...
{:then}
    <Engine bind:propDatatable={objectDatatable} />

            <p class="bg-gray-800 block leading-normal pl-10 py-1.5 pr-4 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span>Search:</span>
                <Search bind:propDatatable={objectDatatable} propPlaceholder="Type here..." />
            </p>

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

    <table class="w-full bg-white">
        <thead>
            <tr>
                <th>
                    <Sort bind:propDatatable={objectDatatable} propColumn={'id'}>ID (click here)</Sort
                    >
                </th>
                <th>
                    <Sort bind:propDatatable={objectDatatable} propColumn={'brand'}
                        >BRAND (click here)</Sort
                    >
                </th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>STOCK</th>
            </tr>
        </thead>
        <tbody>
            {#each objectDatatable.arrayData as row}
                <tr>
                    <td>{row.id}</td>
                    <td>{row.brand}</td>
                    <td>{row.category}</td>
                    <td>{row.description}</td>
                    <td>{row.stock}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/await}