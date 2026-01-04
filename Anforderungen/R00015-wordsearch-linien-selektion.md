# R00015: Word Search Linien-Selektion

## Beschreibung

Die Auswahl von Buchstaben im Word Search Rätsel soll durch eine Linien-basierte Selektion verbessert werden. Statt einzelne Zellen beim Überfahren zu markieren, wird eine gerade Linie zwischen Startpunkt (MouseDown) und aktuellem Punkt (MouseMove) berechnet. Die Linie wird automatisch auf die gültigen Richtungen (horizontal, vertikal, diagonal ±45°) eingerastet.

## Akzeptanzkriterien

### Maus-Interaktion
- [x] Bei MouseDown wird der Startpunkt gesetzt und die Auswahl zurückgesetzt
- [x] Bei MouseMove während des Ziehens wird eine Linie vom Start zum aktuellen Punkt berechnet
- [x] Die Linie rastet automatisch auf eine der 8 gültigen Richtungen ein (→ ← ↑ ↓ ↗ ↘ ↙ ↖)
- [x] Bei MouseUp wird die Auswahl finalisiert
- [x] Versehentliches Markieren von Nachbarzellen bei diagonaler Bewegung ist nicht mehr möglich

### Linien-Berechnung
- [x] Die dominante Richtung wird anhand von dx und dy ermittelt
- [x] Horizontal: wenn `|dx| > 2 * |dy|`
- [x] Vertikal: wenn `|dy| > 2 * |dx|`
- [x] Diagonal: in allen anderen Fällen (Richtung basierend auf Vorzeichen von dx/dy)
- [x] Linienlänge entspricht `max(|dx|, |dy|)`
- [x] Alle Zellen auf der berechneten Linie werden ausgewählt

### Tastatur-Unterstützung
- [x] Bestehende Tastatursteuerung (Pfeiltasten + Leertaste) bleibt erhalten
- [ ] Optional: Shift+Pfeiltaste erweitert Selektion in Linienform

### Visuelles Feedback
- [x] Während des Ziehens wird die aktuelle Linien-Auswahl live angezeigt
- [x] Die verbesserte Hervorhebung ausgewählter Zellen (blauer Hintergrund, weiße Schrift) bleibt erhalten

### Touch-Unterstützung
- [x] TouchStart setzt Startpunkt analog zu MouseDown
- [x] TouchMove berechnet Linie analog zu MouseMove
- [x] TouchEnd finalisiert Auswahl analog zu MouseUp

## Status

- [x] Implementiert

## Technische Details

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/components/questions/` | Anpassung der WordSearchView-Komponente |
| `src/lib/utils/` | Optional: Hilfsfunktion für Linienberechnung |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/components/questions/WordSearchView.svelte` | Neue Drag-Logik mit Linienberechnung |

### Vermutete Komponenten/Funktionen

| Komponente/Funktion | Verantwortung |
|---------------------|---------------|
| `calculateLineSelection(start, end)` | Berechnet alle Zellen auf der eingerasteten Linie |
| `getSnappedDirection(dx, dy)` | Ermittelt die dominante Richtung (horizontal/vertikal/diagonal) |
| `handleCellMouseDown` | Startpunkt setzen, Auswahl leeren |
| `handleCellMouseEnter` | Linie vom Start zur aktuellen Zelle berechnen |
| `handleMouseUp` | Auswahl finalisieren |

### Algorithmus-Skizze

```typescript
function getSnappedDirection(dx: number, dy: number): { dRow: number; dCol: number } {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx > 2 * absDy) {
    // Horizontal
    return { dRow: 0, dCol: Math.sign(dx) };
  } else if (absDy > 2 * absDx) {
    // Vertikal
    return { dRow: Math.sign(dy), dCol: 0 };
  } else {
    // Diagonal
    return { dRow: Math.sign(dy), dCol: Math.sign(dx) };
  }
}

function calculateLineSelection(
  startRow: number, startCol: number,
  endRow: number, endCol: number
): Set<string> {
  const dx = endCol - startCol;
  const dy = endRow - startRow;
  const { dRow, dCol } = getSnappedDirection(dx, dy);
  const length = Math.max(Math.abs(dx), Math.abs(dy));

  const cells = new Set<string>();
  for (let i = 0; i <= length; i++) {
    cells.add(`${startRow + i * dRow}-${startCol + i * dCol}`);
  }
  return cells;
}
```

## Abhängigkeiten

- Abhängig von: R00010 (Word Search Fragentyp)

## Notizen

- Die bestehende `toggleCell`-Funktion für Einzelklicks kann beibehalten werden
- Touch-Unterstützung sollte analog zur Maus-Interaktion funktionieren (touchstart, touchmove, touchend)
