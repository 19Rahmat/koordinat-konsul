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
		link: '/admin/pesan'
	},
	{
		title: 'Arsip',
		icon: ArchivesIcon,
		link: '/admin/arsip'
	},
];
