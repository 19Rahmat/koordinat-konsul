import axios from 'axios';

async function fetchData() {
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
            mahasiswa(nim: "${nim}") {
              nim
              angkatan
              nama
              jenisKelamin
              tempatLahir
              tanggalLahir
              hp
              email
              dosenPA
              khs {
                sksTotal
                statusMahasiswa
                ipk
                tahunAkademik
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

interface Mahasiswa {
	nim: string;
	angkatan: string;
	nama: string;
	jenisKelamin: string;
	tempatLahir: string;
	tanggalLahir: string;
	hp: string;
	email: string;
	dosenPA: string;
	khs: {
		sksTotal: number;
		statusMahasiswa: string;
		ipk: number;
		tahunAkademik: string;
	};
}

interface DataResponse {
	data: {
		mahasiswa: Mahasiswa;
	};
}

async function printData(): Promise<Mahasiswa | null> {
	try {
		const data = await fetchData();
		const mahasiswa: Mahasiswa = data.data.mahasiswa;

		// Create a student object
		const studentData: Mahasiswa = {
			nim: mahasiswa.nim,
			angkatan: mahasiswa.angkatan,
			nama: mahasiswa.nama,
			jenisKelamin: mahasiswa.jenisKelamin,
			tempatLahir: mahasiswa.tempatLahir,
			tanggalLahir: mahasiswa.tanggalLahir,
			hp: mahasiswa.hp,
			email: mahasiswa.email,
			dosenPA: mahasiswa.dosenPA,
			khs: {
				sksTotal: mahasiswa.khs.sksTotal,
				statusMahasiswa: mahasiswa.khs.statusMahasiswa,
				ipk: mahasiswa.khs.ipk,
				tahunAkademik: mahasiswa.khs.tahunAkademik
			}
		};
		console.log(studentData);
		return studentData;
	} catch (error) {
		console.error('Error printing data:', error);
	}
}

// printData();
let dataMahasiswa = printData();

export default printData;
