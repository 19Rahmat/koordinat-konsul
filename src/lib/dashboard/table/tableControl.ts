import Bimbingan from './icons/Bimbingan.svelte';
import Konsultasi from './icons/Konsultasi.svelte';
import Selesai from './icons/Selesai.svelte';

export const control = [
	{
		title: 'Keseluruhan',
		icon: Bimbingan,
		bg: 'bg-orange-100',
		progress: {
			percent: 20,
			color: 'bg-yellow-700'
		}
	},
	{
		title: 'Berkonsultasi',
		icon: Konsultasi,
		bg: 'bg-gray-300',
		progress: {
			percent: 2.34,
			color: 'bg-indigo-700'
		}
	},
	{
		title: 'Selesai',
		icon: Selesai,
		bg: 'bg-green-200',
		progress: {
			percent: 30,
			color: 'bg-green-700'
		}
	}
];
