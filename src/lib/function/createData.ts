function generateID() {
	const ID = Math.floor(Math.random() * Date.now()).toString(16);
	return ID;
}

export { generateID };
