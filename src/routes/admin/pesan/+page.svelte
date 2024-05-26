<script>
	import Content from '../../../components/Content.svelte';
	import { appId, rahmat, hasbir } from './talkJsConfig';
	import { onMount } from 'svelte';
	import Talk from 'talkjs';

	/**
	 * @type {any}
	 */
	let element;

	onMount(async () => {
		Talk.ready.then(() => {
			const me = new Talk.User(hasbir);
			const other = new Talk.User(rahmat);

			// const me = new Talk.User(rahmat);
			// const other = new Talk.User(hasbir);

			const session = new Talk.Session({ appId, me });
			const inbox = session.createInbox();

			const conversationId = Talk.oneOnOneId(me, other);
			const conversation = session.getOrCreateConversation(conversationId);
			conversation.setParticipant(me);
			conversation.setParticipant(other);

			const chatbox = session.createChatbox();
			chatbox.select(conversation);
			chatbox.mount(element);
			inbox.mount(element);
		});
	});
</script>

<svelte:head>
	<title>Pesan</title>
</svelte:head>

<Content title="Pesan">
	<svelte:fragment slot="body">
		<div bind:this={element} class="talkjs-container" />
	</svelte:fragment>
</Content>

<style>
	.talkjs-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
