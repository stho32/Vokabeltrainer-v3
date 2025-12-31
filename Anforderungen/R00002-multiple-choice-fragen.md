# R00002: Multiple-Choice-Fragen

## Beschreibung

Implementierung von Multiple-Choice-Fragen mit Checkboxen und Mehrfachauswahl.

## Akzeptanzkriterien

- [x] Mehrere Optionen werden als Checkboxen angezeigt
- [x] Mehrfachauswahl ist möglich
- [x] Optionen können Begründungen enthalten (richtig/falsch)
- [x] Optionen werden zufällig angeordnet bei jeder Anzeige
- [x] Korrekte Antworten werden nach Auswertung visuell hervorgehoben
- [x] Begründungen werden nach Auswertung angezeigt

## Status

- [x] Abgeschlossen

## Technische Details

### Datenstruktur

```typescript
interface MultipleChoiceOption {
  text: string;
  correct: boolean;
  explanation?: string;  // Begründung warum richtig/falsch
}

interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  question: string;
  options: MultipleChoiceOption[];
}
```

### Tastatursteuerung

- Tasten 1-9 wählen/deselektieren die entsprechende Option

## Notizen

Bei der Anzeige der Auswertung sollten richtige Antworten grün und falsche rot markiert werden.
