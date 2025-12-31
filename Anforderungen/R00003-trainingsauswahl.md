# R00003: Trainingsauswahl

## Beschreibung

Konfigurationsbereich für die Auswahl von Trainingsmodulen und Trainingsparametern.

## Akzeptanzkriterien

### Trainingsauswahl
- [ ] Auswahl eines oder mehrerer Trainingsmodule via Checkboxen
- [ ] Alphabetische Sortierung der verfügbaren Trainings
- [ ] Anzeige der Aufgabenanzahl pro Training
- [ ] Anzeige des aktuellen Punktestands pro Training
- [ ] Farbcodierte Punkteanzeige (grün >= 90%, sonst rot)

### Fragenanzahl
- [ ] Radiobuttons für Fragenanzahl-Auswahl
- [ ] Option: 5 Fragen (für hartnäckige Themen)
- [ ] Option: 30 Fragen (ca. 45 Minuten)
- [ ] Option: 45 Fragen (ca. 1 Stunde)
- [ ] Option: 100 Fragen (ca. 2 Stunden, Intensivtraining)
- [ ] Option: Alle verfügbaren Fragen

### Reihenfolge
- [ ] Radiobuttons für Reihenfolge-Auswahl
- [ ] Option: Nacheinander (sequentiell)
- [ ] Option: Zufällig

### Steuerung
- [ ] "Training starten"-Button
- [ ] Button ist deaktiviert wenn kein Training ausgewählt

## Status

- [ ] Nicht begonnen

## Technische Details

Die Auswahl wird im LocalStorage persistiert:
- `trainingsAuswahl`: Array der ausgewählten Training-IDs
- `AnzahlAuswahl`: Gewählte Fragenanzahl
- `ReihenfolgeAuswahl`: 'sequential' oder 'random'
