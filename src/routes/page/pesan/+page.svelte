<script>
	import Content from '../../../lib/components/Content.svelte';
	import { appId, rahmat, hasbir, contactsList } from './talkJsConfig';
	import { onMount } from 'svelte';
	import Talk from 'talkjs';

	/**
	 * @type {any}
	 */
	let element;
	/**
	 * @type {HTMLElement | null}
	 */
	let inboxContainer;
	/**
	 * @type {any}
	 */
	let selectedContact;
</script>

<svelte:head>
	<title>Pesan</title>
</svelte:head>

<Content title="Pesan" aside_title="Inbox">
	<svelte:fragment slot="head">
		<select
			bind:value={selectedContact}
			class="text-sm rounded-lg block w-full lg:w-1/3 p-2.5 bg-gray-700 border-gray-600 dark:placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
		>
			<option value="">Pilih Mahasiswa</option>
			{#each contactsList as contactId}
				onMount(async () => {Talk.ready.then(() => {
					const me = new Talk.User(hasbir);
					const other = new Talk.User(selectedContact.id);

					const session = new Talk.Session({ appId, me });
					const inbox = session.createInbox();

					const conversationId = Talk.oneOnOneId(me, other);
					const conversation = session.getOrCreateConversation(conversationId);
					conversation.setParticipant(me);
					conversation.setParticipant(selectedContact);

					const chatbox = session.createChatbox();
					chatbox.select(conversation);
					chatbox.mount(element);
					// inbox.mount(element);
					inbox.mount(inboxContainer);
				})});
				<option value={contactId}>{contactId.name}</option>
			{/each}
		</select>
	</svelte:fragment>
	<svelte:fragment slot="body">
		<section class="w-full min-h-screen h-full">
			<div bind:this={element} class="flex items-center">
				<img
					src="https://ik.imagekit.io/nurman/koordinat-konsul/loading.svg?updatedAt=1717038962097"
					height="100px"
					width="100px"
					alt="loading chat"
				/>
				<p class=" text-white">Loading chat...</p>
			</div>
		</section>
	</svelte:fragment>
	<svelte:fragment slot="aside_body">
		<div bind:this={inboxContainer}>
			<img
				src="https://ik.imagekit.io/nurman/koordinat-konsul/loading.svg?updatedAt=1717038962097"
				height="100px"
				width="100px"
				alt="loading chat"
			/>
			<p class=" text-white">Loading inbox...</p>
		</div>
	</svelte:fragment>
</Content>
