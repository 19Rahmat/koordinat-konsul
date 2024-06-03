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

export {
	login,
	getSessionToken,
	isLoggedIn,
	setSessionToken,
	clearSessionToken,
	whosLogin,
	getPhoto,
	getRole
};
