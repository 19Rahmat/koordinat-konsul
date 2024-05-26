<script>
	import { initializeApp } from 'firebase/app';

	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import { firebaseConfig } from './fireBaseConfig';

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	let mail = '';
	let password = '';
	async function handleLogin() {
		try {
			await signInWithEmailAndPassword(auth, mail, password);
			mail = '';
			password = '';
			alert('login berhasil');
			updateSession(true);
			
		} catch (error) {
			alert(error);
		}
	}

	/**
	 * @param {any} value
	 */
	 export function updateSession (value){
		let hasSession = value;
		console.log(hasSession);
	}

	// const requiredMessage = 'Kolom ini harus di isi';
</script>

<form class="mt-6" action="#" method="POST" on:submit|preventDefault={handleLogin}>
	<div>
		<label class="block text-gray-700" for="email">Email Address</label>
		<input
			type="email"
			name="email"
			id=""
			placeholder="Enter Email Address"
			class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
			required
			bind:value={mail}
		/>
	</div>

	<div class="mt-4">
		<label class="block text-gray-700" for="password">Password</label>
		<input
			type="password"
			name="password"
			id=""
			placeholder="Enter Password"
			minlength="6"
			class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
			required
			bind:value={password}
		/>
	</div>

	<div class="text-right mt-2">
		<a
			href="/forget"
			class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
			>Forgot Password?</a
		>
	</div>

	<button
		type="submit"
		class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">Log In</button
	>
</form>
