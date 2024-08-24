import { db } from '$lib/data/firebase';
import { doc, setDoc, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore';

async function createDocumentWithSubcollection(mainDocId: string, subcollectionName: string) {
	try {
		// Define the main document reference
		const mainDocRef = doc(db, 'koordinatKonsul', mainDocId);

		// Define the subcollection reference
		const subcollectionRef = collection(mainDocRef, subcollectionName);

		// Define the data for the subcollection documents
		const item = { date: '', desc: '', approve: false };
		const docRef = doc(subcollectionRef); // Firestore generates a unique ID
		await setDoc(docRef, item);

		console.log('Document and subcollection created successfully.');
	} catch (error) {
		console.error('Error creating document and subcollection: ', error);
	}
}

interface SubcollectionItem {
	date: string;
	desc: string;
	approve: boolean;
	id?: string; // Optional, since Firestore adds this
}
// let subcollectionItems: any[];
async function fetchSubcollectionItems(mainDocId: string, subcollectionName: string) {
	try {
		// Define the main document reference
		const mainDocRef = doc(db, 'koordinatKonsul', mainDocId);

		// Define the subcollection reference
		const subcollectionRef = collection(mainDocRef, subcollectionName);

		// Get all documents from the subcollection
		const querySnapshot = await getDocs(subcollectionRef);
		const subcollectionItems = querySnapshot.docs.map(
			(doc) => ({ id: doc.id, ...doc.data() } as SubcollectionItem)
		);
		return subcollectionItems;

		console.log('Subcollection items fetched:', subcollectionItems);
	} catch (error) {
		console.error('Error fetching subcollection items: ', error);
	}
}

async function fetchSignatureUrl(docId: string) {
	try {
		const docRef = doc(db, 'koordinatKonsul', docId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const data = docSnap.data();
			return data.handSignature;
		} else {
			console.log('No such document! Creating a new one.');
			await setDoc(docRef, { handSignature: '' });
			alert('ttd not found');
		}
	} catch (error) {
		console.error('Error fetching photo URL:', error);
	}
}

async function updatePhotoUrl(photoUrl: string, docId: string, newUrl: string) {
	try {
		const docRef = doc(db, 'koordinatKonsul', docId);
		await updateDoc(docRef, { handSignature: newUrl });

		// Update the local state with the new URL
		photoUrl = newUrl;
	} catch (error) {
		console.error('Error updating photo URL:', error);
	}
}

export {
	createDocumentWithSubcollection,
	fetchSubcollectionItems,
	fetchSignatureUrl,
	updatePhotoUrl
};
