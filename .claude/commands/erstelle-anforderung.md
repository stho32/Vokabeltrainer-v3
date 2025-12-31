# Erstelle Anforderung

Erstellt eine neue, strukturierte Anforderungsdokumentation im Verzeichnis `./Anforderungen` mit fortlaufender R-Nummerierung.

## Argumente
- `$ARGUMENTS`: Beschreibung der gewünschten Funktionalität/Feature als Prompt (z.B. "Würfeltextfragen mit verdeckten Wörtern zum Ausfüllen")

## Zweck

Dieses Command erstellt eine vollständige Anforderungsspezifikation für neue Features des Vokabeltrainers. Die Anforderung wird:
- Mit dem nächsten freien R-Prefix nummeriert (z.B. R00009)
- Im Anforderungen-Verzeichnis abgelegt
- Bis auf Datei- und Komponentenebene aufgeschlüsselt

## Plan

### Phase 1: Analyse & Vorbereitung

1. **Nächste freie Nummer ermitteln**
   - Anforderungen-Verzeichnis scannen
   - Höchste R-Nummer finden
   - Nächste Nummer reservieren (5-stellig mit führenden Nullen)

2. **Prompt analysieren**
   - Kernfunktionalität identifizieren
   - Abhängigkeiten zu bestehenden Features erkennen
   - Fragentyp-Bezug prüfen (falls relevant)

3. **Codebase-Kontext sammeln**
   - Relevante bestehende Komponenten identifizieren
   - Verwendete Patterns verstehen
   - Store-Abhängigkeiten prüfen

### Phase 2: Spezifikation erstellen

1. **Beschreibung formulieren**
   - Klare, prägnante Zusammenfassung
   - Deutsche Sprache verwenden

2. **Akzeptanzkriterien definieren**
   - In logische Gruppen unterteilen
   - Checkbox-Format für Tracking
   - Konkret und testbar formulieren

3. **Technische Details ausarbeiten**
   - Zielverzeichnisse benennen
   - Zieldateien auflisten (neu/zu ändern)
   - Vermutete Komponenten spezifizieren
   - Test-Strategie skizzieren

### Phase 3: Dateien & Komponenten aufschlüsseln

1. **Neue Dateien identifizieren**
   ```
   src/lib/components/[NeueKomponente].svelte
   src/lib/types/[NeuerTyp].ts
   src/lib/stores/[NeuerStore].svelte.ts
   ```

2. **Zu ändernde Dateien identifizieren**
   ```
   src/lib/types/index.ts (Typ-Erweiterung)
   src/routes/[route]/+page.svelte
   ```

3. **Testdateien planen**
   ```
   src/lib/components/__tests__/[Komponente].test.ts
   ```

### Phase 4: Dokument erstellen

1. **Dateiname generieren**
   - Format: `RXXXXX-kebab-case-titel.md`
   - Aus Prompt-Kernbegriff ableiten

2. **Anforderungsdokument schreiben**
   - Struktur gemäß Template
   - Alle Checkboxen auf `[ ]` setzen
   - Status auf "Offen" setzen

## Template

```markdown
# RXXXXX: [Titel]

## Beschreibung

[2-3 Sätze zur Kernfunktionalität]

## Akzeptanzkriterien

### [Kategorie 1]
- [ ] Kriterium 1
- [ ] Kriterium 2

### [Kategorie 2]
- [ ] Kriterium 3
- [ ] Kriterium 4

## Status

- [ ] Offen

## Technische Details

### Zielverzeichnisse

| Verzeichnis | Zweck |
|------------|-------|
| `src/lib/components/` | Neue UI-Komponenten |
| `src/lib/types/` | Typdefinitionen |

### Neue Dateien

| Datei | Beschreibung |
|-------|--------------|
| `src/lib/components/[Name].svelte` | [Zweck] |
| `src/lib/types/[Name].ts` | [Zweck] |

### Zu ändernde Dateien

| Datei | Änderung |
|-------|----------|
| `src/lib/types/index.ts` | [Beschreibung] |

### Vermutete Komponenten

| Komponente | Verantwortung |
|------------|---------------|
| `[Name]` | [Beschreibung] |

### Tests

| Testdatei | Prüft |
|-----------|-------|
| `[Pfad]` | [Was wird getestet] |

## Abhängigkeiten

- Abhängig von: [RXXXXX falls vorhanden]
- Blockiert: [RXXXXX falls vorhanden]

## Notizen

[Optionale zusätzliche Informationen]
```

## Adaptive Ausführung

Bei der Ausführung dieses Commands:

1. **Kontext verstehen**: Den Prompt des Users analysieren und verstehen, welches Feature gewünscht wird.

2. **Codebase erkunden**: Bestehende Patterns und Konventionen im Projekt identifizieren:
   - Wie sind bestehende Komponenten strukturiert?
   - Welche Stores gibt es bereits?
   - Wie sind Fragentypen implementiert?

3. **Realistische Aufschlüsselung**: Nur Dateien und Komponenten auflisten, die tatsächlich benötigt werden - nicht mehr, nicht weniger.

4. **Konsistenz wahren**: Namenskonventionen und Strukturen des Projekts folgen (deutsche Sprache, Svelte 5 Patterns).

5. **Abschluss**: Den Pfad zur erstellten Anforderung ausgeben.

Laufzeit-Argumente: $ARGUMENTS
