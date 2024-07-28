import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC5F76irz8YmuO2pd6nWX5aK2NPLZjHsVo',
	authDomain: 'koodinat-konsul.firebaseapp.com',
	projectId: 'koodinat-konsul',
	storageBucket: 'koodinat-konsul.appspot.com',
	messagingSenderId: '58996466408',
	appId: '1:58996466408:web:14e87c4e7ffb565dcbdf5d',
	measurementId: 'G-Y20734SQMD'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
