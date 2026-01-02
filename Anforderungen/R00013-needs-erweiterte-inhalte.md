# R00013: Needs Training Erweiterung - Hidden Fears, 6MX-Indikatoren und Neuropeptide

## Beschreibung

Erweiterung des bestehenden Needs-Map Trainings um weitere Inhalte aus den NCI/6MX-Quellen: Hidden Fears (verborgene Aengste) pro Need, aeussere Erkennungsindikatoren aus dem 6MX-System, Beispiel-Aussagen zur Identifikation, das Konzept der Neuropeptide und biochemischen Sucht, sowie erweiterte Strategien wie "Compliment + Redirect" fuer das Pity Need.

## Akzeptanzkriterien

### Hidden Fears (Verborgene Aengste)
- [ ] Fragen zu den Hidden Fears pro Need
- [ ] Zuordnungsfragen: Welche Angst gehoert zu welchem Need?
- [ ] Multiple-Choice-Fragen zur Identifikation von Hidden Fears
- [ ] Mindestens 2-3 Fragen pro Need (12-18 Fragen gesamt)

### Aeussere Indikatoren (6MX-System)
- [ ] Fragen zu physischen Erkennungsmerkmalen pro Need
- [ ] Kategorisierungsfragen: Welche Indikatoren gehoeren zu welchem Need?
- [ ] Fragen zu Kleidung, Koerpersprache, Erscheinung
- [ ] Fragen zu Verhaltensmustern und Gewohnheiten

### Beispiel-Aussagen zur Identifikation
- [ ] Textbasierte Fragen: "Welches Need verraet diese Aussage?"
- [ ] Direkte Zitate aus dem 6MX-Material
- [ ] Erklaerungen, welche Sprachmuster auf das Need hinweisen

### Neuropeptide und biochemische Grundlagen
- [ ] Fragen zum Konzept der Neuropeptide
- [ ] Fragen zum Mechanismus der "Needs-Sucht"
- [ ] Fragen zum fuenften Gesetz "Everyone is a drug addict"
- [ ] True/False Fragen zum biochemischen Modell

### Erweiterte Strategien
- [ ] Fragen zur "Compliment + Redirect" Strategie bei Pity Need
- [ ] Fragen zum "Endless Pit" Problem
- [ ] Fragen zur Dichotomie des Strength Needs (High-End/Low-End)
- [ ] Fragen zur Dosierung von Needs Compliments

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
| `src/lib/data/trainings/needs-map.ts` | Neue Fragen zu Hidden Fears, 6MX-Indikatoren, Neuropeptiden und Strategien hinzufuegen |

### Neue Fragentypen und -strukturen

#### Hidden Fears Zuordnung
```typescript
{
  type: 'multiple-choice',
  question: 'Welche <strong>Hidden Fear</strong> gehoert zum <strong>Significance Need</strong>?',
  options: [
    { text: 'Feeling small (Sich klein fuehlen)', correct: true, explanation: 'Die Angst, unbedeutend zu sein' },
    { text: 'Dismissal (Abweisung)', correct: false, explanation: 'Das ist eine Hidden Fear des Approval Needs' },
    // ...
  ]
}
```

#### 6MX Aeussere Indikatoren
```typescript
{
  type: 'categorization',
  question: 'Ordne die <strong>aeusseren Indikatoren</strong> dem richtigen <strong>Need</strong> zu:',
  categories: [
    {
      name: 'Strength Need',
      items: ['Leder und militaerische Kleidung', 'Grosse Hunde aggressiver Rassen', 'Kampfmarken wie Tap Out']
    },
    {
      name: 'Intelligence Need',
      items: ['Shirts mit Universitaets-Logo', 'College-Ringe nach 25', 'Absichtlich erhoehter Wortschatz']
    }
  ]
}
```

#### Neuropeptide Konzept
```typescript
{
  type: 'true-false',
  question: 'Wahr oder Falsch?',
  statement: 'Rezeptoren koennen nur spezifische Neuropeptide empfangen - ein Strength-Neuropeptid kann nicht an einem Pity-Rezeptor andocken.',
  correct: true,
  explanation: 'Rezeptoren sind spezifisch fuer bestimmte Neuropeptide, wie Andockstationen an einem Raumschiff.'
}
```

### Inhaltsstruktur fuer neue Fragen

| Kategorie | Ungefaehre Anzahl Fragen |
|-----------|-------------------------|
| Hidden Fears Zuordnung | 12-15 |
| 6MX Aeussere Indikatoren | 10-15 |
| Beispiel-Aussagen aus 6MX | 12-18 |
| Neuropeptide & Biochemie | 8-10 |
| Strategien (Compliment+Redirect, etc.) | 6-8 |
| **Gesamt** | **48-66 neue Fragen** |

### Hidden Fears pro Need (Quellmaterial)

| Need | Hidden Fears |
|------|-------------|
| Significance | Abandonment, Social ridicule, Being ignored, Feeling small |
| Approval | Dismissal, Disapproval, Contempt, Feeling left out |
| Acceptance | Social criticism, Gossip, Peer mismatch |
| Intelligence | Being seen as dumb, Being questioned, Being "called out" |
| Strength | Being "punked", Disrespected, Unacknowledged, Challenged |
| Pity | Being disregarded, Being ignored, Being misunderstood, Being disbelieved |

### 6MX Aeussere Indikatoren (Quellmaterial)

| Need | Beispiel-Indikatoren |
|------|---------------------|
| Strength | Muskulatur-Zurschaustellung, Kampfmarken, grosse aggressive Hunde, Heavy Metal |
| Intelligence | Universitaets-Shirts, College-Ringe, erhoehter Wortschatz, Fliegen tragen |
| Acceptance | Mitgliedschafts-Shirts, kleinere Hunde, aendert Erscheinung fuer Gruppe |
| Approval | Formellere Kleidung, Steifheit, traegt Medikamente fuer andere, selbstironisch |
| Pity | Ungesundes Erscheinungsbild, gebeugte Haltung, viele Tattoos, sichtbare Stressreaktion |

## Abhaengigkeiten

- Abhaengig von: R00012 (Needs Training mit Linguistic Indicators)
- Blockiert: -

## Notizen

- Das Material stammt primaer aus dem 6MX-System (Six-Minute X-Ray) von Chase Hughes
- Die Hidden Fears sind wichtig fuer das Verstaendnis, welche Trigger bei bestimmten Needs zu vermeiden sind
- Die aeusseren Indikatoren ermoeglichen schnelle Erkennung im Alltag
- Das Neuropeptid-Konzept erklaert die biochemische Grundlage der Need-Dynamik
- "Compliment + Redirect" ist eine praktische Strategie fuer den Umgang mit Pity Need
