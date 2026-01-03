# R00014: Externe Trainingsdateien importieren

## Beschreibung

Trainingseinheiten (Vokabellektionen) sollen als separate JSON-Dateien in einem externen Repository gehalten und auf verschiedene Weisen in die Webanwendung eingespielt werden können: per Drag & Drop, Dateiauswahl oder URL-Parameter. Dies ermöglicht die Trennung von öffentlichem Trainer-Code und privaten Trainingsdaten sowie das Erstellen von Bookmarks für schnellen Zugriff auf bestimmte Trainings.

## Akzeptanzkriterien

### Dateiformat

- [ ] Trainingsdateien sind als JSON-Dateien mit dem `Training`-Interface kompatibel
- [ ] Schema-Validierung beim Import mit verständlichen Fehlermeldungen
- [ ] Unterstützung aller existierenden Fragentypen (TextQuestion, MultipleChoiceQuestion, DiceTextQuestion, WordSearchQuestion, TrueFalseQuestion, MatchingQuestion, CategorizationQuestion)
- [ ] Optionale Metadaten (Version, Autor, Datum) in der Trainingsdatei

### Drag & Drop Import

- [ ] Dropzone auf der Startseite für Trainingsdateien
- [ ] Visuelles Feedback beim Ziehen einer Datei über die Dropzone
- [ ] Mehrere Dateien gleichzeitig per Drag & Drop importierbar
- [ ] Alternative: Dateiauswahl-Button als Fallback
- [ ] Erfolgsmeldung mit Anzahl importierter Trainings/Fragen

### URL-basierter Import

- [ ] Import über Query-Parameter `?import=<URL>` (URL-encoded)
- [ ] Unterstützung für mehrere URLs: `?import=<URL1>&import=<URL2>`
- [ ] Automatischer Import beim Laden der Seite wenn Parameter vorhanden
- [ ] Lade-Indikator während des Fetches
- [ ] Fehlerbehandlung bei nicht erreichbaren URLs oder CORS-Problemen
- [ ] Erfolgsmeldung nach Import mit Option "Dauerhaft speichern"
- [ ] URL-Eingabefeld in der UI als alternative Import-Methode
- [ ] Unterstützung für GitHub Raw-URLs und andere öffentliche JSON-Hosts

### Bookmark-Unterstützung

- [ ] Generierung von Import-URLs für gespeicherte Trainings
- [ ] Kopierbarer Link für jedes importierte Training
- [ ] Beispiel: `https://trainer.example.com/?import=https://raw.githubusercontent.com/user/vocab/main/lektion1.json`

### Speicherung importierter Trainings

- [ ] Importierte Trainings werden im LocalStorage persistiert
- [ ] Trennung von eingebauten und importierten Trainings
- [ ] Importierte Trainings erscheinen in der Trainingsauswahl
- [ ] Möglichkeit, einzelne importierte Trainings zu löschen
- [ ] Möglichkeit, alle importierten Trainings zu löschen

### Fehlerbehandlung

- [ ] Validierung des JSON-Formats mit spezifischen Fehlermeldungen
- [ ] Prüfung auf Duplikate (gleiche Training-ID bereits vorhanden)
- [ ] Warnung bei überschreiben eines bestehenden Trainings
- [ ] Fehler bei ungültigen Fragentypen

### Integration mit bestehendem System

- [ ] Importierte Trainings funktionieren mit dem Spaced Repetition System
- [ ] Scores für importierte Trainings werden korrekt gespeichert
- [ ] Browse-Modus funktioniert für importierte Trainings
- [ ] Keine Änderung an eingebauten Trainings erforderlich

### Trainings-Verzeichnis im Repository

- [ ] Neuer Ordner `trainings/` im Repository-Root für externe Trainingsdateien
- [ ] `trainings/training.schema.json` - JSON Schema für Validierung
- [ ] `trainings/beispiel.training.json` - Minimales Beispiel-Training ohne signifikanten Inhalt
- [ ] `trainings/README.md` - Dokumentation zur Struktur und Verwendung
- [ ] Bestehende needs-map Trainingsdaten nach `trainings/` verschieben/konvertieren
- [ ] Import-Link für Beispiel-Training in Projekt-README.md hinzufügen

## Status

- [ ] Offen

