import HomeIcon from './icons/HomeIcon.svelte';
import StatusIcon from './icons/StatusIcon.svelte';
import ArchivesIcon from './icons/ArchivesIcon.svelte';

export const data = [
	{
		title: 'Beranda',
		icon: HomeIcon,
		link: '/'
	},
	{
		title: 'Pesan',
		icon: StatusIcon,
		link: '/page/pesan'
	},
	{
		title: 'Arsip',
		icon: ArchivesIcon,
		link: '/page/arsip'
	}
];
