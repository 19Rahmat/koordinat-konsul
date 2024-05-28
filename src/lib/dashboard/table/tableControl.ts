import Bimbingan from "./icons/Bimbingan.svelte";
import Konsultasi from "./icons/Konsultasi.svelte";
import Riwayat from "./icons/Riwayat.svelte";



export const control = [
    {
        title: 'Bimbingan',
        icon: Bimbingan,
        bg: 'bg-orange-100',
        progress:{
            percent: 20,
            color: 'bg-yellow-700'
        },
        link: '../lib/dashboard/table/main'
    },
    {
        title: 'Konsultasi',
        icon: Konsultasi,
        bg: 'bg-gray-300',
        progress:{
            percent: 50,
            color: 'bg-indigo-700'

        },
        link: '../dashboard/table/TableConsul.svelte'
    },
    {
        title: 'Riwayat',
        icon: Riwayat,
        bg: 'bg-green-200',
        progress: {
            percent: 30,
            color: 'bg-green-700'
        },
        link: '../dashboard/table/TableHistory.svelte'
    }
]