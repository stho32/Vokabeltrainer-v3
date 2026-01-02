// Kombiniertes Needs-Map Training
// Quelle: NCI Graduate School - Applied Behavior Research (Chase Hughes)
import type { Training } from '$lib/types';

export const needsMap: Training = {
	id: 'needs-map',
	name: 'Needs-Map (NCI-System)',
	questions: [
		// === Grundlagen ===
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
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Bedeutsamkeits-Beduerfnis' },
				{ text: 'Pity', correct: true, explanation: 'Mitleids-Beduerfnis' },
				{ text: 'Happiness', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Love', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Acceptance', correct: true, explanation: 'Akzeptanz-Beduerfnis' },
				{ text: 'Approval', correct: true, explanation: 'Bestaetigungs-Beduerfnis' },
				{ text: 'Trust', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Security', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Intelligence', correct: true, explanation: 'Intelligenz-Beduerfnis' },
				{ text: 'Strength', correct: true, explanation: 'Staerke-Beduerfnis' },
				{ text: 'Power', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Freedom', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Bedeutsamkeits-Beduerfnis' },
				{ text: 'Acceptance', correct: true, explanation: 'Akzeptanz-Beduerfnis' },
				{ text: 'Respect', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Comfort', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Pity', correct: true, explanation: 'Mitleids-Beduerfnis' },
				{ text: 'Strength', correct: true, explanation: 'Staerke-Beduerfnis' },
				{ text: 'Courage', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Loyalty', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche der folgenden Optionen gehoeren zu den <strong>sechs primaeren Needs</strong> im NCI-System?',
			options: [
				{ text: 'Approval', correct: true, explanation: 'Bestaetigungs-Beduerfnis' },
				{ text: 'Intelligence', correct: true, explanation: 'Intelligenz-Beduerfnis' },
				{ text: 'Wisdom', correct: false, explanation: 'Kein primaeres Need im NCI-System' },
				{ text: 'Success', correct: false, explanation: 'Kein primaeres Need im NCI-System' }
			]
		},
		{
			type: 'text',
			question: 'Woraus entstehen Needs laut NCI?',
			answer: ['kindheitsdefizit', 'kindheitsdefizite', 'emotionale mangelernaehrung', 'emotionale mangelernährung']
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
		},

		// === Significance Need ===
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
		},

		// === Approval Need ===
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
		},

		// === Acceptance Need ===
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
		},

		// === Intelligence Need ===
		{
			type: 'text',
			question: 'Was ist das <strong>Intelligence Need</strong>?',
			answer: ['intelligenz-beduerfnis', 'intelligenz beduerfnis', 'intelligenz', 'kompetenz']
		},
		{
			type: 'text',
			question:
				'Welches Syndrom steht in Verbindung mit dem <strong>Intelligence Need</strong>?',
			answer: [
				'imposter syndrome',
				'imposter-syndrom',
				'hochstapler-syndrom',
				'hochstapler syndrom'
			]
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
		},

		// === Strength Need ===
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
		},

		// === Pity Need ===
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
		},

		// === Needs Compliments Zuordnung ===
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
				{
					text: 'Approval',
					correct: false,
					explanation: 'Approval braucht spezifische Bestaetigung'
				},
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
				{
					text: 'Pity',
					correct: true,
					explanation: 'Anerkennt das Leiden ohne es in Frage zu stellen'
				},
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance will Zugehoerigkeit' },
				{ text: 'Strength', correct: false, explanation: 'Strength will Respekt fuer Ausdauer' },
				{ text: 'Approval', correct: false, explanation: 'Approval will spezifische Bestaetigung' }
			]
		},

		// === Ancestral Superpowers ===
		{
			type: 'multiple-choice',
			question:
				'Ordne die <strong>Ancestral Superpower</strong> dem richtigen Need zu: <em>Empathie</em>',
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
		},

		// === True/False Fragen ===
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Needs sind das Ergebnis einer emotionalen Mangelernaehrung in der Kindheit.',
			correct: true,
			explanation:
				'Needs entstehen aus einem emotionalen Defizit - einer Art "emotionalen Mangelernaehrung" in der Kindheit.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Ein einmal befriedigtes Need bleibt dauerhaft erfuellt.',
			correct: false,
			explanation:
				'Falsch - die Befriedigung ist temporaer. Das Need kann kurzzeitig erfuellt werden, kehrt aber immer zurueck.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Das Intelligence Need steht in direkter Verbindung zum Imposter Syndrome.',
			correct: true,
			explanation:
				'Je staerker das Intelligence Need, desto groesser oft die Angst, als "nicht wirklich intelligent" entlarvt zu werden.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Menschen mit Strength Need bevorzugen Liebe ueber Respekt.',
			correct: false,
			explanation:
				'Falsch - fuer Menschen mit Strength Need gilt: Respekt > Liebe. Respekt ist wichtiger als Zuneigung.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Die groesste Angst bei Menschen mit Pity Need ist, dass andere ihnen nicht glauben.',
			correct: true,
			explanation:
				'Diese Angst fuehrt zu wiederholtem Erzaehlen von Leidensgeschichten und Eskalation der Darstellung.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Beim Approval Need reichen allgemeine Komplimente wie "Tolle Arbeit!" aus.',
			correct: false,
			explanation:
				'Falsch - Menschen mit Approval Need brauchen spezifische Bestaetigung. Vages Lob ist unwirksam.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Needs Compliments sollten wie Gewuerz sparsam und gezielt eingesetzt werden.',
			correct: true,
			explanation:
				'Zu haeufig: Die Person wird abgestumpft. Zu selten: Keine Verbindung. Die richtige Balance ist entscheidend.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement:
				'Menschen mit Acceptance Need wollen aus der Masse herausragen.',
			correct: false,
			explanation:
				'Falsch - Acceptance-orientierte Menschen fanden Sicherheit darin, nicht aufzufallen. Herausragen ist eher Significance Need.'
		},

		// === Matching Fragen ===
		{
			type: 'matching',
			question: 'Ordne die <strong>Needs</strong> ihren <strong>Ancestral Superpowers</strong> zu:',
			pairs: [
				{ left: 'Approval', right: 'Empathie' },
				{ left: 'Acceptance', right: 'Stammverteidigung' },
				{ left: 'Intelligence', right: 'Verstehen/Erklaeren' },
				{ left: 'Strength', right: 'Furchtlosigkeit' },
				{ left: 'Significance', right: 'Unabhaengigkeit' }
			]
		},
		{
			type: 'matching',
			question: 'Ordne die <strong>Needs</strong> ihren <strong>Needs Compliments</strong> zu:',
			pairs: [
				{ left: 'Strength', right: 'Du hast das durchgezogen, obwohl es schwer war.' },
				{ left: 'Intelligence', right: 'Das ist ein interessanter Gedanke.' },
				{ left: 'Acceptance', right: 'Es ist angenehm, mit dir zusammen zu sein.' },
				{ left: 'Approval', right: 'Du machst das genau richtig.' },
				{ left: 'Significance', right: 'Dein Beitrag hat einen Unterschied gemacht.' }
			]
		},
		{
			type: 'matching',
			question: 'Ordne die <strong>Needs</strong> ihrer <strong>zentralen Frage</strong> zu:',
			pairs: [
				{ left: 'Approval', right: 'Mache ich es richtig?' },
				{ left: 'Acceptance', right: 'Gehoere ich dazu?' },
				{ left: 'Intelligence', right: 'Bin ich klug?' },
				{ left: 'Significance', right: 'Bin ich wichtig?' }
			]
		},
		{
			type: 'matching',
			question:
				'Ordne die <strong>Wertehierarchie</strong> dem <strong>Strength Need</strong> zu:',
			pairs: [
				{ left: 'Kontrolle', right: '> Chaos' },
				{ left: 'Respekt', right: '> Liebe' },
				{ left: 'Unabhaengigkeit', right: '> Verbindung' },
				{ left: 'Klarheit', right: '> Ambiguitaet' }
			]
		},

		// === Categorization Fragen ===
		{
			type: 'categorization',
			question:
				'Ordne die <strong>Verhaltensweisen</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Significance Need',
					items: [
						'Spricht ueber eigene Erfolge',
						'Uebernimmt gerne Fuehrungsrollen',
						'Will aus der Masse herausragen'
					]
				},
				{
					name: 'Acceptance Need',
					items: [
						'Vermeidet es, anzuecken',
						'Passt sich schnell an Gruppenerwartungen an',
						'Opfert eigene Beduerfnisse fuer Gruppenharmonie'
					]
				}
			]
		},
		{
			type: 'categorization',
			question:
				'Ordne die <strong>Kommunikationsmerkmale</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Intelligence Need',
					items: [
						'Strukturiert und logisch',
						'Mit viel Detail',
						'Korrigiert gerne Fehler bei anderen'
					]
				},
				{
					name: 'Strength Need',
					items: [
						'Kurze, klare Aussagen',
						'Handlungsorientierte Sprache',
						'Vermeidet emotionale Ausdruecke'
					]
				}
			]
		},
		{
			type: 'categorization',
			question:
				'Ordne die <strong>Komplimente</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Approval Need',
					items: [
						'Die Art, wie du das organisiert hast, ist genau richtig.',
						'Deine Vorgehensweise war sehr klug.',
						'So wie du das formuliert hast, ist es perfekt.'
					]
				},
				{
					name: 'Pity Need',
					items: [
						'Das klingt wirklich schwierig.',
						'Ich kann verstehen, wie schwer das sein muss.',
						'Mann, ich fuehle mit dir.'
					]
				}
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>Saeulen</strong> dem <strong>Significance Need</strong> zu:',
			categories: [
				{
					name: 'Significance Need',
					items: ['Impact (Wirkung)', 'Achievement (Leistung)', 'Exceptionality (Aussergewoehnlichkeit)']
				},
				{
					name: 'Nicht Significance',
					items: ['Conformity (Konformitaet)', 'Zugehoerigkeit', 'Spezifische Bestaetigung']
				}
			]
		},

		// === DiceText Fragen ===
		{
			type: 'dice-text',
			question: 'Ergaenze die <strong>fehlenden Begriffe</strong> zum Kernkonzept der Needs:',
			text: 'Needs sind das, was eine Person in der Kindheit nicht bekommen hat und nun staendig zu erreichen versucht. Die Person will die Geschichte zu Ende bringen - aber die Geschichte endet nie.',
			// Kindheit(8), bekommen(10), staendig(14), Geschichte(22), endet(30)
			hiddenWords: [8, 10, 14, 22, 30],
			distractors: ['Jugend', 'verloren', 'selten', 'Erzaehlung', 'beginnt']
		},
		{
			type: 'dice-text',
			question:
				'Ergaenze die <strong>fehlenden Begriffe</strong> zur emotionalen Mangelernaehrung:',
			text: 'Needs sind das Ergebnis eines emotionalen Defizits - einer Art emotionalen Mangelernaehrung in der Kindheit. Die Befriedigung ist temporaer.',
			// emotionalen(5), Mangelernaehrung(11), Befriedigung(16), temporaer(18)
			hiddenWords: [5, 11, 16, 18],
			distractors: ['rationalen', 'Ueberversorgung', 'Belohnung', 'permanent']
		},
		{
			type: 'dice-text',
			question: 'Ergaenze die <strong>fehlenden Begriffe</strong> zum Pity Need:',
			text: 'Die groesste Angst bei Menschen mit Pity Need ist, dass andere ihnen nicht glauben. Die eleganteste Strategie ist Compliment plus Redirect.',
			// Angst(2), glauben(13), Strategie(16), Compliment(18), Redirect(20)
			hiddenWords: [2, 13, 16, 18, 20],
			distractors: ['Hoffnung', 'vertrauen', 'Taktik', 'Kritik', 'Ablenkung']
		},
		{
			type: 'dice-text',
			question: 'Ergaenze die <strong>fehlenden Begriffe</strong> zum Strength Need:',
			text: 'Menschen mit Strength Need suchen nach Respekt. Ihre Wertehierarchie: Kontrolle ueber Chaos, Respekt ueber Liebe, Unabhaengigkeit ueber Verbindung.',
			// Respekt(6), Kontrolle(9), Chaos(11), Liebe(14), Unabhaengigkeit(15)
			hiddenWords: [6, 9, 11, 14, 15],
			distractors: ['Macht', 'Ordnung', 'Frieden', 'Zuneigung', 'Abhaengigkeit']
		},
		{
			type: 'dice-text',
			question: 'Ergaenze die <strong>fehlenden Begriffe</strong> zur Acceptance Kommunikation:',
			text: 'Bei Menschen mit Acceptance Need funktioniert Wir-Sprache am besten. Statt Du koenntest sagt man besser Wir koennten zusammen.',
			// Wir-Sprache(6), koenntest(11), Wir(15), koennten(16)
			hiddenWords: [6, 11, 15, 16],
			distractors: ['Ich-Sprache', 'solltest', 'Du', 'muessten']
		},

		// === Linguistic Indicators ===
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Significance Need</strong> hin?',
			options: [
				{ text: 'Legacy contribution (Vermaechtnis)', correct: true, explanation: 'Significance-orientierte Menschen wollen etwas Bleibendes hinterlassen' },
				{ text: 'Mattering (Von Bedeutung sein)', correct: true, explanation: 'Das Gefuehl, dass man zaehlt und wichtig ist' },
				{ text: 'Standing out (Herausragen)', correct: true, explanation: 'Sich von anderen abheben wollen' },
				{ text: 'External validation (Externe Bestaetigung)', correct: false, explanation: 'Dies ist ein Approval-Indikator' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Approval Need</strong> hin?',
			options: [
				{ text: 'Seeks praise (Sucht Lob)', correct: true, explanation: 'Aktives Suchen nach Anerkennung' },
				{ text: 'Fear of disapproval (Angst vor Missbilligung)', correct: true, explanation: 'Furcht vor negativem Feedback' },
				{ text: 'External validation (Externe Bestaetigung)', correct: true, explanation: 'Benoetigt aeussere Zustimmung' },
				{ text: 'Craves belonging (Sehnt sich nach Zugehoerigkeit)', correct: false, explanation: 'Dies ist ein Acceptance-Indikator' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Acceptance Need</strong> hin?',
			options: [
				{ text: 'Being welcomed (Willkommen geheissen werden)', correct: true, explanation: 'Das Gefuehl, erwuenscht zu sein' },
				{ text: 'Fear of rejection (Angst vor Ablehnung)', correct: true, explanation: 'Fundamentale Zurueckweisungsangst' },
				{ text: 'Social belonging (Soziale Zugehoerigkeit)', correct: true, explanation: 'Gruppenintegration ist zentral' },
				{ text: 'Proving value (Wert beweisen)', correct: false, explanation: 'Dies ist ein Significance-Indikator' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Intelligence Need</strong> hin?',
			options: [
				{ text: 'Fear of appearing incompetent (Angst inkompetent zu wirken)', correct: true, explanation: 'Furcht vor Bloesstellung' },
				{ text: 'Cognitive self-worth (Kognitiver Selbstwert)', correct: true, explanation: 'Wert durch Intelligenz definiert' },
				{ text: 'Intellectual identity (Intellektuelle Identitaet)', correct: true, explanation: 'Identifikation ueber Intelligenz' },
				{ text: 'Endurance (Ausdauer)', correct: false, explanation: 'Dies ist ein Strength-Indikator' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Strength Need</strong> hin?',
			options: [
				{ text: 'Emotional durability (Emotionale Belastbarkeit)', correct: true, explanation: 'Gefuehlsmaessige Ausdauer zeigen' },
				{ text: 'Avoids dependence (Vermeidet Abhaengigkeit)', correct: true, explanation: 'Keine Hilfe brauchen wollen' },
				{ text: 'Personal fortitude (Persoenliche Standhaftigkeit)', correct: true, explanation: 'Innere Staerke demonstrieren' },
				{ text: 'Attention through suffering (Aufmerksamkeit durch Leiden)', correct: false, explanation: 'Dies ist ein Pity-Indikator' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche Ausdruecke deuten auf ein <strong>Pity Need</strong> hin?',
			options: [
				{ text: 'Attention through suffering (Aufmerksamkeit durch Leiden)', correct: true, explanation: 'Leid als Mittel zur Beachtung' },
				{ text: 'Identity built on adversity (Identitaet auf Widrigkeiten aufgebaut)', correct: true, explanation: 'Leid als Identitaetskern' },
				{ text: 'Pain as bonding agent (Schmerz als Bindungsmittel)', correct: true, explanation: 'Leid als Verbindungselement' },
				{ text: 'Being welcomed (Willkommen geheissen werden)', correct: false, explanation: 'Dies ist ein Acceptance-Indikator' }
			]
		},

		// === Linguistic Indicators Kategorisierung ===
		{
			type: 'categorization',
			question: 'Ordne die <strong>Linguistic Indicators</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Significance Need',
					items: ['Existential relevance (Existenzielle Relevanz)', 'Proving value (Wert beweisen)', 'Lasting emotional impact (Dauerhafter Einfluss)']
				},
				{
					name: 'Approval Need',
					items: ['Conditional self-worth (Bedingter Selbstwert)', 'Needing to be liked (Gemocht werden muessen)', 'Vulnerability to judgement (Empfindlich bei Kritik)']
				}
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>Linguistic Indicators</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Intelligence Need',
					items: ['Cognitive control (Kognitive Kontrolle)', 'Mental acuity (Geistige Schaerfe)', 'Always being prepared (Immer vorbereitet sein)']
				},
				{
					name: 'Strength Need',
					items: ['Resist being overwhelmed (Widerstand gegen Ueberwaeltigung)', 'Bouncing back (Zurueckfedern)', 'Inner resourcefulness (Innere Findigkeit)']
				}
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>Linguistic Indicators</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Acceptance Need',
					items: ['Emotional security via inclusion (Sicherheit durch Einschluss)', 'Craves belonging (Sehnt sich nach Zugehoerigkeit)', 'Fear of being found out (Angst als Aussenseiter enttarnt zu werden)']
				},
				{
					name: 'Pity Need',
					items: ['Staying in the low points (In Tiefpunkten verweilen)', 'Noticed through suffering (Durch Leiden bemerkt werden)', 'Emotional dependency (Emotionale Abhaengigkeit)']
				}
			]
		},

		// === Textbasierte Need-Erkennung: Significance ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ohne mich waere das Projekt komplett gescheitert. Ich habe das quasi im Alleingang gerettet."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Typische Significance-Sprache: "Ohne mich" betont die eigene Wirkung, "im Alleingang" die Einzigartigkeit' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde Durchhaltevermoegen betonen ("Ich habe durchgehalten"), nicht Einzigartigkeit' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fragen ("War das so richtig?")' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde analytische Faehigkeiten betonen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ich habe da wirklich etwas bewirkt. Die Leute werden sich noch lange an meinen Beitrag erinnern."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: '"Etwas bewirkt" (Impact) und "erinnern" (Legacy) sind klassische Significance-Indikatoren' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde Leiden und Schwierigkeiten betonen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Zugehoerigkeit zur Gruppe betonen' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht spezifische Bestaetigung, nicht allgemeine Wirkung' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Das kann nicht jeder so wie ich. Ich habe da eine besondere Faehigkeit."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: '"Nicht jeder so wie ich" und "besondere Faehigkeit" zeigen Exceptionality - eine der drei Saeulen des Significance Needs' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde konkrete Expertise oder Wissen betonen' },
				{ text: 'Strength', correct: false, explanation: 'Strength betont Belastbarkeit, nicht Einzigartigkeit' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance will Teil der Gruppe sein, nicht herausragen' }
			]
		},

		// === Textbasierte Need-Erkennung: Approval ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ist das so richtig, wie ich das gemacht habe? Ich bin mir nicht sicher, ob das deinen Erwartungen entspricht."</em>',
			options: [
				{ text: 'Approval', correct: true, explanation: '"Ist das so richtig?" und "deinen Erwartungen entspricht" sind klassische Approval-Indikatoren - Suche nach spezifischer Bestaetigung' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde nach Zugehoerigkeit fragen, nicht nach Richtigkeit' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde eigene Kompetenz darstellen, nicht anzweifeln' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde Leiden betonen, nicht Unsicherheit ueber Richtigkeit' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Hab ich da einen Fehler gemacht? Sag mir bitte genau, was ich besser machen kann."</em>',
			options: [
				{ text: 'Approval', correct: true, explanation: 'Die Suche nach spezifischem Feedback ("genau, was ich besser machen kann") ist typisch fuer Approval Need' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde eigene Leistungen hervorheben, nicht Fehler hinterfragen' },
				{ text: 'Strength', correct: false, explanation: 'Strength vermeidet es, Schwaeche oder Unsicherheit zu zeigen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance fragt nach Zugehoerigkeit, nicht nach Leistungsbeurteilung' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ich hoffe wirklich, dass das so passt. Ich habe mir solche Muehe gegeben, es richtig zu machen."</em>',
			options: [
				{ text: 'Approval', correct: true, explanation: '"Hoffe dass das passt" und "richtig zu machen" zeigen die Abhaengigkeit von externer Bestaetigung' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde die Muehe als Leiden darstellen und Mitleid erwarten' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde die Qualitaet der Arbeit analysieren, nicht hoffen' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde den eigenen Beitrag hervorheben, nicht auf Bestaetigung warten' }
			]
		},

		// === Textbasierte Need-Erkennung: Acceptance ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Wir sollten das gemeinsam entscheiden. Ich will hier nicht alleine vorpreschen."</em>',
			options: [
				{ text: 'Acceptance', correct: true, explanation: '"Wir" und "gemeinsam" sind Wir-Sprache - typisch fuer Acceptance Need. "Nicht alleine vorpreschen" zeigt Vermeidung von Herausragen' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fuer eigene Entscheidung fragen' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde gerne die Fuehrung uebernehmen' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde unabhaengig entscheiden wollen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ich will hier keinen Aerger machen. Passt das so fuer alle?"</em>',
			options: [
				{ text: 'Acceptance', correct: true, explanation: '"Keinen Aerger machen" zeigt Vermeidung von Konflikt, "fuer alle" betont Gruppenharmonie - beides Acceptance-Indikatoren' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde eigene Schwierigkeiten betonen' },
				{ text: 'Approval', correct: false, explanation: 'Approval fragt nach Richtigkeit, nicht nach Gruppenharmonie' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde logische Argumente vorbringen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Wir als Team haben das geschafft. Ich bin froh, Teil dieser Gruppe zu sein."</em>',
			options: [
				{ text: 'Acceptance', correct: true, explanation: '"Wir als Team" und "Teil dieser Gruppe" zeigen starke Zugehoerigkeitsorientierung' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde den eigenen Beitrag hervorheben, nicht das Team' },
				{ text: 'Strength', correct: false, explanation: 'Strength betont Unabhaengigkeit, nicht Teamzugehoerigkeit' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht Bestaetigung, nicht Gruppenzugehoerigkeit' }
			]
		},

		// === Textbasierte Need-Erkennung: Intelligence ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Logisch betrachtet muesste man das anders angehen. Wenn man die Fakten analysiert, ist die Schlussfolgerung eindeutig."</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: '"Logisch betrachtet", "Fakten analysiert" und "Schlussfolgerung" zeigen strukturiertes, analytisches Denken - typisch fuer Intelligence Need' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde fragen, ob die Analyse richtig ist' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die eigene Wirkung betonen, nicht die Logik' },
				{ text: 'Strength', correct: false, explanation: 'Strength kommuniziert kurz und handlungsorientiert, nicht analytisch' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Eigentlich ist das ganz einfach, wenn man es richtig versteht. Lass mich das mal erklaeren."</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: '"Richtig verstehen" und "erklaeren" sind klassische Intelligence-Indikatoren - Verstehen und Erklaeren ist ihre Ancestral Superpower' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die eigene Besonderheit betonen, nicht erklaeren wollen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Gemeinsamkeiten suchen, nicht belehren' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fragen, nicht selbst erklaeren' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Die Daten zeigen eindeutig, dass wir hier einen anderen Ansatz brauchen. Ich habe das ausfuehrlich recherchiert."</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: '"Daten zeigen", "eindeutig" und "ausfuehrlich recherchiert" demonstrieren kognitiven Wert und intellektuelle Gruendlichkeit' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde kurz und handlungsorientiert kommunizieren' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde Schwierigkeiten bei der Recherche betonen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Gruppenentscheidung betonen, nicht eigene Recherche' }
			]
		},

		// === Textbasierte Need-Erkennung: Strength ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Das schaffe ich schon alleine. Ich brauche da keine Hilfe."</em>',
			options: [
				{ text: 'Strength', correct: true, explanation: '"Alleine" und "keine Hilfe brauchen" zeigen Unabhaengigkeit und Selbststaendigkeit - Kernmerkmale des Strength Needs' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die Einzigartigkeit betonen, nicht die Unabhaengigkeit' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde erlaeutern, wie es geloest wird' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fragen, nicht Hilfe ablehnen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ich halte das durch, egal wie schwer es wird. Aufgeben ist keine Option."</em>',
			options: [
				{ text: 'Strength', correct: true, explanation: '"Durchhalten" und "Aufgeben keine Option" zeigen Grit (Durchhaltevermoegen) und Resilience - zentrale Strength-Werte' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde die Schwere betonen und Mitgefuehl erwarten' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die Bedeutung der Aufgabe betonen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Unterstuetzung der Gruppe suchen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Respektier meine Entscheidung. Ich weiss, was ich tue."</em>',
			options: [
				{ text: 'Strength', correct: true, explanation: '"Respektier" und "Ich weiss was ich tue" zeigen das Streben nach Respekt und Kontrolle - zentrale Strength-Werte' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde fragen, ob die Entscheidung richtig ist' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde die Entscheidung logisch begruenden' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die Wichtigkeit der Entscheidung betonen' }
			]
		},

		// === Textbasierte Need-Erkennung: Pity ===
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Du glaubst nicht, was mir schon wieder passiert ist. Ich habe so ein Pech in letzter Zeit."</em>',
			options: [
				{ text: 'Pity', correct: true, explanation: '"Du glaubst nicht" signalisiert die Angst, nicht geglaubt zu werden. "So ein Pech" betont das eigene Leiden - beides Pity-Indikatoren' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Gruppenzugehoerigkeit betonen, nicht eigenes Pech' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde niemals Pech oder Schwaeche eingestehen' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde Erfolge teilen, nicht Misserfolge' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Keiner versteht, was ich durchmachen muss. Es ist wirklich hart fuer mich gerade."</em>',
			options: [
				{ text: 'Pity', correct: true, explanation: '"Keiner versteht" und "was ich durchmachen muss" zeigen die Suche nach Anerkennung des Leidens und Empathie' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht Bestaetigung fuer Handlungen, nicht Mitgefuehl' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde die Situation analysieren, nicht beklagen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde sich der Gruppe anpassen, nicht klagen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need zeigt folgende Aussage? <em>"Ich habe es so schwer gehabt in meinem Leben. Du kannst dir das gar nicht vorstellen."</em>',
			options: [
				{ text: 'Pity', correct: true, explanation: '"So schwer gehabt" und "kannst dir das nicht vorstellen" zeigen Identity built on adversity und die Suche nach Validierung des Leidens' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde Schwierigkeiten nicht betonen, sondern ueberwindung' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde Erfolge trotz Schwierigkeiten betonen' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht Bestaetigung fuer Richtigkeit, nicht Mitgefuehl' }
			]
		},

		// === Hidden Fears ===
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Significance Need</strong>?',
			options: [
				{ text: 'Feeling small (Sich klein fuehlen)', correct: true, explanation: 'Die Angst, unbedeutend zu sein - das Gegenteil von Bedeutsamkeit' },
				{ text: 'Being ignored (Ignoriert werden)', correct: true, explanation: 'Die Angst, nicht wahrgenommen zu werden' },
				{ text: 'Dismissal (Abweisung)', correct: false, explanation: 'Das ist eine Hidden Fear des Approval Needs' },
				{ text: 'Peer mismatch (Nicht zur Gruppe passen)', correct: false, explanation: 'Das ist eine Hidden Fear des Acceptance Needs' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Approval Need</strong>?',
			options: [
				{ text: 'Disapproval (Missbilligung)', correct: true, explanation: 'Die Angst vor negativem Feedback' },
				{ text: 'Contempt (Verachtung)', correct: true, explanation: 'Die Angst, verachtet zu werden' },
				{ text: 'Being "punked" (Ueberrumpelt werden)', correct: false, explanation: 'Das ist eine Hidden Fear des Strength Needs' },
				{ text: 'Being seen as dumb (Als dumm angesehen werden)', correct: false, explanation: 'Das ist eine Hidden Fear des Intelligence Needs' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Acceptance Need</strong>?',
			options: [
				{ text: 'Social criticism (Soziale Kritik)', correct: true, explanation: 'Die Angst, von der Gruppe kritisiert zu werden' },
				{ text: 'Gossip (Klatsch)', correct: true, explanation: 'Die Angst, dass hinter dem Ruecken ueber einen geredet wird' },
				{ text: 'Abandonment (Verlassenwerden)', correct: false, explanation: 'Das ist eine Hidden Fear des Significance Needs' },
				{ text: 'Being questioned (Hinterfragt werden)', correct: false, explanation: 'Das ist eine Hidden Fear des Intelligence Needs' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Intelligence Need</strong>?',
			options: [
				{ text: 'Being seen as dumb (Als dumm angesehen werden)', correct: true, explanation: 'Die Angst, nicht intelligent zu wirken' },
				{ text: 'Being "called out" (Blosgestellt werden)', correct: true, explanation: 'Die Angst, oeffentlich korrigiert zu werden' },
				{ text: 'Disrespected (Respektlos behandelt werden)', correct: false, explanation: 'Das ist eine Hidden Fear des Strength Needs' },
				{ text: 'Being disbelieved (Nicht geglaubt werden)', correct: false, explanation: 'Das ist die zentrale Hidden Fear des Pity Needs' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Strength Need</strong>?',
			options: [
				{ text: 'Being "punked" (Ueberrumpelt werden)', correct: true, explanation: 'Die Angst, oeffentlich blamiert oder hereingelegt zu werden' },
				{ text: 'Challenged (Herausgefordert werden)', correct: true, explanation: 'Die Angst vor Konfrontationen, die die eigene Dominanz bedrohen' },
				{ text: 'Feeling left out (Ausgeschlossen fuehlen)', correct: false, explanation: 'Das ist eine Hidden Fear des Approval Needs' },
				{ text: 'Social ridicule (Soziale Laecherlichkeit)', correct: false, explanation: 'Das ist eine Hidden Fear des Significance Needs' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>Hidden Fears</strong> gehoeren zum <strong>Pity Need</strong>?',
			options: [
				{ text: 'Being disbelieved (Nicht geglaubt werden)', correct: true, explanation: 'Die zentrale Angst, dass das eigene Leid bezweifelt wird' },
				{ text: 'Being misunderstood (Missverstanden werden)', correct: true, explanation: 'Die Angst, dass andere die Situation nicht begreifen' },
				{ text: 'Unacknowledged (Nicht anerkannt werden)', correct: false, explanation: 'Das ist eine Hidden Fear des Strength Needs' },
				{ text: 'Peer mismatch (Nicht zur Gruppe passen)', correct: false, explanation: 'Das ist eine Hidden Fear des Acceptance Needs' }
			]
		},
		{
			type: 'matching',
			question: 'Ordne die <strong>Hidden Fears</strong> dem richtigen <strong>Need</strong> zu:',
			pairs: [
				{ left: 'Significance', right: 'Feeling small' },
				{ left: 'Approval', right: 'Disapproval' },
				{ left: 'Acceptance', right: 'Gossip' },
				{ left: 'Intelligence', right: 'Being seen as dumb' },
				{ left: 'Strength', right: 'Being "punked"' },
				{ left: 'Pity', right: 'Being disbelieved' }
			]
		},
		{
			type: 'matching',
			question: 'Ordne die <strong>deutschen Uebersetzungen</strong> den <strong>englischen Hidden Fears</strong> zu:',
			pairs: [
				{ left: 'Abandonment', right: 'Verlassenwerden' },
				{ left: 'Contempt', right: 'Verachtung' },
				{ left: 'Peer mismatch', right: 'Nicht zur Gruppe passen' },
				{ left: 'Being "called out"', right: 'Blosgestellt werden' },
				{ left: 'Disrespected', right: 'Respektlos behandelt werden' }
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>Hidden Fears</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Significance Need',
					items: ['Abandonment (Verlassenwerden)', 'Social ridicule (Soziale Laecherlichkeit)', 'Being ignored (Ignoriert werden)']
				},
				{
					name: 'Approval Need',
					items: ['Dismissal (Abweisung)', 'Disapproval (Missbilligung)', 'Feeling left out (Ausgeschlossen fuehlen)']
				}
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>Hidden Fears</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Intelligence Need',
					items: ['Being seen as dumb (Als dumm gelten)', 'Being questioned (Hinterfragt werden)', 'Being "called out" (Blosgestellt werden)']
				},
				{
					name: 'Strength Need',
					items: ['Being "punked" (Ueberrumpelt werden)', 'Disrespected (Respektlos behandelt)', 'Challenged (Herausgefordert werden)']
				}
			]
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Hidden Fears sind bewusste Aengste, die Menschen aktiv wahrnehmen und steuern koennen.',
			correct: false,
			explanation: 'Falsch - Hidden Fears sind oft unbewusst und treiben das Verhalten staerker an, als den Betroffenen klar ist.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Die zentrale Hidden Fear des Pity Needs ist die Angst, dass andere nicht glauben.',
			correct: true,
			explanation: 'Diese Angst fuehrt zu wiederholtem Erzaehlen von Leidensgeschichten und Eskalation der Darstellung.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'In Ueberzeugungssituationen sollte man Hidden Fears einer Person aktivieren, um sie zu manipulieren.',
			correct: false,
			explanation: 'Hughes empfiehlt: Vermeide es, diese Aengste zu aktivieren - oder nutze sie nur strategisch und ethisch.'
		},

		// === Aeussere Indikatoren (6MX) ===
		{
			type: 'multiple-choice',
			question: 'Welche <strong>aeusseren Indikatoren</strong> zeigen Menschen mit <strong>Strength Need</strong> laut 6MX?',
			options: [
				{ text: 'Offensichtliche Zurschaustellung von Muskulatur', correct: true, explanation: 'Koerperliche Staerke wird sichtbar gemacht' },
				{ text: 'Kampfmarken wie Tap Out', correct: true, explanation: 'Symbole fuer Kampfsport und Staerke' },
				{ text: 'Universitaets-Shirts und College-Ringe', correct: false, explanation: 'Das sind Indikatoren fuer Intelligence Need' },
				{ text: 'Mitgliedschafts-Shirts von Gruppen', correct: false, explanation: 'Das sind Indikatoren fuer Acceptance Need' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>aeusseren Indikatoren</strong> zeigen Menschen mit <strong>Intelligence Need</strong> laut 6MX?',
			options: [
				{ text: 'Shirts mit Universitaets-Logo', correct: true, explanation: 'Zeigt intellektuelle Zugehoerigkeit' },
				{ text: 'Absichtlich erhoehter Wortschatz', correct: true, explanation: 'Demonstriert sprachliche Kompetenz' },
				{ text: 'Viele Tattoos mit Geschichten', correct: false, explanation: 'Das ist ein Indikator fuer Pity Need' },
				{ text: 'Formellere Kleidung als noetig', correct: false, explanation: 'Das ist ein Indikator fuer Approval Need' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>aeusseren Indikatoren</strong> zeigen Menschen mit <strong>Acceptance Need</strong> laut 6MX?',
			options: [
				{ text: 'Shirts, die Mitgliedschaft in Gruppen anzeigen', correct: true, explanation: 'Signalisiert Zugehoerigkeit' },
				{ text: 'Aendern ihr Erscheinungsbild, um der Umgebung zu gefallen', correct: true, explanation: 'Passen sich an, um dazuzugehoeren' },
				{ text: 'Grosse Hunde aggressiver Rassen', correct: false, explanation: 'Das ist ein Indikator fuer Strength Need' },
				{ text: 'Gebeugte Haltung und Stressreaktionen', correct: false, explanation: 'Das sind Indikatoren fuer Pity Need' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>aeusseren Indikatoren</strong> zeigen Menschen mit <strong>Approval Need</strong> laut 6MX?',
			options: [
				{ text: 'Formellere Kleidung oder "einen Tick besser" als die Umgebung', correct: true, explanation: 'Moechten positiv wahrgenommen werden' },
				{ text: 'Selbstironisch, um zu hoeren, dass sie falsch liegen', correct: true, explanation: 'Suchen Bestaetigung durch Widerspruch' },
				{ text: 'Heavy Metal oder Death Metal hoeren', correct: false, explanation: 'Das ist ein Indikator fuer Strength Need' },
				{ text: 'College-Ringe nach dem Alter von 25', correct: false, explanation: 'Das ist ein Indikator fuer Intelligence Need' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welche <strong>aeusseren Indikatoren</strong> zeigen Menschen mit <strong>Pity Need</strong> laut 6MX?',
			options: [
				{ text: 'Typischerweise ungesundes Erscheinungsbild', correct: true, explanation: 'Leid spiegelt sich im Aeusseren wider' },
				{ text: 'Viele Tattoos ("Ich habe eine Geschichte zu erzaehlen")', correct: true, explanation: 'Markierungen des erlebten Leids' },
				{ text: 'Erwidert alle Augenbrauen-Flashs', correct: false, explanation: 'Das ist ein Indikator fuer Acceptance Need' },
				{ text: 'Steifheit im Auftreten', correct: false, explanation: 'Das ist ein Indikator fuer Approval Need' }
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>aeusseren Indikatoren</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Strength Need',
					items: ['Grosse Hunde aggressiver Rassen', 'Absichtliche Lautstaerke', 'Vermeidet Blickkontakt bei normalen Aktivitaeten']
				},
				{
					name: 'Pity Need',
					items: ['Gebeugte Haltung', 'Sichtbare Reaktion auf kleinsten Schmerz', 'Tattoos mit gebrochenen Herzen']
				}
			]
		},
		{
			type: 'categorization',
			question: 'Ordne die <strong>aeusseren Indikatoren</strong> dem richtigen <strong>Need</strong> zu:',
			categories: [
				{
					name: 'Intelligence Need',
					items: ['Fliegen tragen', 'College-Ringe nach 25', 'Fragen, ob man Dinge weiss, die man nicht weiss']
				},
				{
					name: 'Acceptance Need',
					items: ['Kleinere Hunde als Haustiere', 'Starkes Gemeinschaftsgefuehl', 'Gehen anderen auf der Strasse aus dem Weg']
				}
			]
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Menschen mit Strength Need hoeren laut Hughes oft Heavy Metal oder Death Metal.',
			correct: true,
			explanation: 'Musikgeschmack kann ein aeusserer Indikator fuer das Staerke-Beduerfnis sein.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Menschen mit Acceptance Need haben laut 6MX typischerweise grosse aggressive Hunde.',
			correct: false,
			explanation: 'Falsch - Acceptance-orientierte Menschen haben eher kleinere Hunde. Grosse aggressive Hunde sind typisch fuer Strength Need.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Menschen mit Approval Need sind laut 6MX weniger wahrscheinlich, sich bei Restaurants zu beschweren.',
			correct: true,
			explanation: 'Sie vermeiden Konflikte und moechten positiv wahrgenommen werden.'
		},

		// === 6MX Beispiel-Aussagen ===
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich meine, es ist keine grosse Sache, es waren nur 80.000 Dollar..."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Typische Herunterspielen-Strategie um dennoch Bedeutsamkeit zu zeigen' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fragen' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde die Klugheit der Investition betonen' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde Unabhaengigkeit betonen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Jeder dort muss durch mich gehen, um irgendetwas genehmigt zu bekommen."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Betont die eigene Wichtigkeit und Machtposition' },
				{ text: 'Strength', correct: false, explanation: 'Strength betont Unabhaengigkeit, nicht Machtposition' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde Expertise betonen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde Gruppenzugehoerigkeit betonen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich weiss nicht, ob ich die Praesentation heute schaffe; ich bin schlecht im oeffentlichen Reden."</em>',
			options: [
				{ text: 'Approval', correct: true, explanation: 'Selbstironische Aussage, die nach Widerspruch und Bestaetigung sucht' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde das Leiden staerker betonen' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde nie Inkompetenz zugeben' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde nie Schwaeche zeigen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Meine Freunde bombardieren mein Handy, non-stop."</em>',
			options: [
				{ text: 'Acceptance', correct: true, explanation: 'Betont soziale Beliebtheit und Zugehoerigkeit' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde eigene Leistung betonen' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht spezifische Bestaetigung' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde ueber Probleme klagen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Diese Microchips sind ziemlich einfach, wirklich, keine grosse Sache."</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: 'Herunterspielen von Komplexitaet zeigt intellektuelle Ueberlegenheit' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde den eigenen Beitrag hervorheben' },
				{ text: 'Strength', correct: false, explanation: 'Strength fokussiert auf Belastbarkeit' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach Bestaetigung fragen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Wie zum Teufel koennen diese Idioten das Sagen haben?"</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: 'Verwendung von "Idioten" zeigt intellektuelle Abgrenzung' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde Kontrolle fordern, nicht Dummheit kritisieren' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde eigene Bedeutung hervorheben' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde ueber eigenes Leiden klagen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich habe meiner Frau gesagt, sie soll die Klappe halten, bis wir von der Autobahn runter sind."</em>',
			options: [
				{ text: 'Strength', correct: true, explanation: 'Zeigt Kontrolle und Dominanz in der Beziehung' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence betont Wissen, nicht Kontrolle' },
				{ text: 'Significance', correct: false, explanation: 'Significance betont Bedeutsamkeit, nicht Dominanz' },
				{ text: 'Approval', correct: false, explanation: 'Approval vermeidet Konflikte' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich kann nicht glauben, dass ich eine ganze Woche krank war..."</em>',
			options: [
				{ text: 'Pity', correct: true, explanation: 'Betont Leiden und sucht Mitgefuehl' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde Krankheit herunterspielen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance fokussiert auf Gruppenzugehoerigkeit' },
				{ text: 'Approval', correct: false, explanation: 'Approval sucht Bestaetigung fuer Handlungen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich habe nur drei Tage, um das zu erledigen, und es ist ein Wochenprojekt."</em>',
			options: [
				{ text: 'Pity', correct: true, explanation: 'Betont ueberwaeltigende Situation und sucht Verstaendnis' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence wuerde die Loesung analysieren' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde sagen: Ich schaffe das' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die Wichtigkeit des Projekts betonen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich trage normalerweise keine Billigmarken."</em>',
			options: [
				{ text: 'Significance', correct: true, explanation: 'Betont Besonderheit und Abgrenzung von der Masse' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde fragen, ob die Kleidung passend ist' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde sich an die Gruppe anpassen' },
				{ text: 'Intelligence', correct: false, explanation: 'Intelligence fokussiert auf Wissen, nicht Status' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich schaffe es nicht; ich habe tatsaechlich ein Motorrad-Treffen in Orlando an dem Wochenende."</em>',
			options: [
				{ text: 'Acceptance', correct: true, explanation: 'Betont Gruppenmitgliedschaft (Motorrad-Community)' },
				{ text: 'Strength', correct: false, explanation: 'Strength wuerde die eigene Entscheidung betonen' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die eigene Wichtigkeit hervorheben' },
				{ text: 'Pity', correct: false, explanation: 'Pity wuerde ueber die Belastung klagen' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Welches Need verraet diese Aussage aus dem 6MX-Buch? <em>"Ich habe tatsaechlich viele Buecher darueber gelesen. Was du tun musst, ist..."</em>',
			options: [
				{ text: 'Intelligence', correct: true, explanation: 'Demonstriert Wissen und uebernimmt Erklaerer-Rolle' },
				{ text: 'Approval', correct: false, explanation: 'Approval wuerde nach der Richtigkeit fragen' },
				{ text: 'Acceptance', correct: false, explanation: 'Acceptance wuerde die Gruppe einbeziehen' },
				{ text: 'Significance', correct: false, explanation: 'Significance wuerde die eigene Wirkung betonen' }
			]
		},

		// === Neuropeptide und Biochemie ===
		{
			type: 'text',
			question: 'Was sind <strong>Neuropeptide</strong> laut Chase Hughes?',
			answer: [
				'kurze aminosaeureketten',
				'aminosäureketten',
				'aminosaeureketten',
				'kleine verdrehte bueroklammern aus protein',
				'proteine'
			]
		},
		{
			type: 'text',
			question: 'Wie lautet das <strong>fuenfte Gesetz</strong> des menschlichen Verhaltens (The Laws of Human Behavior)?',
			answer: [
				'everyone is a drug addict',
				'jeder mensch ist ein drogensuechtiger',
				'jeder ist ein drogensuechtiger',
				'jeder mensch ist ein drogensuchtiger'
			]
		},
		{
			type: 'multiple-choice',
			question: 'Wie beschreibt Hughes die <strong>Rezeptorstellen</strong> unserer Zellen?',
			options: [
				{ text: 'Wie Andockstationen an einem Raumschiff', correct: true, explanation: 'Rezeptoren koennen nur spezifische Neuropeptide empfangen' },
				{ text: 'Wie offene Tueren fuer alle Chemikalien', correct: false, explanation: 'Falsch - Rezeptoren sind spezifisch' },
				{ text: 'Wie zufaellige Verbindungen', correct: false, explanation: 'Falsch - Rezeptoren folgen einem spezifischen Muster' },
				{ text: 'Wie universelle Stecker', correct: false, explanation: 'Falsch - jeder Rezeptor akzeptiert nur bestimmte Neuropeptide' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Was passiert laut Hughes mit unbenutzten <strong>Rezeptorstellen</strong>?',
			options: [
				{ text: 'Sie bauen sich zu dem Rezeptortyp um, der am meisten genutzt wird', correct: true, explanation: 'Die Zellen "sehen, wo die Action ist" und passen sich an' },
				{ text: 'Sie bleiben unveraendert', correct: false, explanation: 'Falsch - Rezeptoren veraendern sich durch Nutzung' },
				{ text: 'Sie sterben ab', correct: false, explanation: 'Falsch - sie transformieren sich' },
				{ text: 'Sie werden deaktiviert', correct: false, explanation: 'Falsch - sie bauen sich um' }
			]
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Ein Strength-Neuropeptid kann an einem Pity-Rezeptor andocken.',
			correct: false,
			explanation: 'Falsch - Rezeptoren koennen nur spezifische Neuropeptide empfangen. Das ist wie bei Andockstationen.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Die menschlichen Needs operieren auf die gleiche Weise wie Drogensucht - als chemische Abhaengigkeit.',
			correct: true,
			explanation: 'Hughes beschreibt Needs als biochemische Abhaengigkeit, bei der die Zellen nach bestimmten Neuropeptiden "schreien".'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Wenn der Koerper seine Need-Dosis nicht bekommt, schreien die Zellen das Gehirn an, etwas zu unternehmen.',
			correct: true,
			explanation: 'Die Zellen fordern das Gehirn auf: "Mach, dass etwas passiert, um diese Chemikalien freizusetzen!"'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Rezeptorstellen vermehren sich, um mehr von dem zu empfangen, was die Person staendig sucht.',
			correct: true,
			explanation: 'Je haeufiger ein Need befriedigt wird, desto mehr Rezeptoren entstehen dafuer - wie bei jeder Sucht.'
		},
		{
			type: 'multiple-choice',
			question: 'Warum erklaert das Neuropeptid-Modell, warum Verhaltensaenderung so schwierig ist?',
			options: [
				{ text: 'Weil der Koerper physisch von bestimmten Chemikalien abhaengig geworden ist', correct: true, explanation: 'Die Zellen haben sich auf bestimmte Neuropeptide spezialisiert' },
				{ text: 'Weil Menschen nicht wollen', correct: false, explanation: 'Es geht um biochemische, nicht willentliche Prozesse' },
				{ text: 'Weil das Gehirn sich nicht veraendern kann', correct: false, explanation: 'Das Gehirn ist plastisch, aber die Umstellung dauert' },
				{ text: 'Weil Needs angeboren sind', correct: false, explanation: 'Needs entstehen aus Kindheitserfahrungen, nicht aus Genetik' }
			]
		},

		// === Erweiterte Strategien ===
		{
			type: 'text',
			question: 'Wie heisst die eleganteste Strategie beim Umgang mit dem <strong>Pity Need</strong>?',
			answer: [
				'compliment + redirect',
				'compliment plus redirect',
				'kompliment und umlenken',
				'kompliment + redirect'
			]
		},
		{
			type: 'text',
			question: 'Wie wird das Problem genannt, wenn Menschen mit Pity Need immer mehr Empathie fordern?',
			answer: [
				'endless pit',
				'fass ohne boden',
				'endloses fass',
				'endless pit problem'
			]
		},
		{
			type: 'multiple-choice',
			question: 'Wie funktioniert die <strong>Compliment + Redirect</strong> Strategie?',
			options: [
				{ text: 'Leiden anerkennen, dann sanft zu etwas Positivem umlenken', correct: true, explanation: 'Das Need wird kurz befriedigt, dann wird die Energie umgelenkt' },
				{ text: 'Sofort Loesungen anbieten', correct: false, explanation: 'Wird oft als Ablehnung wahrgenommen' },
				{ text: 'Das eigene Leid dagegenstellen', correct: false, explanation: 'Fuehrt zu Wettbewerb um Mitleid' },
				{ text: 'Die Person ignorieren', correct: false, explanation: 'Verstaerkt die Angst, nicht geglaubt zu werden' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Was ist die <strong>Dichotomie des Strength Need</strong> laut Hughes?',
			options: [
				{ text: 'High-End: Fuehrungspersoenlichkeiten / Low-End: Ueberpositionierung', correct: true, explanation: 'High-End strebt nach Fuehrung, Low-End kompensiert durch Dominanzverhalten' },
				{ text: 'Stark und Schwach', correct: false, explanation: 'Zu vereinfacht - es geht um verschiedene Auspraegungen' },
				{ text: 'Aktiv und Passiv', correct: false, explanation: 'Nicht die Dichotomie, die Hughes beschreibt' },
				{ text: 'Gesund und Ungesund', correct: false, explanation: 'Hughes spricht von High-End und Low-End' }
			]
		},
		{
			type: 'multiple-choice',
			question: 'Wie sollten <strong>Needs Compliments</strong> laut Hughes dosiert werden?',
			options: [
				{ text: 'Wie Gewuerz - sparsam und gezielt', correct: true, explanation: 'Nicht zu viel (abstumpfend) und nicht zu wenig (keine Verbindung)' },
				{ text: 'So oft wie moeglich', correct: false, explanation: 'Zu haeufig macht die Person abgestumpft' },
				{ text: 'Nur einmal pro Gespraech', correct: false, explanation: 'Die richtige Balance ist individuell' },
				{ text: 'Nur am Anfang eines Gespraechs', correct: false, explanation: 'Timing nach Beobachtung ist wichtig' }
			]
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Bei zu haeufigem Gebrauch von Needs Compliments stoppt das Gespraech, weil das Need "befriedigt" scheint.',
			correct: true,
			explanation: 'Die Person ist zufrieden und hat keinen Antrieb mehr, das Gespraech fortzusetzen.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Das Low-End des Strength Needs zeigt sich typischerweise bei Menschen, die gemobbt wurden.',
			correct: true,
			explanation: 'Sie ueberpositionieren, sprechen lauter als noetig und zeigen anderen ihre Macht.'
		},
		{
			type: 'true-false',
			question: 'Wahr oder Falsch?',
			statement: 'Der schnellste Weg zu Rapport bei Pity Need ist, sofort Loesungen anzubieten.',
			correct: false,
			explanation: 'Falsch - der schnellste Weg ist die Bestaetigung der Schwere ihrer Situation, gefolgt von einer kurzen Pause.'
		}
	]
};
