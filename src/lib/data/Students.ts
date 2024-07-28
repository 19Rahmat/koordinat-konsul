import axios from 'axios';

async function fetchStudentsData() {
	try {
		const token = localStorage.getItem('authToken');
		const nim = localStorage.getItem('userLogin');

		if (!nim || !token) {
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
					query Mahasiswa {
				mahasiswa(nim: "105841109519") {
					nim
					kodeProdi
					angkatan
					nama
					jenisKelamin
					tempatLahir
					email
					dosenPA
					semesterAwal
					lulus
					masaStudi
					dosenPenasehat {
						nidn
						nama
						gelar_depan
						gelar_belakang
					}
					khs {
						id
						nim
						ips
						ipk
						sksTotal
						statusMahasiswa
					}
				}
			}
        `
			}
		});

		return result.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

export { fetchStudentsData };
