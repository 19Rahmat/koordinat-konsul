<script>
	import { onMount } from 'svelte';
	import Talk from 'talkjs';
	import selectedContact from './ContactList.svelte'; // Import selectedContact from ContactList

	let talkSession;

	onMount(async () => {
		// Create user "me"
		const me = new Talk.User({
			id: '0',
			name: 'Josh',
			photoUrl: 'images/josh.webp'
		});

		// Start TalkJS Session
		talkSession = new Talk.Session({
			appId: 'tQWG4Gnl',
			me: me
		});

		// Create and mount the chatbox
		const chatbox = talkSession.createChatbox();
		chatbox.mount(document.getElementById('talkjs-container'));

		// Handle contact selection
		if (selectedContact) {
			const talkUser = new Talk.User(selectedContact);
			const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, talkUser));
			chatbox.select(conversation);
		}
	});
</script>
