<script>
	import Content from '$lib/components/Content.svelte';
	import {control} from '$lib/dashboard/table/tableControl';
	import {page} from '$app/stores';
	import Table from '$lib/dashboard/table/Table.svelte';
	import Pie from '$lib/Pie.svelte';



</script>

<svelte:head>
	<title>Koordinat-konsul</title>
</svelte:head>
<Content title="Beranda" aside_title="Belum Konsultasi">
	<svelte:fragment slot="head">
		{#each control as tabel}
		
			
			<ul class={`p-3 w-full rounded-3xl ${tabel.bg}`}>
				<li class="text-center">
					<p class="text-sm font-bold opacity-70">{tabel.title}</p>
					<a href={tabel.link}>
						<span  class="flex items-center justify-center h-20"><svelte:component this={tabel.icon}/></span></a>
				</li>
				<p class="text-xs font-bold m-0">Progress</p>
				<div class="w-full h-1 flex rounded-md overflow-hidden bg-white my-2 mx-0">
					<span class={`h-1 ${tabel.progress.color} `} style={`width: ${tabel.progress.percent}%;`}/>
				
				</div>
				<p class="text-right m-0 text-sm font-bold">{tabel.progress.percent}%</p>
			</ul>
			
		{/each}
	
				
		
			
		
		<div class="flex items-center mt-4 md:mt-0">
			<!-- tombol setujui konsultasi -->
		</div>
	</svelte:fragment>
	<svelte:fragment slot="body">
	<Table/>
		
		
		
	</svelte:fragment>
	<svelte:fragment slot="aside_body">
		<Pie/>

	</svelte:fragment>
</Content>
