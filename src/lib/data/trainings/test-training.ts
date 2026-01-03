// Minimales Test-Training zum Testen der Anwendung
import type { Training } from '$lib/types';

export const testTraining: Training = {
	id: 'test-training',
	name: 'Test-Training',
	questions: [
		{
			type: 'text',
			question: 'Wie heisst die Hauptstadt von Deutschland?',
			answer: ['berlin']
		},
		{
			type: 'multiple-choice',
			question: 'Welche Farben hat die deutsche Flagge?',
			options: [
				{ text: 'Schwarz', correct: true },
				{ text: 'Rot', correct: true },
				{ text: 'Gold', correct: true },
				{ text: 'Blau', correct: false }
			]
		},
		{
			type: 'true-false',
			question: 'Wahr oder falsch?',
			statement: 'Die Erde ist rund.',
			correct: true
		}
	]
};
