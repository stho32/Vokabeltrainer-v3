# R00001: Textfragen

## Beschreibung

Implementierung von Textfragen mit freier Texteingabe und toleranter Antwortprüfung.

## Akzeptanzkriterien

- [ ] Freie Texteingabe über Textarea-Element
- [ ] Tolerante Antwortprüfung ignoriert Groß-/Kleinschreibung
- [ ] Tolerante Antwortprüfung ignoriert führende/abschließende Leerzeichen
- [ ] Mehrfach-Leerzeichen werden auf ein Leerzeichen reduziert
- [ ] Optionale Vorbelegung mit Initialwert möglich
- [ ] HTML-Unterstützung in der Fragestellung
- [ ] Mehrere korrekte Antworten können definiert werden

## Status

- [ ] Nicht begonnen

## Technische Details

### Datenstruktur

```typescript
interface TextQuestion {
  type: 'text';
  question: string;      // Kann HTML enthalten
  answer: string | string[];  // Eine oder mehrere korrekte Antworten
  initialValue?: string; // Optionaler Startwert
}
```

### Antwortprüfung

Die Funktion `checkTextAnswer` normalisiert beide Antworten vor dem Vergleich:
1. Konvertierung zu Kleinbuchstaben
2. Entfernung führender/abschließender Leerzeichen
3. Mehrfach-Leerzeichen zu einzelnem Leerzeichen

## Notizen

Die HTML-Unterstützung sollte sicher implementiert werden (Sanitization beachten).
