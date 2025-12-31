# R00005: Trainingsablauf

## Beschreibung

Der eigentliche Ablauf einer Trainings-Session von Start bis Abschluss.

## Akzeptanzkriterien

### Fragenanzeige
- [ ] Trainingsname wird angezeigt
- [ ] Positionsanzeige (z.B. "5 / 100")
- [ ] Aktueller Aufgabenpunkte-Stand wird angezeigt (z.B. "[APS: 2]")
- [ ] Fragebereich unterstützt HTML-Formatierung
- [ ] Antwortbereich: Textarea für Textfragen, Checkboxen für MC

### Steuerung
- [ ] "Antwort anzeigen"-Button zeigt die korrekte Antwort
- [ ] "Antworten!"-Button (oder Strg+Enter) zur Auswertung

### Auswertung bei richtiger Antwort
- [ ] Grüner Hintergrundblitz als visuelles Feedback
- [ ] Automatisch weiter zur nächsten Frage (1 Sekunde Verzögerung)
- [ ] Punktestand wird aktualisiert (+1)

### Auswertung bei falscher Antwort
- [ ] Roter Hintergrundblitz als visuelles Feedback
- [ ] Korrekte Antwort wird angezeigt
- [ ] Frage wird zweimal direkt wiederholt
- [ ] Frage wird später erneut gestellt
- [ ] Punktestand wird aktualisiert (-5)

### Abschluss
- [ ] "SEHR GUT!" Nachricht bei erfolgreicher Beendigung
- [ ] Bilanz mit Anzahl richtiger/falscher Antworten

### Bilanz in Navbar
- [ ] Laufende Bilanz wird in der Navbar angezeigt

## Status

- [ ] Nicht begonnen

## Technische Details

### Wiederholungslogik bei falscher Antwort

Bei einer falschen Antwort wird die Frage in die Queue eingefügt:
1. Sofortige Wiederholung (Position: currentIndex + 1)
2. Zweite Wiederholung (Position: currentIndex + 2)
3. Spätere Wiederholung (Position: zufällig im verbleibenden Teil)
