<script lang="ts">
	import { data, dataMhs } from './data';
	import { page } from '$app/stores';
	import { sidebarOpen } from '../store';
	import { whosLogin } from '$lib/data/getData';

	let btnData: any;
	const idLogin = localStorage.getItem('userLogin');

	if (whosLogin(idLogin) === 'mahasiswa') {
		btnData = dataMhs;
	} else {
		btnData = data;
	}

	const style = {
		title: `mx-4 text-sm whitespace-pre`,
		active: `bg-gray-700 rounded-full`,
		link: `flex items-center justify-start my-1 p-3 w-full hover:text-white whitespace-pre`,
		close: `lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all`,
		open: `lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto`
	};
</script>

<ul class="md:pl-3">
	<li>
		{#each btnData as item (item.title)}
			<a class={style.link} href={item.link}>
				<div class={`p-2 ${item.link === $page.url.pathname ? style.active : ''}`}>
					<span><svelte:component this={item.icon} /></span>
				</div>
				<span class={`${style.title} ${$sidebarOpen ? style.open : style.close}`}>
					{item.title}
				</span>
			</a>
		{/each}
	</li>
</ul>
