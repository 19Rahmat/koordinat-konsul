import axios from 'axios';

async function login(username: any, password: any) {
	try {
		const response = await fetch('https://sicekcok.if.unismuh.ac.id/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
          mutation Login {
            signin(loginUserInput: { username: "${username}", password: "${password}" }) {
              access_token
            }
          }
        `
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error ${response.status}`);
		}

		const data = await response.json();
		const token = data.data.signin.access_token;
		return token;
	} catch (error) {
		console.error('Error logging in:', error);
		alert(error);
		throw error;
	}
}

function getSessionToken() {
	return localStorage.getItem('authToken');
}

function isLoggedIn() {
	const token = getSessionToken();
	return Boolean(token);
}

function setSessionToken(token: any) {
	localStorage.setItem('authToken', token);
}

function clearSessionToken() {
	localStorage.removeItem('authToken');
	localStorage.clear();
}

let role = '';
function whosLogin(stambuk: any) {
	if (stambuk.length === 12) {
		role = 'mahasiswa';
	} else {
		role = 'dosen';
	}
	return role;
}
let url = '';

function getPhoto() {
	let x = localStorage.getItem('userLogin');
	let y = whosLogin(x);
	if (y === 'mahasiswa') {
		url = `https://simakad.unismuh.ac.id/upload/mahasiswa/${x}_.jpg?1714763929`;
	} else {
		url = `https://simakad.unismuh.ac.id/upload/dosen/${x}_.jpg?1714763929`;
	}
	return url;
}

function getRole() {
	let stambuk = localStorage.getItem('userLogin');
	let role = whosLogin(stambuk);
	return role;
}

// sicekcok api
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

interface Mahasiswa {
	nim: string;
	nama: string;
	angkatan: number;
}

export async function fetchLectureData2() {
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
       			gelar_depan
        		gelar_belakang
        		tempat_lahir
        		email
        		prodiId
				  mahasiswa {
            nim
            kodeProdi
            angkatan
            nama
            jenisKelamin
            semesterAwal
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

export {
	login,
	getSessionToken,
	isLoggedIn,
	setSessionToken,
	clearSessionToken,
	whosLogin,
	getPhoto,
	getRole,
	fetchStudentsData
};