## Technische Details

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/components/` | Dropzone-Komponente für Datei-Import |
| `src/lib/stores/` | Store für importierte Trainings |
| `src/lib/utils/` | Validierungslogik für Trainingsdateien |
| `src/lib/types/` | Erweiterung der Typdefinitionen |
| `trainings/` | Externe Trainingsdateien, Schema, Dokumentation |

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/components/TrainingImportDropzone.svelte` | Drag & Drop Bereich für Datei-Import |
| `src/lib/components/TrainingImportUrl.svelte` | URL-Eingabefeld für Import per Link |
| `src/lib/components/ImportedTrainingsList.svelte` | Liste der importierten Trainings mit Lösch-Option |
| `src/lib/stores/imported-trainings.svelte.ts` | Store für importierte Trainings (LocalStorage) |
| `src/lib/utils/training-validator.ts` | Validierung von Trainingsdateien gegen das Schema |
| `src/lib/utils/training-fetcher.ts` | Fetch-Logik für URL-Import mit Fehlerbehandlung |
| `trainings/training.schema.json` | JSON Schema für Trainingsdateien |
| `trainings/beispiel.training.json` | Minimales Beispiel-Training |
| `trainings/needs-map.training.json` | Konvertiertes needs-map Training |
| `trainings/README.md` | Dokumentation für Trainings-Verzeichnis |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/types/index.ts` | Optionales `source`-Feld im Training-Interface ('builtin' \| 'imported'), `sourceUrl` für URL-Import |
| `src/lib/data/trainings.ts` | Integration importierter Trainings in `getTrainingsSorted()` und `getSelectedTrainings()` |
| `src/routes/+page.svelte` | Einbindung der Dropzone, URL-Import und ImportedTrainingsList; Verarbeitung von URL-Parametern |
| `src/lib/stores/config.svelte.ts` | Berücksichtigung importierter Trainings bei Auswahl |
| `README.md` | Import-Link für Beispiel-Training hinzufügen |

### Vermutete Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| `TrainingImportDropzone` | Drag & Drop UI, Dateiauswahl, Import-Trigger |
| `TrainingImportUrl` | URL-Eingabe, Fetch-Trigger, Ladezustand |
| `ImportedTrainingsList` | Anzeige importierter Trainings, Lösch-Aktionen, Link-Kopieren |
| `importedTrainingsStore` | Verwaltung importierter Trainings, LocalStorage-Persistenz |
| `trainingValidator` | Schema-Validierung, Fehlererfassung |
| `trainingFetcher` | URL-Fetch mit CORS-Handling, Timeout, Fehlerbehandlung |

### JSON Schema Definition

Das folgende JSON Schema kann im externen Trainings-Repository verwendet werden, um Trainingsdateien zu validieren. Speichern als `training.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://vokabeltrainer.example.com/training.schema.json",
  "title": "Training",
  "description": "Schema für Vokabeltrainer-Trainingsdateien",
  "type": "object",
  "required": ["id", "name", "questions"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Eindeutige ID des Trainings (kebab-case)"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Anzeigename des Trainings"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Versionsnummer (semver)"
    },
    "author": {
      "type": "string",
      "description": "Name des Autors"
    },
    "description": {
      "type": "string",
      "description": "Beschreibung des Trainings"
    },
    "createdAt": {
      "type": "string",
      "format": "date",
      "description": "Erstellungsdatum (YYYY-MM-DD)"
    },
    "questions": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/Question"
      },
      "description": "Liste der Fragen"
    }
  },
  "definitions": {
    "Question": {
      "oneOf": [
        { "$ref": "#/definitions/TextQuestion" },
        { "$ref": "#/definitions/MultipleChoiceQuestion" },
        { "$ref": "#/definitions/DiceTextQuestion" },
        { "$ref": "#/definitions/WordSearchQuestion" },
        { "$ref": "#/definitions/TrueFalseQuestion" },
        { "$ref": "#/definitions/MatchingQuestion" },
        { "$ref": "#/definitions/CategorizationQuestion" }
      ]
    },
    "TextQuestion": {
      "type": "object",
      "required": ["type", "question", "answer"],
      "properties": {
        "type": { "const": "text" },
        "question": { "type": "string", "minLength": 1 },
        "answer": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            { "type": "array", "items": { "type": "string", "minLength": 1 }, "minItems": 1 }
          ],
          "description": "Richtige Antwort(en) - String oder Array von Strings"
        },
        "initialValue": {
          "type": "string",
          "description": "Vorausgefüllter Wert im Eingabefeld"
        }
      },
      "additionalProperties": false
    },
    "MultipleChoiceQuestion": {
      "type": "object",
      "required": ["type", "question", "options"],
      "properties": {
        "type": { "const": "multiple-choice" },
        "question": { "type": "string", "minLength": 1 },
        "options": {
          "type": "array",
          "minItems": 2,
          "items": {
            "type": "object",
            "required": ["text", "correct"],
            "properties": {
              "text": { "type": "string", "minLength": 1 },
              "correct": { "type": "boolean" },
              "explanation": { "type": "string" }
            },
            "additionalProperties": false
          }
        }
      },
      "additionalProperties": false
    },
    "DiceTextQuestion": {
      "type": "object",
      "required": ["type", "question", "text", "hiddenWords"],
      "properties": {
        "type": { "const": "dice-text" },
        "question": { "type": "string", "minLength": 1 },
        "text": {
          "type": "string",
          "minLength": 1,
          "description": "Vollständiger Text mit Wörtern zum Verstecken"
        },
        "hiddenWords": {
          "type": "array",
          "items": { "type": "integer", "minimum": 0 },
          "minItems": 1,
          "description": "Indizes der zu versteckenden Wörter (0-basiert)"
        },
        "distractors": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Zusätzliche Ablenkungswörter"
        }
      },
      "additionalProperties": false
    },
    "WordSearchQuestion": {
      "type": "object",
      "required": ["type", "title", "question", "answer"],
      "properties": {
        "type": { "const": "word-search" },
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Titel/Kontext der Wortsuche"
        },
        "question": { "type": "string", "minLength": 1 },
        "answer": {
          "type": "string",
          "minLength": 1,
          "description": "Das zu findende Wort"
        }
      },
      "additionalProperties": false
    },
    "TrueFalseQuestion": {
      "type": "object",
      "required": ["type", "question", "statement", "correct"],
      "properties": {
        "type": { "const": "true-false" },
        "question": { "type": "string", "minLength": 1 },
        "statement": {
          "type": "string",
          "minLength": 1,
          "description": "Die zu bewertende Aussage"
        },
        "correct": {
          "type": "boolean",
          "description": "true = Aussage ist wahr, false = Aussage ist falsch"
        },
        "explanation": {
          "type": "string",
          "description": "Erklärung zur richtigen Antwort"
        }
      },
      "additionalProperties": false
    },
    "MatchingQuestion": {
      "type": "object",
      "required": ["type", "question", "pairs"],
      "properties": {
        "type": { "const": "matching" },
        "question": { "type": "string", "minLength": 1 },
        "pairs": {
          "type": "array",
          "minItems": 2,
          "items": {
            "type": "object",
            "required": ["left", "right"],
            "properties": {
              "left": { "type": "string", "minLength": 1 },
              "right": { "type": "string", "minLength": 1 }
            },
            "additionalProperties": false
          },
          "description": "Zuordnungspaare (links <-> rechts)"
        }
      },
      "additionalProperties": false
    },
    "CategorizationQuestion": {
      "type": "object",
      "required": ["type", "question", "categories"],
      "properties": {
        "type": { "const": "categorization" },
        "question": { "type": "string", "minLength": 1 },
        "categories": {
          "type": "array",
          "minItems": 2,
          "items": {
            "type": "object",
            "required": ["name", "items"],
            "properties": {
              "name": { "type": "string", "minLength": 1 },
              "items": {
                "type": "array",
                "items": { "type": "string", "minLength": 1 },
                "minItems": 1
              }
            },
            "additionalProperties": false
          },
          "description": "Kategorien mit zugehörigen Elementen"
        }
      },
      "additionalProperties": false
    }
  }
}
```

### Verwendung des Schemas im externen Repository

Im externen Trainings-Repository kann das Schema wie folgt verwendet werden:

**1. Schema-Datei anlegen:** `training.schema.json` im Repository-Root

**2. In Trainingsdateien referenzieren:**
```json
{
  "$schema": "./training.schema.json",
  "id": "meine-lektion",
  "name": "Meine Lektion",
  "questions": [...]
}
```

**3. VS Code Konfiguration** (`.vscode/settings.json`):
```json
{
  "json.schemas": [
    {
      "fileMatch": ["trainings/**/*.json", "*.training.json"],
      "url": "./training.schema.json"
    }
  ]
}
```

### Beispiel Trainingsdatei-Format

```json
{
  "$schema": "./training.schema.json",
  "id": "meine-vokabeln-lektion1",
  "name": "Meine Vokabeln - Lektion 1",
  "version": "1.0.0",
  "author": "Autor Name",
  "description": "Grundlegende Vokabeln für Anfänger",
  "createdAt": "2026-01-03",
  "questions": [
    {
      "type": "text",
      "question": "Was bedeutet 'hello'?",
      "answer": ["Hallo", "Guten Tag"]
    },
    {
      "type": "multiple-choice",
      "question": "Wähle die richtige Übersetzung für 'goodbye':",
      "options": [
        { "text": "Auf Wiedersehen", "correct": true, "explanation": "Korrekt!" },
        { "text": "Hallo", "correct": false, "explanation": "'Hallo' bedeutet 'hello'" },
        { "text": "Danke", "correct": false, "explanation": "'Danke' bedeutet 'thank you'" }
      ]
    },
    {
      "type": "dice-text",
      "question": "Ergänze die fehlenden Wörter:",
      "text": "Der Hund läuft schnell durch den Garten.",
      "hiddenWords": [1, 3],
      "distractors": ["Katze", "langsam"]
    },
    {
      "type": "true-false",
      "question": "Bewerte die folgende Aussage:",
      "statement": "'Apple' bedeutet auf Deutsch 'Birne'.",
      "correct": false,
      "explanation": "'Apple' bedeutet 'Apfel', nicht 'Birne'."
    },
    {
      "type": "matching",
      "question": "Ordne die Wörter ihren Übersetzungen zu:",
      "pairs": [
        { "left": "dog", "right": "Hund" },
        { "left": "cat", "right": "Katze" },
        { "left": "bird", "right": "Vogel" }
      ]
    },
    {
      "type": "categorization",
      "question": "Ordne die Wörter den Kategorien zu:",
      "categories": [
        { "name": "Tiere", "items": ["Hund", "Katze", "Vogel"] },
        { "name": "Pflanzen", "items": ["Baum", "Blume", "Gras"] }
      ]
    }
  ]
}
```

### URL-Import Beispiele

**Einzelnes Training importieren:**
```
https://trainer.example.com/?import=https%3A%2F%2Fraw.githubusercontent.com%2Fuser%2Fvocab%2Fmain%2Flektion1.json
```

**Mehrere Trainings importieren:**
```
https://trainer.example.com/?import=https%3A%2F%2F...%2Flektion1.json&import=https%3A%2F%2F...%2Flektion2.json
```

**Unterstützte URL-Quellen:**
- GitHub Raw: `https://raw.githubusercontent.com/user/repo/branch/file.json`
- GitLab Raw: `https://gitlab.com/user/repo/-/raw/branch/file.json`
- GitHub Gist: `https://gist.githubusercontent.com/user/id/raw/file.json`
- Eigener Server: Beliebige URL mit CORS-Header `Access-Control-Allow-Origin`

