import { data } from '$lib/dashboard/sidebar/data';
import axios from 'axios';

async function fetchLectureData() {
	try {
		const token = localStorage.getItem('authToken');
		const nidn = localStorage.getItem('userLogin');

		if (!nidn || !token) {
			throw new Error('NIM or token not found in localStorage');
		}

		const result = await axios({
			url: 'https://sicekcok.if.unismuh.ac.id/graphql',
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				query: `
          query Dosen {
            dosen(nidn: "${nidn}") {
				nidn
				nama
				gelar_belakang
				tempat_lahir
				tanggal_lahir
				hp
				email
				mahasiswa {
					nim
					nama
					angkatan
				}
            }
          }
        `
			}
		});

		// const dosenData = result.data.data.dosen;
		// const mahasiswaData = dosenData.mahasiswa;

		// const daftarmahasiswa: Mahasiswa[] = mahasiswaData.map((mahasiswa: any) => {
		// 	return {
		// 		nim: mahasiswa.nim,
		// 		nama: mahasiswa.nama,
		// 		angkatan: mahasiswa.angkatan
		// 	};
		// });

		// return {
		// 	dosen: dosenData,
		// 	daftarmahasiswa: daftarmahasiswa
		// };
		return result.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

interface Mahasiswa {
	nim: string;
	nama: string;
	angkatan: number;
}

async function fetchLectureData2() {
	try {
		const token = localStorage.getItem('authToken');
		const nidn = localStorage.getItem('userLogin');

		if (!nidn || !token) {
			throw new Error('NIM or token not found in localStorage');
		}

		const result = await axios({
			url: 'https://sicekcok.if.unismuh.ac.id/graphql',
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: {
				query: `
          query Dosen {
            dosen(nidn: "${nidn}") {
				nidn
				nama
				gelar_belakang
				tempat_lahir
				tanggal_lahir
				hp
				email
				mahasiswa {
					nim
					nama
					angkatan
				}
            }
          }
        `
			}
		});

		const dosenData = result.data.data.dosen;
		const mahasiswaData = dosenData.mahasiswa;

		const daftarmahasiswa: Mahasiswa[] = mahasiswaData.map((mahasiswa: any) => {
			return {
				nim: mahasiswa.nim,
				nama: mahasiswa.nama,
				angkatan: mahasiswa.angkatan
			};
		});

		return {
			dosen: dosenData,
			daftarmahasiswa: daftarmahasiswa
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}
export { fetchLectureData, fetchLectureData2 };
