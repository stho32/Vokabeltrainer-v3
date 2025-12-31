// Training data for Vokabeltrainer
// Quelle: NCI Graduate School - Applied Behavior Research (Chase Hughes)
import type { Training } from '$lib/types';

export const trainings: Training[] = [
	{
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
	},
	{
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
					{ text: 'Conformity (Konformitaet)', correct: false, explanation: 'Gehoert zum Acceptance Need' }
				]
			},
			{
				type: 'text',
				question:
					'Was ist die <strong>Ancestral Superpower</strong> des Significance Needs?',
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
	},
	{
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
	},
	{
		id: 'needs-acceptance',
		name: 'Acceptance Need',
		questions: [
			{
				type: 'text',
				question: 'Was ist das <strong>Acceptance Need</strong>?',
				answer: ['akzeptanz-beduerfnis', 'akzeptanz beduerfnis', 'akzeptanz', 'zugehoerigkeit']
			},
			{
				type: 'text',
				question: 'Was ist die <strong>Ancestral Superpower</strong> des Acceptance Needs?',
				answer: [
					'stammverteidigung',
					'kann sich einfuegen',
					'kann sich einfügen',
					'verteidigt den stamm'
				]
			},
			{
				type: 'multiple-choice',
				question: 'Was ist charakteristisch fuer Menschen mit <strong>Acceptance Need</strong>?',
				options: [
					{
						text: 'Vermeiden anzuecken',
						correct: true,
						explanation: 'Wollen nicht negativ auffallen'
					},
					{
						text: 'Passen sich schnell an Gruppenerwartungen an',
						correct: true,
						explanation: 'Suchen Zugehoerigkeit durch Anpassung'
					},
					{
						text: 'Suchen staendig Bestaetigung der Zugehoerigkeit',
						correct: true,
						explanation: 'Wollen wissen, dass sie dazugehoeren'
					},
					{
						text: 'Wollen aus der Masse herausragen',
						correct: false,
						explanation: 'Das ist eher Significance Need'
					}
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welche Sprache funktioniert bei <strong>Acceptance Need</strong>?',
				options: [
					{
						text: '"Wir"-Sprache verwenden',
						correct: true,
						explanation: 'Tribale Sprache signalisiert Zugehoerigkeit'
					},
					{
						text: '"Wir koennten zusammen..." statt "Du koenntest..."',
						correct: true,
						explanation: 'Inklusive statt exklusive Formulierung'
					},
					{
						text: '"Das ist deine Aufgabe"',
						correct: false,
						explanation: 'Exklusiv - besser: "Das ist unser Projekt"'
					},
					{
						text: 'Gemeinsamkeiten betonen',
						correct: true,
						explanation: '"Wir beide..." zeigt Verbindung'
					}
				]
			}
		]
	},
	{
		id: 'needs-intelligence',
		name: 'Intelligence Need',
		questions: [
			{
				type: 'text',
				question: 'Was ist das <strong>Intelligence Need</strong>?',
				answer: ['intelligenz-beduerfnis', 'intelligenz beduerfnis', 'intelligenz', 'kompetenz']
			},
			{
				type: 'text',
				question:
					'Welches Syndrom steht in Verbindung mit dem <strong>Intelligence Need</strong>?',
				answer: ['imposter syndrome', 'imposter-syndrom', 'hochstapler-syndrom', 'hochstapler syndrom']
			},
			{
				type: 'text',
				question: 'Was ist die <strong>Ancestral Superpower</strong> des Intelligence Needs?',
				answer: ['verstehen', 'erklaeren', 'erklären', 'understand', 'explain']
			},
			{
				type: 'multiple-choice',
				question:
					'Welches ist ein passendes <strong>Needs Compliment</strong> fuer Intelligence?',
				options: [
					{
						text: 'Das ist ein interessanter Gedanke, wie du das analysiert hast.',
						correct: true,
						explanation: 'Bestaetigt die intellektuelle Kompetenz'
					},
					{
						text: 'Das ist eine brillante Strategie!',
						correct: true,
						explanation: 'Bestaetigt strategisches Denken'
					},
					{
						text: 'Du gehoerst einfach dazu.',
						correct: false,
						explanation: 'Das ist ein Acceptance-Kompliment'
					},
					{
						text: 'Das haetten nicht viele so durchgehalten.',
						correct: false,
						explanation: 'Das ist ein Strength-Kompliment'
					}
				]
			},
			{
				type: 'multiple-choice',
				question: 'Wie kommunizieren Menschen mit <strong>Intelligence Need</strong>?',
				options: [
					{ text: 'Strukturiert', correct: true, explanation: 'Klare Gliederung der Gedanken' },
					{ text: 'Logisch', correct: true, explanation: 'Nachvollziehbare Argumentationsketten' },
					{
						text: 'Mit viel Detail',
						correct: true,
						explanation: 'Wollen exaktes Verstaendnis sicherstellen'
					},
					{
						text: 'Kurz und knapp',
						correct: false,
						explanation: 'Eher typisch fuer Strength Need'
					}
				]
			}
		]
	},
	{
		id: 'needs-strength',
		name: 'Strength Need',
		questions: [
			{
				type: 'text',
				question: 'Was ist das <strong>Strength Need</strong>?',
				answer: ['staerke-beduerfnis', 'staerke beduerfnis', 'staerke', 'stärke']
			},
			{
				type: 'text',
				question: 'Was suchen Menschen mit <strong>Strength Need</strong> primaer?',
				answer: ['respekt']
			},
			{
				type: 'text',
				question: 'Was ist die <strong>Ancestral Superpower</strong> des Strength Needs?',
				answer: ['furchtlosigkeit', 'fearless', 'furchtlos']
			},
			{
				type: 'multiple-choice',
				question: 'Welche Wertehierarchie haben Menschen mit <strong>Strength Need</strong>?',
				options: [
					{ text: 'Kontrolle > Chaos', correct: true, explanation: 'Kontrolle ist wichtiger' },
					{ text: 'Respekt > Liebe', correct: true, explanation: 'Respekt vor Zuneigung' },
					{
						text: 'Unabhaengigkeit > Verbindung',
						correct: true,
						explanation: 'Selbststaendigkeit vor Beziehung'
					},
					{
						text: 'Liebe > Respekt',
						correct: false,
						explanation: 'Falsch - Respekt ist wichtiger'
					}
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welches ist ein passendes <strong>Needs Compliment</strong> fuer Strength?',
				options: [
					{
						text: 'Du hast das wirklich durchgezogen, obwohl es schwer war.',
						correct: true,
						explanation: 'Bestaetigt Durchhaltevermoegen'
					},
					{
						text: 'Wow, du hast das alles alleine geschafft!',
						correct: true,
						explanation: 'Bestaetigt Selbststaendigkeit'
					},
					{
						text: 'Wir sind froh, dass du bei uns bist.',
						correct: false,
						explanation: 'Das ist ein Acceptance-Kompliment'
					},
					{
						text: 'Du machst das genau richtig.',
						correct: false,
						explanation: 'Das ist ein Approval-Kompliment'
					}
				]
			}
		]
	},
	{
		id: 'needs-pity',
		name: 'Pity Need',
		questions: [
			{
				type: 'text',
				question: 'Was ist das <strong>Pity Need</strong>?',
				answer: ['mitleids-beduerfnis', 'mitleids beduerfnis', 'mitleid']
			},
			{
				type: 'text',
				question: 'Was ist die <strong>groesste Angst</strong> bei Menschen mit Pity Need?',
				answer: [
					'dass andere nicht glauben',
					'nicht geglaubt zu werden',
					'nicht geglaubt werden',
					'dass man ihnen nicht glaubt'
				]
			},
			{
				type: 'multiple-choice',
				question: 'Was suchen Menschen mit <strong>Pity Need</strong>?',
				options: [
					{
						text: 'Empathie und Sympathie',
						correct: true,
						explanation: 'Mitgefuehl fuer ihr Leiden'
					},
					{
						text: 'Anerkennung ihres Leidens',
						correct: true,
						explanation: 'Validierung ihrer schwierigen Situation'
					},
					{
						text: 'Sofortige Loesungen',
						correct: false,
						explanation: 'Loesungsvorschlaege werden oft abgelehnt'
					},
					{
						text: 'Intellektuelle Anerkennung',
						correct: false,
						explanation: 'Das ist das Intelligence Need'
					}
				]
			},
			{
				type: 'multiple-choice',
				question: 'Welche Strategie funktioniert bei <strong>Pity Need</strong>?',
				options: [
					{
						text: 'Compliment + Redirect',
						correct: true,
						explanation: 'Leiden anerkennen, dann sanft umlenken'
					},
					{
						text: 'Das Leiden anerkennen ohne in Frage zu stellen',
						correct: true,
						explanation: 'Validierung ist wichtig'
					},
					{
						text: 'Sofort Loesungen anbieten',
						correct: false,
						explanation: 'Wird oft als Ablehnung wahrgenommen'
					},
					{
						text: 'Das eigene Leid dagegenstellen',
						correct: false,
						explanation: 'Fuehrt zu Wettbewerb um Mitleid'
					}
				]
			}
		]
	},
	{
		id: 'needs-compliments-uebersicht',
		name: 'Needs Compliments Uebersicht',
		questions: [
			{
				type: 'multiple-choice',
				question:
					'Welches <strong>Needs Compliment</strong> passt zu welchem Need? "Dein Beitrag hat hier wirklich einen Unterschied gemacht."',
				options: [
					{
						text: 'Significance',
						correct: true,
						explanation: 'Bestaetigt Bedeutsamkeit und einzigartige Wirkung'
					},
					{ text: 'Approval', correct: false, explanation: 'Approval braucht spezifische Bestaetigung' },
					{
						text: 'Acceptance',
						correct: false,
						explanation: 'Acceptance braucht Zugehoerigkeits-Signale'
					},
					{ text: 'Strength', correct: false, explanation: 'Strength braucht Respekt fuer Ausdauer' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Welches <strong>Needs Compliment</strong> passt zu welchem Need? "Du machst das genau richtig."',
				options: [
					{
						text: 'Approval',
						correct: true,
						explanation: 'Bestaetigt, dass die Person es richtig macht'
					},
					{ text: 'Significance', correct: false, explanation: 'Significance will Bedeutsamkeit' },
					{
						text: 'Intelligence',
						correct: false,
						explanation: 'Intelligence will intellektuelle Anerkennung'
					},
					{ text: 'Pity', correct: false, explanation: 'Pity will Mitleid' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Welches <strong>Needs Compliment</strong> passt zu welchem Need? "Es ist so angenehm, mit dir zusammen zu sein."',
				options: [
					{
						text: 'Acceptance',
						correct: true,
						explanation: 'Signalisiert Zugehoerigkeit und Wertschaetzung'
					},
					{ text: 'Approval', correct: false, explanation: 'Approval will spezifische Bestaetigung' },
					{ text: 'Strength', correct: false, explanation: 'Strength will Respekt' },
					{ text: 'Significance', correct: false, explanation: 'Significance will Bedeutsamkeit' }
				]
			},
			{
				type: 'multiple-choice',
				question: 'Wie sollten <strong>Needs Compliments</strong> eingesetzt werden?',
				options: [
					{
						text: 'Sparsam und gezielt',
						correct: true,
						explanation: 'Wie Gewuerz - nicht zu viel'
					},
					{
						text: 'Nach einer Beobachtung, die das Need bestaetigt',
						correct: true,
						explanation: 'Timing ist wichtig'
					},
					{
						text: 'Moeglichst haeufig',
						correct: false,
						explanation: 'Zu viel macht die Person abgestumpft'
					},
					{
						text: 'Nur einmal pro Gespraech',
						correct: false,
						explanation: 'Die richtige Balance ist individuell'
					}
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Welches <strong>Needs Compliment</strong> passt zu welchem Need? "Das klingt wirklich schwierig, was du durchgemacht hast."',
				options: [
					{ text: 'Pity', correct: true, explanation: 'Anerkennt das Leiden ohne es in Frage zu stellen' },
					{ text: 'Acceptance', correct: false, explanation: 'Acceptance will Zugehoerigkeit' },
					{ text: 'Strength', correct: false, explanation: 'Strength will Respekt fuer Ausdauer' },
					{ text: 'Approval', correct: false, explanation: 'Approval will spezifische Bestaetigung' }
				]
			}
		]
	},
	{
		id: 'ancestral-superpowers',
		name: 'Ancestral Superpowers',
		questions: [
			{
				type: 'multiple-choice',
				question: 'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Empathie</em>',
				options: [
					{ text: 'Approval', correct: true, explanation: 'Mehr Einfuehlungsvermoegen' },
					{ text: 'Acceptance', correct: false, explanation: 'Acceptance = Stammverteidigung' },
					{ text: 'Intelligence', correct: false, explanation: 'Intelligence = Verstehen/Erklaeren' },
					{ text: 'Strength', correct: false, explanation: 'Strength = Furchtlosigkeit' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Stammverteidigung</em>',
				options: [
					{
						text: 'Acceptance',
						correct: true,
						explanation: 'Kann sich einfuegen und verteidigt die Gruppe'
					},
					{ text: 'Strength', correct: false, explanation: 'Strength = Furchtlosigkeit' },
					{ text: 'Significance', correct: false, explanation: 'Significance = Unabhaengigkeit' },
					{ text: 'Approval', correct: false, explanation: 'Approval = Empathie' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Verstehen/Erklaeren</em>',
				options: [
					{ text: 'Intelligence', correct: true, explanation: 'Kann komplexe Dinge erklaeren' },
					{ text: 'Approval', correct: false, explanation: 'Approval = Empathie' },
					{ text: 'Acceptance', correct: false, explanation: 'Acceptance = Stammverteidigung' },
					{ text: 'Significance', correct: false, explanation: 'Significance = Unabhaengigkeit' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Furchtlosigkeit</em>',
				options: [
					{
						text: 'Strength',
						correct: true,
						explanation: 'Bleibt ruhig in Gefahrensituationen'
					},
					{ text: 'Significance', correct: false, explanation: 'Significance = Unabhaengigkeit' },
					{ text: 'Intelligence', correct: false, explanation: 'Intelligence = Verstehen' },
					{ text: 'Acceptance', correct: false, explanation: 'Acceptance = Stammverteidigung' }
				]
			},
			{
				type: 'multiple-choice',
				question:
					'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Unabhaengigkeit vom Urteil anderer</em>',
				options: [
					{
						text: 'Significance',
						correct: true,
						explanation: 'Kann sich vom Urteil anderer loesen'
					},
					{ text: 'Strength', correct: false, explanation: 'Strength = Furchtlosigkeit' },
					{ text: 'Approval', correct: false, explanation: 'Approval = Empathie' },
					{ text: 'Intelligence', correct: false, explanation: 'Intelligence = Verstehen' }
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
