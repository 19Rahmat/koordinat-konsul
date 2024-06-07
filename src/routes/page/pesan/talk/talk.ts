(function (
	t: Window,
	a: Document,
	l: any[],
	k: PromiseConstructor | undefined,
	j: any,
	s: HTMLScriptElement
) {
	s = a.createElement('script');
	s.async = true;
	s.src = 'https://cdn.talkjs.com/talk.js';
	a.head.appendChild(s);
	k = t.Promise;
	t.Talk = {
		v: 3,
		ready: {
			then: function (f: Function) {
				if (k)
					return new k(function (r, e) {
						l.push([f, r, e]);
					});
				l.push([f]);
			},
			catch: function () {
				return k && new k(() => {});
			},
			c: l
		}
	};
})(window, document, [], undefined, undefined, undefined);

interface Contact {
	id: number;
	name: string;
	photoUrl: string;
}

const contactsList: Contact[] = [
	{ id: 1, name: 'Lisa', photoUrl: 'https://talkjs.com/images/avatar-1.jpg' },
	{ id: 2, name: 'Alice', photoUrl: 'https://talkjs.com/images/avatar-2.jpg' },
	{ id: 3, name: 'Tina', photoUrl: 'https://talkjs.com/images/avatar-3.jpg' },
	{ id: 4, name: 'Lee', photoUrl: 'https://talkjs.com/images/avatar-4.jpg' },
	{ id: 5, name: 'Pete', photoUrl: 'https://talkjs.com/images/avatar-5.jpg' },
	{ id: 6, name: 'Dana', photoUrl: 'https://talkjs.com/images/avatar-6.jpg' },
	{ id: 7, name: 'Ro', photoUrl: 'https://talkjs.com/images/avatar-7.jpg' }
];

// Display contacts list on page
// Get contacts list container from the DOM
const contactsWrapper = document.getElementById('contacts-list') as HTMLElement;

// Loop through array and display each contact in contact-list div
for (let contact of contactsList) {
	// Extract contact details
	const { id, name: username, photoUrl } = contact;

	// Create img tag to hold contact pic, give it a class name (for styling purposes) and add photo to it
	const contactPhoto = document.createElement('img');
	contactPhoto.classList.add('contact-photo');
	contactPhoto.src = photoUrl;

	// Create div to hold contact Name and add name
	const usernameDiv = document.createElement('div');
	usernameDiv.classList.add('contact-name');
	usernameDiv.innerText = username;

	// Create contact parent div and add to it contactPhotoDiv and usernameDiv
	const contactContainerDiv = document.createElement('div');
	contactContainerDiv.classList.add('contact-container');

	contactContainerDiv.appendChild(contactPhoto);
	contactContainerDiv.appendChild(usernameDiv);

	contactsWrapper.appendChild(contactContainerDiv);
}

Talk.ready.then(function () {
	// Create user "me"
	let me = new Talk.User({
		id: '0',
		name: 'Josh',
		photoUrl: 'images/josh.webp'
	});

	// Start TalkJS Session
	window.talkSession = new Talk.Session({
		appId: 'tgziXhR8',
		me: me
	});

	// Create and mount the chatbox
	const chatbox = talkSession.createChatbox();
	chatbox.select(null);
	chatbox.mount(document.getElementById('talkjs-container') as HTMLElement);

	// Create conversationBuilder objects for each user
	const conversations = contactsList.map(function (user) {
		const talkUser = new Talk.User(user);

		const conversation = talkSession.getOrCreateConversation(Talk.oneOnOneId(me, talkUser));

		conversation.setParticipant(me);
		conversation.setParticipant(talkUser);

		return conversation;
	});

	// Listen for clicks on each contact and select the appropriate conversation
	const contactsListDivs = document.getElementsByClassName('contact-container');

	conversations.forEach(function (conversation, index) {
		contactsListDivs[index].addEventListener('click', () => {
			chatbox.select(conversation);
		});
	});
});
