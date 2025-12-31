# R00005: Trainingsablauf

## Beschreibung

Der eigentliche Ablauf einer Trainings-Session von Start bis Abschluss.

## Akzeptanzkriterien

### Fragenanzeige
- [x] Trainingsname wird angezeigt
- [x] Positionsanzeige (z.B. "5 / 100")
- [x] Aktueller Aufgabenpunkte-Stand wird angezeigt (z.B. "[APS: 2]")
- [x] Fragebereich unterstützt HTML-Formatierung
- [x] Antwortbereich: Textarea für Textfragen, Checkboxen für MC

### Steuerung
- [x] "Antwort anzeigen"-Button zeigt die korrekte Antwort
- [x] "Antworten!"-Button (oder Strg+Enter) zur Auswertung

### Auswertung bei richtiger Antwort
- [x] Grüner Hintergrundblitz als visuelles Feedback
- [x] Automatisch weiter zur nächsten Frage (1 Sekunde Verzögerung)
- [x] Punktestand wird aktualisiert (+1)

### Auswertung bei falscher Antwort
- [x] Roter Hintergrundblitz als visuelles Feedback
- [x] Korrekte Antwort wird angezeigt
- [x] Frage wird zweimal direkt wiederholt
- [x] Frage wird später erneut gestellt
- [x] Punktestand wird aktualisiert (-5)

### Abschluss
- [x] "SEHR GUT!" Nachricht bei erfolgreicher Beendigung
- [x] Bilanz mit Anzahl richtiger/falscher Antworten

### Bilanz in Navbar
- [x] Laufende Bilanz wird in der Navbar angezeigt

## Status

- [x] Abgeschlossen

## Technische Details

### Wiederholungslogik bei falscher Antwort

Bei einer falschen Antwort wird die Frage in die Queue eingefügt:
1. Sofortige Wiederholung (Position: currentIndex + 1)
2. Zweite Wiederholung (Position: currentIndex + 2)
3. Spätere Wiederholung (Position: zufällig im verbleibenden Teil)
