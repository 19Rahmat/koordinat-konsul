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

export { fetchStudentsData };
