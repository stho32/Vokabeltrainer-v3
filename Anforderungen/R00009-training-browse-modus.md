# R00009: Training Browse-Modus

## Beschreibung

Ermöglicht das Durchstöbern von Trainingsinhalten auf der Hauptseite, ohne eine Abfrage zu starten. Über ein "Auge"-Icon neben jedem Training kann der Benutzer die Fragen und Antworten eines Trainings einsehen und explorieren.

## Akzeptanzkriterien

### Browse-Icon
- [x] Neben jedem Training in der Auswahlliste wird ein "Auge"-Icon angezeigt
- [x] Das Icon ist klar erkennbar und visuell vom Checkbox-Auswahlbereich getrennt
- [x] Klick auf das Icon öffnet den Browse-Modus für dieses Training
- [x] Hover-Effekt zeigt an, dass das Icon klickbar ist

### Browse-Ansicht
- [x] Modal oder Overlay zeigt den Trainingsinhalt an
- [x] Trainingsname wird als Überschrift angezeigt
- [x] Alle Fragen des Trainings sind aufgelistet
- [x] Jede Frage zeigt die vollständige Fragestellung
- [x] Antworten sind sichtbar (bei Text/Dice: Antworttext, bei MC: korrekte Option markiert)
- [x] Bei Multiple-Choice werden alle Optionen mit Erklärungen angezeigt
- [x] Scrollbar bei vielen Fragen

### Navigation
- [x] Schließen-Button (X) zum Beenden des Browse-Modus
- [x] ESC-Taste schließt die Ansicht
- [x] Klick außerhalb der Ansicht schließt diese (optional)

### Darstellung pro Fragentyp
- [x] TextQuestion: Frage und Antwort(en) anzeigen
- [x] MultipleChoiceQuestion: Frage, alle Optionen mit Markierung der korrekten, Erklärungen
- [x] DiceTextQuestion: Frage und vollständiger Text mit markierten Hidden Words
- [x] WordSearchQuestion: Titel, Frage und Antwort

## Status

- [x] Abgeschlossen

## Technische Details

### Zielverzeichnisse

| Verzeichnis | Zweck |
|-------------|-------|
| `src/lib/components/` | Neue Browse-Komponenten |
| `src/routes/` | Anpassung der Hauptseite |

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/components/TrainingBrowseModal.svelte` | Modal-Komponente für die Browse-Ansicht |
| `src/lib/components/BrowseQuestionView.svelte` | Darstellung einer einzelnen Frage im Browse-Modus |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/routes/+page.svelte` | Hinzufügen des Browse-Icons pro Training, Modal-Integration |

### Vermutete Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| `TrainingBrowseModal` | Container für Browse-Ansicht mit Überschrift, Schließen-Logik und Scroll |
| `BrowseQuestionView` | Rendert eine Frage mit Antwort je nach Typ (Text/MC/Dice/WordSearch) |

### Benutzte Icons

Ein Auge-Icon (z.B. als SVG inline oder Unicode-Symbol) zur Kennzeichnung des Browse-Buttons.

## Abhängigkeiten

- Abhängig von: R00001-textfragen, R00002-multiple-choice-fragen (Fragentypen müssen existieren)
- Blockiert: Keine

## Notizen

- Das Feature ist rein lesend und beeinflusst keine Punktestände
- Die Browse-Ansicht ist unabhängig von der Trainingsauswahl (auch nicht ausgewählte Trainings können durchstöbert werden)
- Könnte später erweitert werden um einzelne Fragen direkt ins Training zu übernehmen
