# R00004: Aufgabenpunktesystem (Spaced Repetition)

## Beschreibung

System zur Verfolgung des Lernfortschritts für jede Frage mit Priorisierung schwieriger Fragen.

## Akzeptanzkriterien

### Punktevergabe
- [ ] Jede Frage wird durch einen Hash identifiziert
- [ ] Punktebereich: -20 bis +10 Punkte
- [ ] Richtige Antwort: +1 Punkt
- [ ] Falsche Antwort: -5 Punkte
- [ ] Initiale Punkte: 0

### Priorisierung
- [ ] Fragen mit niedrigerem Punktestand erscheinen häufiger
- [ ] Probabilistischer Filter: Gut beherrschte Fragen werden mit höherer Wahrscheinlichkeit übersprungen
- [ ] Überspringen basiert auf Punktestand (höherer Score = höhere Überspring-Wahrscheinlichkeit)

### Anzeige
- [ ] Aktueller Punktestand wird bei jeder Frage angezeigt (APS = Aufgabenpunkte-Stand)
- [ ] Gesamtpunktestand pro Training in der Übersicht

## Status

- [ ] Nicht begonnen

## Technische Details

### Algorithmus für Übersprung-Wahrscheinlichkeit

```typescript
function shouldSkipQuestion(score: number): boolean {
  if (score <= 0) return false;
  const skipProbability = score / MAX_SCORE;  // MAX_SCORE = 10
  return Math.random() < skipProbability;
}
```

### Hash-Generierung

Für die Identifikation wird ein Hash der Fragestellung verwendet.

### Speicherung

Punkte werden im LocalStorage unter `Aufgabenpunkte` als JSON-Objekt gespeichert:
```json
{
  "hash1": 5,
  "hash2": -3,
  ...
}
```
