# R00012: Needs Training mit Linguistic Indicators

## Beschreibung

Erweiterung des bestehenden Needs-Map Trainings um Linguistic Indicators - sprachliche Erkennungsmerkmale fuer die sechs primaeren Needs. Zusaetzlich werden neue Fragen mit kurzen Textabschnitten hinzugefuegt, in denen der Nutzer den zugrundeliegenden Need anhand der verwendeten Sprache erkennen soll.

## Akzeptanzkriterien

### Linguistic Indicators Theorie
- [ ] Fragen zu typischen Sprachmustern pro Need (Woerter, Phrasen, Tonalitaet)
- [ ] Fragen zur Identifikation von Need-spezifischen Schluesselwoertern
- [ ] Multiple-Choice-Fragen zur Zuordnung von Phrasen zu Needs

### Textbasierte Need-Erkennung
- [ ] Kurze Textabschnitte (2-4 Saetze) mit erkennbarem Need
- [ ] Multiple-Choice-Fragen: "Welches Need zeigt diese Aussage?"
- [ ] Mindestens 3 Beispieltexte pro Need (18 Texte gesamt)
- [ ] Erklaerungen bei jeder Frage, welche sprachlichen Merkmale auf das Need hinweisen

### Beispielkategorien
- [ ] Significance: Sprache ueber Einzigartigkeit, Wirkung, Unterschied machen
- [ ] Approval: Suche nach Bestaetigung, Fragen ob etwas richtig ist
- [ ] Acceptance: Wir-Sprache, Gruppenorientierung, Anpassung
- [ ] Intelligence: Strukturierte Sprache, Details, Erklaerungen
- [ ] Strength: Kurze Aussagen, Kontrolle, Unabhaengigkeit
- [ ] Pity: Leidensorientierte Sprache, Schwierigkeiten betonen

## Status

- [ ] Offen

## Technische Details

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/data/trainings/` | Erweiterung des needs-map.ts |

### Zu aendernde Dateien

| Datei | Aenderung |
|-------|----------|
| `src/lib/data/trainings/needs-map.ts` | Neue Fragen zu Linguistic Indicators und Textbeispiele hinzufuegen |

### Fragenstruktur

Die Textbeispiel-Fragen verwenden den bestehenden `MultipleChoiceQuestion`-Typ:

```typescript
{
  type: 'multiple-choice',
  question: 'Welches Need zeigt folgende Aussage? <em>"Ich habe das Projekt quasi im Alleingang gerettet. Ohne mich waere das nie fertig geworden."</em>',
  options: [
    { text: 'Significance', correct: true, explanation: 'Typische Significance-Sprache: Betonung der eigenen Wirkung und Einzigartigkeit' },
    { text: 'Approval', correct: false, explanation: 'Approval wuerde eher fragen, ob es richtig gemacht wurde' },
    { text: 'Strength', correct: false, explanation: 'Strength betont Durchhalten, nicht Einzigartigkeit' },
    { text: 'Intelligence', correct: false, explanation: 'Intelligence betont analytische Faehigkeiten' }
  ]
}
```

### Beispieltexte pro Need

| Need | Beispielphrasen/Indikatoren |
|------|----------------------------|
| Significance | "Ohne mich...", "Ich habe den Unterschied gemacht", "Das war mein Beitrag" |
| Approval | "Ist das so richtig?", "Hab ich das gut gemacht?", "Ich hoffe, das passt" |
| Acceptance | "Wir alle...", "Ich will keinen Aerger machen", "Passt das fuer euch?" |
| Intelligence | "Logisch gesehen...", "Die Analyse zeigt...", "Eigentlich muesste man..." |
| Strength | "Ich brauche keine Hilfe", "Das schaffe ich alleine", "Respektier meine Entscheidung" |
| Pity | "Du glaubst nicht, was mir passiert ist", "Ich hatte es so schwer", "Keiner versteht..." |

## Abhaengigkeiten

- Abhaengig von: Bestehendes Needs-Map Training (`src/lib/data/trainings/needs-map.ts`)
- Blockiert: -

## Notizen

- Die Linguistic Indicators basieren auf dem NCI Graduate School Material (Chase Hughes)
- Die Textbeispiele sollten realistisch und im Alltag erkennbar sein
- Fokus auf praktische Anwendung: "Hoeren" der Needs in echten Gespraechen
