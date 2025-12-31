// Sample training data for Vokabeltrainer
import type { Training } from '$lib/types';

export const trainings: Training[] = [
	{
		id: 'deutsch-englisch-grundlagen',
		name: 'Deutsch-Englisch Grundlagen',
		questions: [
			{
				type: 'text',
				question: 'Was bedeutet <strong>Haus</strong> auf Englisch?',
				answer: 'house'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Schule</strong> auf Englisch?',
				answer: 'school'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Buch</strong> auf Englisch?',
				answer: 'book'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Tisch</strong> auf Englisch?',
				answer: 'table'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Stuhl</strong> auf Englisch?',
				answer: 'chair'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Fenster</strong> auf Englisch?',
				answer: 'window'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Tür</strong> auf Englisch?',
				answer: 'door'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Auto</strong> auf Englisch?',
				answer: 'car'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Fahrrad</strong> auf Englisch?',
				answer: ['bicycle', 'bike']
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>Wasser</strong> auf Englisch?',
				answer: 'water'
			}
		]
	},
	{
		id: 'deutsche-artikel',
		name: 'Deutsche Artikel',
		questions: [
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Haus</strong>?',
				options: [
					{ text: 'der', correct: false, explanation: 'Maskulin - nicht korrekt für Haus' },
					{ text: 'die', correct: false, explanation: 'Feminin - nicht korrekt für Haus' },
					{ text: 'das', correct: true, explanation: 'Neutrum - korrekt! Das Haus' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Schule</strong>?',
				options: [
					{ text: 'der', correct: false, explanation: 'Maskulin - nicht korrekt' },
					{ text: 'die', correct: true, explanation: 'Feminin - korrekt! Die Schule' },
					{ text: 'das', correct: false, explanation: 'Neutrum - nicht korrekt' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Tisch</strong>?',
				options: [
					{ text: 'der', correct: true, explanation: 'Maskulin - korrekt! Der Tisch' },
					{ text: 'die', correct: false, explanation: 'Feminin - nicht korrekt' },
					{ text: 'das', correct: false, explanation: 'Neutrum - nicht korrekt' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welche sind <strong>deutsche Artikel</strong>?',
				options: [
					{ text: 'der', correct: true, explanation: 'Maskulin' },
					{ text: 'the', correct: false, explanation: 'Englischer Artikel' },
					{ text: 'die', correct: true, explanation: 'Feminin oder Plural' },
					{ text: 'das', correct: true, explanation: 'Neutrum' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Buch</strong>?',
				options: [
					{ text: 'der', correct: false, explanation: 'Maskulin - nicht korrekt' },
					{ text: 'die', correct: false, explanation: 'Feminin - nicht korrekt' },
					{ text: 'das', correct: true, explanation: 'Neutrum - korrekt! Das Buch' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Stuhl</strong>?',
				options: [
					{ text: 'der', correct: true, explanation: 'Maskulin - korrekt! Der Stuhl' },
					{ text: 'die', correct: false, explanation: 'Feminin - nicht korrekt' },
					{ text: 'das', correct: false, explanation: 'Neutrum - nicht korrekt' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Lampe</strong>?',
				options: [
					{ text: 'der', correct: false, explanation: 'Maskulin - nicht korrekt' },
					{ text: 'die', correct: true, explanation: 'Feminin - korrekt! Die Lampe' },
					{ text: 'das', correct: false, explanation: 'Neutrum - nicht korrekt' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welcher Artikel gehört zu <strong>Computer</strong>?',
				options: [
					{ text: 'der', correct: true, explanation: 'Maskulin - korrekt! Der Computer' },
					{ text: 'die', correct: false, explanation: 'Feminin - nicht korrekt' },
					{ text: 'das', correct: false, explanation: 'Neutrum - nicht korrekt' }
				]
			}
		]
	},
	{
		id: 'englisch-deutsch-verben',
		name: 'Englisch-Deutsch Verben',
		questions: [
			{
				type: 'text',
				question: 'Was bedeutet <strong>to go</strong> auf Deutsch?',
				answer: 'gehen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to eat</strong> auf Deutsch?',
				answer: 'essen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to drink</strong> auf Deutsch?',
				answer: 'trinken'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to sleep</strong> auf Deutsch?',
				answer: 'schlafen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to read</strong> auf Deutsch?',
				answer: 'lesen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to write</strong> auf Deutsch?',
				answer: 'schreiben'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to speak</strong> auf Deutsch?',
				answer: 'sprechen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to run</strong> auf Deutsch?',
				answer: ['laufen', 'rennen']
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to learn</strong> auf Deutsch?',
				answer: 'lernen'
			},
			{
				type: 'text',
				question: 'Was bedeutet <strong>to work</strong> auf Deutsch?',
				answer: 'arbeiten'
			}
		]
	},
	{
		id: 'gemischte-fragen',
		name: 'Gemischte Fragen',
		questions: [
			{
				type: 'text',
				question: 'Übersetze: <em>The cat is sleeping.</em>',
				answer: ['die katze schläft', 'die katze schlaeft']
			},
			{
				type: 'multiple-choice',
				question: 'Welche Wörter sind <strong>Nomen</strong> (Substantive)?',
				options: [
					{ text: 'Haus', correct: true, explanation: 'Nomen - wird großgeschrieben' },
					{ text: 'laufen', correct: false, explanation: 'Verb - eine Tätigkeit' },
					{ text: 'Schule', correct: true, explanation: 'Nomen - wird großgeschrieben' },
					{ text: 'schnell', correct: false, explanation: 'Adjektiv - beschreibt etwas' }
				]
			},
			{
				type: 'text',
				question: 'Was ist die Mehrzahl von <strong>Haus</strong>?',
				answer: 'häuser'
			},
			{
				type: 'text',
				question: 'Was ist die Mehrzahl von <strong>Buch</strong>?',
				answer: 'bücher'
			},
			{
				type: 'multiple-choice',
				question: 'Welche Aussagen über deutsche Nomen sind <strong>korrekt</strong>?',
				options: [
					{ text: 'Nomen werden großgeschrieben', correct: true, explanation: 'Richtig!' },
					{
						text: 'Alle Nomen sind maskulin',
						correct: false,
						explanation: 'Falsch - es gibt der, die, das'
					},
					{ text: 'Nomen haben einen Artikel', correct: true, explanation: 'Richtig!' },
					{
						text: 'Nomen beschreiben Tätigkeiten',
						correct: false,
						explanation: 'Falsch - das sind Verben'
					}
				]
			}
		]
	}
];

export function getTrainingById(id: string): Training | undefined {
	return trainings.find((t) => t.id === id);
}

export function getSelectedTrainings(ids: string[]): Training[] {
	return trainings.filter((t) => ids.includes(t.id));
}

export function getTrainingsSorted(): Training[] {
	return [...trainings].sort((a, b) => a.name.localeCompare(b.name, 'de'));
}
