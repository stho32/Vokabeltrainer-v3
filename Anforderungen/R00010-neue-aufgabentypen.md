# R00010: Neue Aufgabentypen

## Beschreibung

Implementierung von fünf neuen Aufgabentypen zur Erweiterung des Vokabeltrainers: Zuordnung (matching), Kategorisierung (categorization), Wahr/Falsch (true-false), Würfeltext (dice-text) und Wortsuchrätsel (word-search).

## Akzeptanzkriterien

### Würfeltext (dice-text)
- [ ] Ein Text mit versteckten Wörtern wird angezeigt
- [ ] Versteckte Wörter werden durch Eingabefelder ersetzt
- [ ] Der Nutzer kann die versteckten Wörter ausfüllen
- [ ] Antwortprüfung erfolgt tolerant (wie bei Textfragen)
- [ ] Nach Auswertung werden korrekte und falsche Eingaben farblich markiert

### Wortsuchrätsel (word-search)
- [ ] Ein Buchstabengitter wird angezeigt
- [ ] Das gesuchte Wort ist in einer Richtung (horizontal, vertikal, diagonal) versteckt
- [ ] Der Nutzer kann Buchstaben durch Klicken/Ziehen markieren
- [ ] Nach Auswertung wird das korrekte Wort hervorgehoben

### Zuordnung (matching)
- [ ] Zwei Spalten mit Begriffen werden angezeigt
- [ ] Begriffe können per Drag & Drop oder Klick-Klick zugeordnet werden
- [ ] Verbindungslinien zeigen die Zuordnungen an
- [ ] Nach Auswertung werden korrekte Paare grün, falsche rot markiert

### Kategorisierung (categorization)
- [ ] Mehrere Kategorien (2-4) werden als Bereiche angezeigt
- [ ] Begriffe können per Drag & Drop in Kategorien gezogen werden
- [ ] Nach Auswertung werden korrekt/falsch zugeordnete Begriffe markiert

### Wahr/Falsch (true-false)
- [ ] Eine Aussage wird angezeigt
- [ ] Zwei Buttons: "Wahr" und "Falsch"
- [ ] Nach Auswertung wird die korrekte Antwort angezeigt
- [ ] Optionale Erklärung kann eingeblendet werden

### Allgemein
- [ ] Alle neuen Typen unterstützen Tastaturkürzel (R00007)
- [ ] Alle neuen Typen sind im QuestionRenderer integriert
- [ ] Alle neuen Typen werden im Browse-Modus korrekt angezeigt (R00009)
- [ ] Typdefinitionen sind in index.ts vorhanden

## Status

- [ ] Offen

## Technische Details

### Datenstrukturen

```typescript
// Bereits vorhanden in index.ts
interface DiceTextQuestion {
  type: 'dice-text';
  question: string;
  text: string;           // Der Text mit versteckten Wörtern
  hiddenWords: number[];  // Indizes der versteckten Wörter (0-basiert)
}

interface WordSearchQuestion {
  type: 'word-search';
  title: string;
  question: string;
  answer: string;  // Das zu findende Wort
}

// Neu zu ergänzen
interface MatchingQuestion {
  type: 'matching';
  question: string;
  pairs: Array<{
    left: string;
    right: string;
  }>;
}

interface CategorizationQuestion {
  type: 'categorization';
  question: string;
  categories: Array<{
    name: string;
    items: string[];
  }>;
}

interface TrueFalseQuestion {
  type: 'true-false';
  question: string;
  statement: string;
  correct: boolean;      // true = wahr, false = falsch
  explanation?: string;
}
```

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/components/questions/` | Neue Aufgabentyp-Komponenten |
| `src/lib/types/` | Erweiterte Typdefinitionen |
| `src/lib/utils/` | Hilfsfunktionen (z.B. Gittergenerierung) |

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/components/questions/DiceTextView.svelte` | Würfeltext-Komponente |
| `src/lib/components/questions/WordSearchView.svelte` | Wortsuchrätsel-Komponente |
| `src/lib/components/questions/MatchingView.svelte` | Zuordnungs-Komponente |
| `src/lib/components/questions/CategorizationView.svelte` | Kategorisierungs-Komponente |
| `src/lib/components/questions/TrueFalseView.svelte` | Wahr/Falsch-Komponente |
| `src/lib/utils/word-search-grid.ts` | Hilfsfunktion zur Gittergenerierung |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/types/index.ts` | Neue Typen hinzufügen, Question-Union erweitern |
| `src/lib/components/questions/QuestionRenderer.svelte` | Neue Typen rendern |
| `src/lib/components/BrowseQuestionView.svelte` | Neue Typen im Browse-Modus anzeigen |

### Vermutete Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| `DiceTextView` | Text parsen, Eingabefelder für versteckte Wörter rendern |
| `WordSearchView` | Buchstabengitter generieren und rendern, Buchstabenauswahl |
| `MatchingView` | Drag & Drop oder Klick-Zuordnung, Verbindungslinien |
| `CategorizationView` | Drag & Drop in Kategorie-Container |
| `TrueFalseView` | Zwei-Button-Auswahl, Erklärungsanzeige |

## Abhängigkeiten

- Abhängig von: R00005 (Trainingsablauf), R00007 (Tastaturkürzel)
- Erweitert: R00009 (Browse-Modus)

## Implementierungsreihenfolge (Empfehlung)

1. **true-false** - Einfachster Typ, guter Einstieg
2. **dice-text** - Ähnlich zu TextQuestion, moderate Komplexität
3. **matching** - Erfordert Drag & Drop oder Klick-Logik
4. **categorization** - Aufbauend auf Matching-Logik
5. **word-search** - Komplexeste Implementierung (Gittergenerierung, Buchstabenauswahl)

## Notizen

- Für Drag & Drop könnte die native HTML5 Drag & Drop API oder eine Library wie `svelte-dnd-action` verwendet werden
- Das Wortsuchrätsel-Gitter sollte das Wort in zufälliger Richtung platzieren und mit Zufallsbuchstaben auffüllen
- Alle Komponenten sollten dem bestehenden Pattern folgen (Props: question, revealed, evaluated, onSubmit)
