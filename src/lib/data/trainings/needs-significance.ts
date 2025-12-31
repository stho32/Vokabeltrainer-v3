import type { Training } from '$lib/types';

export const needsSignificance: Training = {
	id: 'needs-significance',
	name: 'Significance Need',
	questions: [
		{
			type: 'text',
			question: 'Was ist das <strong>Significance Need</strong>?',
			answer: [
				'bedeutsamkeits-beduerfnis',
				'bedeutsamkeits beduerfnis',
				'bedeutsamkeit',
				'wichtig sein'
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche sind die <strong>drei Saeulen</strong> des Significance Needs?',
			options: [
				{ text: 'Impact (Wirkung)', correct: true, explanation: 'Den Wunsch, etwas zu bewirken' },
				{
					text: 'Achievement (Leistung)',
					correct: true,
					explanation: 'Messbare Erfolge erzielen'
				},
				{
					text: 'Exceptionality (Aussergewoehnlichkeit)',
					correct: true,
					explanation: 'Anders sein als andere'
				},
				{
					text: 'Conformity (Konformitaet)',
					correct: false,
					explanation: 'Gehoert zum Acceptance Need'
				}
			]
		},
		{
			type: 'text',
			question: 'Was ist die <strong>Ancestral Superpower</strong> des Significance Needs?',
			answer: ['unabhaengigkeit', 'unabhängigkeit', 'kann sich vom urteil anderer loesen']
		},
		{
			type: 'multiple-choice',
			question: 'Welches ist ein passendes <strong>Needs Compliment</strong> fuer Significance?',
			options: [
				{
					text: 'Dein Beitrag hat hier wirklich einen Unterschied gemacht.',
					correct: true,
					explanation: 'Bestaetigt die einzigartige Wirkung der Person'
				},
				{
					text: 'Du machst das genau richtig.',
					correct: false,
					explanation: 'Das ist ein Approval-Kompliment'
				},
				{
					text: 'Es ist angenehm, mit dir zusammen zu sein.',
					correct: false,
					explanation: 'Das ist ein Acceptance-Kompliment'
				},
				{
					text: 'Du hast das durchgezogen, obwohl es schwer war.',
					correct: false,
					explanation: 'Das ist ein Strength-Kompliment'
				}
			]
		}
	]
};
