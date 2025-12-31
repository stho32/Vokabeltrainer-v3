# R00003: Trainingsauswahl

## Beschreibung

Konfigurationsbereich für die Auswahl von Trainingsmodulen und Trainingsparametern.

## Akzeptanzkriterien

### Trainingsauswahl
- [x] Auswahl eines oder mehrerer Trainingsmodule via Checkboxen
- [x] Alphabetische Sortierung der verfügbaren Trainings
- [x] Anzeige der Aufgabenanzahl pro Training
- [x] Anzeige des aktuellen Punktestands pro Training
- [x] Farbcodierte Punkteanzeige (grün >= 90%, sonst rot)

### Fragenanzahl
- [x] Radiobuttons für Fragenanzahl-Auswahl
- [x] Option: 5 Fragen (für hartnäckige Themen)
- [x] Option: 30 Fragen (ca. 45 Minuten)
- [x] Option: 45 Fragen (ca. 1 Stunde)
- [x] Option: 100 Fragen (ca. 2 Stunden, Intensivtraining)
- [x] Option: Alle verfügbaren Fragen

### Reihenfolge
- [x] Radiobuttons für Reihenfolge-Auswahl
- [x] Option: Nacheinander (sequentiell)
- [x] Option: Zufällig

### Steuerung
- [x] "Training starten"-Button
- [x] Button ist deaktiviert wenn kein Training ausgewählt

## Status

- [x] Abgeschlossen

## Technische Details

Die Auswahl wird im LocalStorage persistiert:
- `trainingsAuswahl`: Array der ausgewählten Training-IDs
- `AnzahlAuswahl`: Gewählte Fragenanzahl
- `ReihenfolgeAuswahl`: 'sequential' oder 'random'