**CORS-Hinweis:** Die JSON-Datei muss von einem Server mit korrekten CORS-Headern bereitgestellt werden. GitHub Raw-URLs unterstützen CORS standardmäßig.

### LocalStorage Keys

| Key | Beschreibung |
|-----|--------------|
| `ImportierteTrainings` | Array der importierten Training-Objekte (inkl. sourceUrl) |

### Tests

| Testdatei | Prüft |
|-----------|-------|
| `src/lib/utils/__tests__/training-validator.test.ts` | Schema-Validierung für alle Fragentypen |
| `src/lib/utils/__tests__/training-fetcher.test.ts` | URL-Fetch, Fehlerbehandlung, Timeout |
| `src/lib/stores/__tests__/imported-trainings.test.ts` | Import/Export/Lösch-Operationen |

## Abhängigkeiten

- Abhängig von: R00001 (Textfragen), R00002 (Multiple Choice), R00010 (Neue Aufgabentypen)
- Blockiert: keine

## Notizen

- Das externe Repository für Trainingsdaten muss vom Benutzer selbst erstellt werden
- Es könnte sinnvoll sein, ein Beispiel-Repository mit Template-Struktur zu erstellen
- Die Validierung sollte hilfreich sein und konkrete Hinweise geben, welche Felder fehlen oder ungültig sind
- Bei großen Trainingsdateien könnte eine Fortschrittsanzeige sinnvoll sein
- Optionale Erweiterung: Export-Funktion für eingebaute Trainings als Vorlage

