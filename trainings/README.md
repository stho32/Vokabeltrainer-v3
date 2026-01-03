# Trainings-Verzeichnis

Dieses Verzeichnis enthält externe Trainingsdateien für den Vokabeltrainer.

## Schnellstart

Klicke auf den folgenden Link, um das Beispiel-Training zu importieren:

**Lokal (Dev-Server):**
```
http://localhost:5173/?import=https://raw.githubusercontent.com/USERNAME/REPO/main/trainings/beispiel.training.json
```

## Dateien

| Datei | Beschreibung |
|-------|--------------|
| `training.schema.json` | JSON Schema zur Validierung von Trainingsdateien |
| `beispiel.training.json` | Minimales Beispiel-Training mit 3 Fragen |

## Eigene Trainings erstellen

1. Kopiere `beispiel.training.json` als Vorlage
2. Ändere `id` (eindeutig, kebab-case) und `name`
3. Füge eigene Fragen hinzu
4. Importiere per Drag & Drop oder URL

## Fragentypen

### text
Freitext-Eingabe mit einer oder mehreren akzeptierten Antworten.

```json
{
  "type": "text",
  "question": "Was ist die Hauptstadt von Deutschland?",
  "answer": ["Berlin", "berlin"]
}
```

### multiple-choice
Multiple-Choice mit Erklärungen.

```json
{
  "type": "multiple-choice",
  "question": "Welches ist die größte Stadt Deutschlands?",
  "options": [
    { "text": "Berlin", "correct": true, "explanation": "Richtig!" },
    { "text": "Hamburg", "correct": false },
    { "text": "München", "correct": false }
  ]
}
```

### true-false
Wahr/Falsch-Aussage.

```json
{
  "type": "true-false",
  "question": "Bewerte die Aussage:",
  "statement": "Die Erde ist rund.",
  "correct": true,
  "explanation": "Die Erde ist annähernd kugelförmig."
}
```

### dice-text
Lückentext mit versteckten Wörtern.

```json
{
  "type": "dice-text",
  "question": "Ergänze die fehlenden Wörter:",
  "text": "Der Hund läuft schnell durch den Garten.",
  "hiddenWords": [1, 3],
  "distractors": ["Katze", "langsam"]
}
```

### matching
Zuordnungsaufgabe.

```json
{
  "type": "matching",
  "question": "Ordne die Begriffe zu:",
  "pairs": [
    { "left": "Hund", "right": "Dog" },
    { "left": "Katze", "right": "Cat" }
  ]
}
```

### categorization
Kategorisierungsaufgabe.

```json
{
  "type": "categorization",
  "question": "Ordne die Tiere den Kategorien zu:",
  "categories": [
    { "name": "Säugetiere", "items": ["Hund", "Katze"] },
    { "name": "Vögel", "items": ["Adler", "Taube"] }
  ]
}
```

## Schema-Validierung in VS Code

Füge in `.vscode/settings.json` hinzu:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["trainings/*.training.json"],
      "url": "./trainings/training.schema.json"
    }
  ]
}
```

Dies aktiviert Autovervollständigung und Validierung beim Bearbeiten von Trainingsdateien.
