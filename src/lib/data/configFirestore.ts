import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	getDocs
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDvxDedD0coqiU9Xi6GDtQYBH_eWA_MPsQ',
	authDomain: 'koordinat-konsul.firebaseapp.com',
	databaseURL: 'https://koordinat-konsul-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'koordinat-konsul',
	storageBucket: 'koordinat-konsul.appspot.com',
	messagingSenderId: '369670747302',
	appId: '1:369670747302:web:ce4e967dd9e767706a7067',
	measurementId: 'G-H1MQ6S6206'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CRUD Functions

// Create a new consultation record
async function createConsultation(
	nidnPA: string,
	consultantId: string,
	data: { date: string; description: string; ket: string }
) {
	try {
		const konsulDocRef = doc(db, 'koordinatKonsul', nidnPA);
		const konsultanDocRef = doc(konsulDocRef, 'konsultan', consultantId);
		const konsultasiDocRef = doc(konsultanDocRef, 'konsultasi');

		await setDoc(konsultasiDocRef, data);
		alert('Consultation created successfully!');
	} catch (error) {
		console.error('Error creating consultation:', error);
	}
}

// Read a consultation record
async function getConsultation(nidnPA: string, consultantId: string, consultationId: string) {
	try {
		const konsulDocRef = doc(db, 'konsul', nidnPA);
		const konsultanDocRef = doc(konsulDocRef, 'konsultan', consultantId);
		const konsultasiDocRef = doc(konsultanDocRef, 'konsultasi', consultationId);

		const docSnap = await getDoc(konsultasiDocRef);

		if (docSnap.exists()) {
			console.log('Consultation data:', docSnap.data());
			return docSnap.data();
		} else {
			console.log('No such consultation document!');
			return null;
		}
	} catch (error) {
		console.error('Error getting consultation:', error);
		return null;
	}
}

// Update a consultation record
async function updateConsultation(
	nidnPA: string,
	consultantId: string,
	consultationId: string,
	data: { date?: string; description?: string; ket?: string }
) {
	try {
		const konsulDocRef = doc(db, 'konsul', nidnPA);
		const konsultanDocRef = doc(konsulDocRef, 'konsultan', consultantId);
		const konsultasiDocRef = doc(konsultanDocRef, 'konsultasi', consultationId);

		await updateDoc(konsultasiDocRef, data);
		console.log('Consultation updated successfully!');
	} catch (error) {
		console.error('Error updating consultation:', error);
	}
}

// Delete a consultation record
async function deleteConsultation(nidnPA: string, consultantId: string, consultationId: string) {
	try {
		const konsulDocRef = doc(db, 'konsul', nidnPA);
		const konsultanDocRef = doc(konsulDocRef, 'konsultan', consultantId);
		const konsultasiDocRef = doc(konsultanDocRef, 'konsultasi', consultationId);

		await deleteDoc(konsultasiDocRef);
		console.log('Consultation deleted successfully!');
	} catch (error) {
		console.error('Error deleting consultation:', error);
	}
}

// Get all consultations for a specific PA
async function getConsultationsByPA(nidnPA: string) {
	try {
		const konsulDocRef = doc(db, 'konsul', nidnPA);
		const konsultanCollectionRef = collection(konsulDocRef, 'konsultan');
		const q = query(konsultanCollectionRef);

		const querySnapshot = await getDocs(q);
		const consultations: any[] = [];

		querySnapshot.forEach((doc) => {
			consultations.push({
				id: doc.id,
				...doc.data()
			});
		});

		return consultations;
	} catch (error) {
		console.error('Error getting consultations:', error);
		return null;
	}
}

// Get all consultations for a specific consultant
// async function getConsultationsByConsultant(nidnPA: string, consultantId: string) {
//   try {
//     const konsulDocRef = doc(db, 'konsul', nidnPA);
//     const konsultanDocRef = doc(konsulDocRef, 'konsultan', consultantId);
//     const konsultasiCollectionRef = collection(konsultanDocRef, 'konsultasi');
//     const

export {
	createConsultation,
	getConsultation,
	getConsultationsByPA,
	updateConsultation,
	deleteConsultation
};
