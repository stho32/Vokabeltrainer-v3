# R00004: Aufgabenpunktesystem (Spaced Repetition)

## Beschreibung

System zur Verfolgung des Lernfortschritts für jede Frage mit Priorisierung schwieriger Fragen.

## Akzeptanzkriterien

### Punktevergabe
- [x] Jede Frage wird durch einen Hash identifiziert
- [x] Punktebereich: -20 bis +10 Punkte
- [x] Richtige Antwort: +1 Punkt
- [x] Falsche Antwort: -5 Punkte
- [x] Initiale Punkte: 0

### Priorisierung
- [x] Fragen mit niedrigerem Punktestand erscheinen häufiger
- [x] Probabilistischer Filter: Gut beherrschte Fragen werden mit höherer Wahrscheinlichkeit übersprungen
- [x] Überspringen basiert auf Punktestand (höherer Score = höhere Überspring-Wahrscheinlichkeit)

### Anzeige
- [x] Aktueller Punktestand wird bei jeder Frage angezeigt (APS = Aufgabenpunkte-Stand)
- [x] Gesamtpunktestand pro Training in der Übersicht

## Status

- [x] Abgeschlossen

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