### Workflow-Beispiel mit Bookmarks

1. Benutzer erstellt privates GitHub-Repository mit Trainingsdateien
2. Benutzer kopiert Raw-URL einer JSON-Datei: `https://raw.githubusercontent.com/user/vocab-private/main/englisch-lektion1.json`
3. Benutzer erstellt Bookmark mit Import-URL: `https://trainer.example.com/?import=<encoded-url>`
4. Klick auf Bookmark öffnet Trainer und importiert automatisch die Lektion
5. Optional: Benutzer klickt "Dauerhaft speichern" um Training im LocalStorage zu behalten

### Sicherheitsüberlegungen

- Nur JSON-Dateien werden akzeptiert (Content-Type-Prüfung)
- Maximale Dateigröße begrenzen (z.B. 5 MB)
- Timeout für Fetch-Requests (z.B. 10 Sekunden)
- Keine Ausführung von Code aus importierten Dateien

### Trainings-Verzeichnis Struktur

```
trainings/
├── README.md                    # Dokumentation
├── training.schema.json         # JSON Schema
├── beispiel.training.json       # Minimales Beispiel
└── needs-map.training.json      # Konvertiertes needs-map Training
```

### Beispiel-Training (beispiel.training.json)

```json
{
  "$schema": "./training.schema.json",
  "id": "beispiel-training",
  "name": "Beispiel-Training",
  "version": "1.0.0",
  "description": "Minimales Beispiel zur Demonstration der Import-Funktion",
  "questions": [
    {
      "type": "text",
      "question": "Wie lautet die Antwort auf diese Beispielfrage?",
      "answer": ["Beispiel", "beispiel"]
    },
    {
      "type": "multiple-choice",
      "question": "Welche Farbe hat der Himmel bei klarem Wetter?",
      "options": [
        { "text": "Blau", "correct": true },
        { "text": "Grün", "correct": false },
        { "text": "Rot", "correct": false }
      ]
    },
    {
      "type": "true-false",
      "question": "Bewerte die Aussage:",
      "statement": "Dies ist ein Beispiel-Training.",
      "correct": true
    }
  ]
}
```

