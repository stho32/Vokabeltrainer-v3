import type { Training } from '$lib/types';

export const needsMapGrundlagen: Training = {
	id: 'needs-map-grundlagen',
	name: 'Needs-Map Grundlagen',
	questions: [
		{
			type: 'text',
			question: 'Was sind <strong>Needs</strong> im NCI-System?',
			answer: [
				'emotionale grundbeduerfnisse',
				'emotionale grundbedürfnisse',
				'grundbeduerfnisse',
				'grundbedürfnisse'
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche sind die <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Bedeutsamkeits-Beduerfnis' },
				{ text: 'Pity', correct: true, explanation: 'Mitleids-Beduerfnis' },
				{ text: 'Acceptance', correct: true, explanation: 'Akzeptanz-Beduerfnis' },
				{ text: 'Happiness', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche gehoeren zu den <strong>sechs primaeren Needs</strong>?',
			options: [
				{ text: 'Approval', correct: true, explanation: 'Bestaetigungs-Beduerfnis' },
				{ text: 'Intelligence', correct: true, explanation: 'Intelligenz-Beduerfnis' },
				{ text: 'Strength', correct: true, explanation: 'Staerke-Beduerfnis' },
				{ text: 'Love', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'text',
			question: 'Woraus entstehen Needs laut NCI?',
			answer: ['kindheitsdefizit', 'emotionale mangelernaehrung', 'emotionale mangelernährung']
		},
		{
			type: 'multiple-choice',
			question: 'Was ist charakteristisch fuer Needs?',
			options: [
				{
					text: 'Die Befriedigung ist temporaer',
					correct: true,
					explanation: 'Needs koennen kurzzeitig erfuellt werden, kehren aber immer zurueck'
				},
				{
					text: 'Needs sind permanent befriedigt wenn einmal erfuellt',
					correct: false,
					explanation: 'Falsch - Needs kehren immer zurueck'
				},
				{
					text: 'Needs sind miteinander verbunden',
					correct: true,
					explanation: 'Needs blenden ineinander ueber und koennen sich gegenseitig ersetzen'
				},
				{
					text: 'Jeder Mensch hat nur ein Need',
					correct: false,
					explanation: 'Falsch - Menschen koennen mehrere Needs haben'
				}
			]
		}
	]
};
