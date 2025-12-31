# R00007: Tastaturkürzel

## Beschreibung

Implementierung von Tastaturkürzeln für effizientes Arbeiten.

## Akzeptanzkriterien

- [x] Enter oder Strg+Enter sendet die Antwort ab
- [x] Tasten 1-9 wählen/deselektieren Multiple-Choice-Optionen
- [x] Tab fügt 4 Leerzeichen in Textfelder ein (statt Fokus-Wechsel)
- [x] Tastaturkürzel funktionieren nur während eines aktiven Trainings
- [x] Tastaturkürzel sind dokumentiert / für Benutzer sichtbar

## Status

- [x] Abgeschlossen

## Technische Details

### Event Handler

```typescript
function handleKeydown(event: KeyboardEvent) {
  // Enter / Ctrl+Enter - Antwort absenden
  if (event.key === 'Enter' && (event.ctrlKey || event.target instanceof HTMLTextAreaElement === false)) {
    submitAnswer();
    event.preventDefault();
  }

  // 1-9 - MC-Optionen
  if (event.key >= '1' && event.key <= '9') {
    const index = parseInt(event.key) - 1;
    toggleOption(index);
    event.preventDefault();
  }

  // Tab - 4 Leerzeichen einfügen
  if (event.key === 'Tab' && event.target instanceof HTMLTextAreaElement) {
    insertSpaces(event.target, 4);
    event.preventDefault();
  }
}
```

## Notizen

Die Tastaturkürzel sollten auch auf deutschen Tastaturen funktionieren.
