# Vokabeltrainer

Webbasierte Lernplattform für Vokabeln und Wissensfragen mit Spaced Repetition.

## Tech Stack

- **Svelte 5** mit Runes-basiertem Reaktivitätssystem
- **SvelteKit 2.x** für Full-Stack-Entwicklung
- **TypeScript** für Typsicherheit
- **Vite** als Build-Tool

## Features

- **Textfragen** mit toleranter Antwortprüfung
- **Multiple-Choice-Fragen** mit Mehrfachauswahl
- **Spaced Repetition** Algorithmus für effektives Lernen
- **LocalStorage** Persistierung aller Fortschritte
- **Tastaturkürzel** für effizientes Arbeiten

## Anforderungen

Siehe [Anforderungen/](./Anforderungen/) für detaillierte Anforderungsdokumentation.

### Aktuelle Anforderungen

| Nr. | Titel | Status |
|-----|-------|--------|
| R00001 | Textfragen | Nicht begonnen |
| R00002 | Multiple-Choice-Fragen | Nicht begonnen |
| R00003 | Trainingsauswahl | Nicht begonnen |
| R00004 | Aufgabenpunktesystem (Spaced Repetition) | Nicht begonnen |
| R00005 | Trainingsablauf | Nicht begonnen |
| R00006 | Datenspeicherung (LocalStorage) | Nicht begonnen |
| R00007 | Tastaturkürzel | Nicht begonnen |

## Erste Schritte

### Voraussetzungen

- Node.js 18+
- npm oder pnpm

### Installation

```bash
npm install
```

### Entwicklung

```bash
npm run dev
```

Die Anwendung ist dann unter http://localhost:5173 erreichbar.

### Build

```bash
npm run build
```

### Vorschau

```bash
npm run preview
```

## Projektstruktur

```
src/
├── lib/
│   ├── components/     # Wiederverwendbare UI-Komponenten
│   ├── stores/         # Svelte Stores für State Management
│   ├── utils/          # Hilfsfunktionen
│   └── types/          # TypeScript Typdefinitionen
├── routes/             # SvelteKit Routen
├── app.html            # HTML-Template
└── app.css             # Globale Styles
```

## Architektur-Dokumentation

Siehe [.claude/app-architectures/svelte-app-architecture/](./.claude/app-architectures/svelte-app-architecture/) für Svelte 5 Best Practices und Patterns.

## Lizenz

Privates Projekt
