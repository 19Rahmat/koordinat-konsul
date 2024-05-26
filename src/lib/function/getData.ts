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
    throw error;
  }
}

function getSessionToken() {
  return localStorage.getItem('authToken');
}

function isLoggedIn() {
  const token = getSessionToken();
  return Boolean(token);
  console.log(getSessionToken);
}

function setSessionToken(token:any) {
  localStorage.setItem('authToken', token);
}

function clearSessionToken() {
  localStorage.removeItem('authToken');
  localStorage.clear();
}

export {login, getSessionToken, isLoggedIn, setSessionToken, clearSessionToken}