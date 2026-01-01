# R00011: DiceText Drag & Drop

## Beschreibung

Umstellung der DiceText-Fragen von Texteingabe auf Drag & Drop. Der Text wird mit Lücken angezeigt, unter dem Text befindet sich eine Box mit allen korrekten Wörtern sowie einigen Distraktoren (falschen Wörtern). Der Nutzer muss die Wörter per Drag & Drop an die richtigen Stellen im Text ziehen.

## Akzeptanzkriterien

### Darstellung
- [ ] Der Text wird mit Lücken (Platzhaltern) an den Stellen der versteckten Wörter angezeigt
- [ ] Unter dem Text befindet sich eine Wort-Box mit allen verfügbaren Wörtern
- [ ] Die Wort-Box enthält die korrekten Wörter und zusätzliche Distraktoren
- [ ] Die Wörter in der Box sind zufällig angeordnet (nicht in Text-Reihenfolge)
- [ ] Lücken im Text sind visuell klar als Drop-Ziele erkennbar

### Interaktion
- [ ] Wörter können aus der Box per Drag & Drop auf die Lücken gezogen werden
- [ ] Visuelle Rückmeldung beim Ziehen (Drag-Feedback)
- [ ] Visuelle Hervorhebung der gültigen Drop-Ziele während des Ziehens
- [ ] Ein bereits platziertes Wort kann durch Ziehen eines anderen ersetzt werden
- [ ] Ein platziertes Wort kann zurück in die Box gezogen werden
- [ ] Touch-Support für mobile Geräte

### Auswertung
- [ ] Auswertung erfolgt nach dem Submit
- [ ] Korrekt platzierte Wörter werden grün markiert
- [ ] Falsch platzierte Wörter werden rot markiert
- [ ] Bei falschen Antworten wird das korrekte Wort angezeigt
- [ ] Nicht verwendete Wörter bleiben in der Box sichtbar

### Datenstruktur
- [ ] Erweiterung des DiceTextQuestion-Typs um optionales `distractors`-Feld
- [ ] Distraktoren sind ähnliche oder thematisch verwandte Wörter

### Tastaturunterstützung
- [ ] Fokussierbare Wörter in der Box (Tab-Navigation)
- [ ] Fokussierbare Lücken im Text
- [ ] Enter/Space zum Aufnehmen/Ablegen eines Wortes
- [ ] Escape zum Abbrechen einer Aktion

## Status

- [ ] Offen

## Technische Details

### Erweiterte Datenstruktur

```typescript
interface DiceTextQuestion {
  type: 'dice-text';
  question: string;
  text: string;
  hiddenWords: number[];
  distractors?: string[];  // NEU: Optional falsche Wörter zur Erschwerung
}
```

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/components/questions/` | Überarbeitete DiceTextView-Komponente |
| `src/lib/components/` | Wiederverwendbare Drag & Drop Komponenten |
| `src/lib/types/` | Erweiterte Typdefinition |

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/components/DragDropWord.svelte` | Draggable Wort-Element |
| `src/lib/components/DropZone.svelte` | Drop-Ziel für Lücken im Text |
| `src/lib/components/WordBox.svelte` | Container für verfügbare Wörter |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/components/questions/DiceTextView.svelte` | Komplette Umstellung auf Drag & Drop |
| `src/lib/types/index.ts` | Ergänzung des `distractors`-Felds |
| `src/lib/data/trainings/*.ts` | Optional: Distraktoren zu bestehenden Fragen hinzufügen |

### Zu entfernende Dateien

| Datei | Begründung |
|-------|------------|
| `src/lib/components/MaskedEdit.svelte` | Wird nicht mehr benötigt (Texteingabe entfällt) |

### Vermutete Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| `DiceTextView` | Hauptkomponente, orchestriert Drag & Drop State |
| `DragDropWord` | Einzelnes ziehbares Wort mit Drag-Events |
| `DropZone` | Lücke im Text, reagiert auf Drop-Events |
| `WordBox` | Container für nicht-platzierte Wörter |

### State-Management

```typescript
// Interner State in DiceTextView
let placements = $state<Map<number, string>>(new Map());  // slotIndex -> word
let draggedWord = $state<string | null>(null);
let dragSource = $state<'box' | number | null>(null);  // 'box' oder slotIndex
```

### Drag & Drop Implementation

Empfohlener Ansatz: Native HTML5 Drag & Drop API mit `draggable`, `ondragstart`, `ondragover`, `ondrop` Events.

```svelte
<!-- DragDropWord -->
<div
  draggable="true"
  ondragstart={(e) => handleDragStart(e, word)}
  ondragend={handleDragEnd}
  class:dragging={isDragging}
>
  {word}
</div>

<!-- DropZone -->
<div
  ondragover={(e) => { e.preventDefault(); }}
  ondrop={(e) => handleDrop(e, slotIndex)}
  class:drag-over={isDragOver}
>
  {placedWord || '___'}
</div>
```

### Mobile Touch-Support

Für Touch-Geräte kann `touch-action: none` und Touch-Events oder eine Bibliothek wie `@neodrag/svelte` verwendet werden.

## Abhängigkeiten

- Basiert auf: R00010 (DiceText ursprüngliche Implementierung)
- Betrifft: R00009 (Browse-Modus muss neue Darstellung unterstützen)

## Notizen

- Die bisherige MaskedEdit-Komponente mit Texteingabe wird vollständig ersetzt
- Distraktoren sollten thematisch zum Text passen, um eine echte Herausforderung zu bieten
- Bei Fragen ohne Distraktoren sind nur die korrekten Wörter in der Box
- Die Reihenfolge der Wörter in der Box sollte bei jedem Laden neu gemischt werden
- Consideration: Soll ein Wort mehrfach vorkommen können? (z.B. "der" im Text mehrfach versteckt)
