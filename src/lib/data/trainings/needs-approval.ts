import type { Training } from '$lib/types';

export const needsApproval: Training = {
	id: 'needs-approval',
	name: 'Approval Need',
	questions: [
		{
			type: 'text',
			question: 'Was ist das <strong>Approval Need</strong>?',
			answer: [
				'bestaetigungs-beduerfnis',
				'bestaetigungs beduerfnis',
				'bestaetigung',
				'bestätigung'
			]
		},
		{
			type: 'multiple-choice',
			question: 'Was ist das Besondere am <strong>Approval Need</strong>?',
			options: [
				{
					text: 'Allgemeine Komplimente reichen nicht aus',
					correct: true,
					explanation: 'Menschen mit Approval Need brauchen spezifische Rueckmeldungen'
				},
				{
					text: 'Spezifische Bestaetigung ist noetig',
					correct: true,
					explanation: 'Konkret und detailliert - nicht vage'
				},
				{
					text: 'Jedes Lob funktioniert gleich gut',
					correct: false,
					explanation: 'Falsch - vages Lob ist unwirksam'
				},
				{
					text: 'Es geht um Zugehoerigkeit',
					correct: false,
					explanation: 'Zugehoerigkeit ist das Acceptance Need'
				}
			]
		},
		{
			type: 'text',
			question: 'Was ist die <strong>Ancestral Superpower</strong> des Approval Needs?',
			answer: ['empathie', 'einfuehlungsvermoegen', 'einfühlungsvermögen']
		},
		{
			type: 'multiple-choice',
			question: 'Welches Kompliment ist <strong>wirksam</strong> fuer Approval Need?',
			options: [
				{
					text: 'Die Art, wie du die Daten strukturiert hast, macht es sehr uebersichtlich.',
					correct: true,
					explanation: 'Spezifisch - benennt genau was richtig gemacht wurde'
				},
				{
					text: 'Du machst das gut.',
					correct: false,
					explanation: 'Zu allgemein - nicht spezifisch genug'
				},
				{
					text: 'Tolle Arbeit!',
					correct: false,
					explanation: 'Zu allgemein - nicht spezifisch genug'
				},
				{
					text: 'Du bist ein guter Mitarbeiter.',
					correct: false,
					explanation: 'Zu allgemein - nicht spezifisch genug'
				}
			]
		}
	]
};
