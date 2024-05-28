export interface consultation {
	date: string;
	description: string;
	ket: string;
}
interface Consultation {
	[key: string]: consultation[];
}

const consultationTable: Consultation = {
	'muhammad-hasby': [
		{
			date: '',
			description: '',
			ket: ''
		}
	]
};

export default consultationTable;