### trainings/README.md Inhalt

```markdown
# Trainings-Verzeichnis

Dieses Verzeichnis enthält externe Trainingsdateien für den Vokabeltrainer.

## Schnellstart

Klicke auf den folgenden Link, um das Beispiel-Training zu importieren:

[Beispiel-Training importieren](https://USER.github.io/REPO/?import=https://raw.githubusercontent.com/USER/REPO/main/trainings/beispiel.training.json)

## Eigene Trainings erstellen

1. Kopiere `beispiel.training.json` als Vorlage
2. Passe `id`, `name` und `questions` an
3. Validiere gegen `training.schema.json`
4. Importiere per Drag & Drop oder URL

## Schema-Validierung in VS Code

Füge in `.vscode/settings.json` hinzu:

\`\`\`json
{
  "json.schemas": [
    {
      "fileMatch": ["trainings/*.training.json"],
      "url": "./trainings/training.schema.json"
    }
  ]
}
\`\`\`

## Dateiformat

Siehe Schema für vollständige Dokumentation aller Fragentypen.
```

### README.md Ergänzung

Folgender Abschnitt wird zur Projekt-README hinzugefügt:

```markdown
## Training importieren

Der Vokabeltrainer unterstützt externe Trainingsdateien.

**Beispiel-Training ausprobieren:**
[Beispiel-Training importieren](https://USER.github.io/REPO/?import=https://raw.githubusercontent.com/USER/REPO/main/trainings/beispiel.training.json)

**Eigene Trainings erstellen:**
Siehe [trainings/README.md](trainings/README.md) für Anleitung und Schema.
```
