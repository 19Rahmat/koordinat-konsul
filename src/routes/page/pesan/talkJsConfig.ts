// import Talk from 'talkjs';
// import { onMount } from 'svelte';
// import { fetchLectureData2 } from "$lib/data/Lecture";



let appId = 'tgziXhR8';


// let stambuk: any;
// function getID(){
// 	stambuk = localStorage.getItem('userLogin');
// 	return stambuk;

// }

// let idDosen = getID();
interface dosenMe{
	id: string,
	name: string,
	photo: string,
	role: string
}
export let dosenMe = {
	id: '0903058406',
	name: 'nama dosen',
	photo: `https://simakad.unismuh.ac.id/upload/dosen/0903058406_.jpg?1714763929`,
	role: 'default'

  }
// let dosen: any[] = [];
// let contactList: any[] = [];
// let talkSession: Talk.Session | null = null;
// let chatbox: Talk.Chatbox | null = null;
// async function loadContacts() {
// 	try {
// 		const data = await fetchLectureData2();
// 		dosen = data.dosen;
// 		console.log(dosen);
// 		contactList = data.daftarmahasiswa.map((mahasiswa) => ({
// 			id: mahasiswa.nim, // Use nim as unique identifier
// 			name: mahasiswa.nama,
// 			photo: `https://simakad.unismuh.ac.id/upload/mahasiswa/${mahasiswa.nim}_.jpg?1714763929`
// 			// angk: mahasiswa.angkatan
// 		}));
// 		console.log(contactList);
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 	}
// }

// onMount(async ()=>{
// 	await loadContacts();

// 	talkSession = new Talk.Session({
// 		appId: appId,
// 		me: me,
// 	});


// 	  // Create and mount the chatbox
// 	  chatbox = talkSession.createChatbox();
// 	  chatbox.select(null);
// 	  chatbox.mount(document.getElementById('talkjs-container'));
	
// 	  // Create conversationBuilder objects for each user
// 	  const conversations = contactList.map((user) => {
// 		const talkUser = new Talk.User(user);
// 		const conversation = talkSession?.getOrCreateConversation(Talk.oneOnOneId(me, talkUser));
	
// 		conversation?.setParticipant(me);
// 		conversation?.setParticipant(talkUser);
	
// 		return conversation;

// 		});
// });








export { appId };
