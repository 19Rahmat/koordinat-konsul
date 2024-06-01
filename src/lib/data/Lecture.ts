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

export { fetchLectureData };
