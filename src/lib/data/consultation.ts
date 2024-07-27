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
	],
	audia_melankoli: [
		{
			date: '',
			description: '',
			ket: ''
		},
		{
			date: '',
			description: '',
			ket: ''
		}
	]
};

interface lectureData {}

const lectureData = {};
export default consultationTable;

const koordinatKonsul = {
	'90433': {
		'105841109119': {
			nama: 'nurman awaluddin',
			PA: 'titin wahyuni',
			nidnPA: '90433',
			konsultasi: [
				{
					date: '',
					description: '',
					ket: ''
				},
				{
					date: '',
					description: '',
					ket: ''
				}
			]
		},
		'105841109519': {
			nama: 'rahmat gunawan',
			PA: 'titin wahyuni',
			nidnPA: '90433',
			konsultasi: [
				{
					date: '',
					description: '',
					ket: ''
				},
				{
					date: '',
					description: '',
					ket: ''
				}
			]
		}
	}
};
