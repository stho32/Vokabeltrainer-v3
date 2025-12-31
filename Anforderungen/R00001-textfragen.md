# R00001: Textfragen

## Beschreibung

Implementierung von Textfragen mit freier Texteingabe und toleranter Antwortprüfung.

## Akzeptanzkriterien

- [x] Freie Texteingabe über Textarea-Element
- [x] Tolerante Antwortprüfung ignoriert Groß-/Kleinschreibung
- [x] Tolerante Antwortprüfung ignoriert führende/abschließende Leerzeichen
- [x] Mehrfach-Leerzeichen werden auf ein Leerzeichen reduziert
- [x] Optionale Vorbelegung mit Initialwert möglich
- [x] HTML-Unterstützung in der Fragestellung
- [x] Mehrere korrekte Antworten können definiert werden

## Status

- [x] Abgeschlossen

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
