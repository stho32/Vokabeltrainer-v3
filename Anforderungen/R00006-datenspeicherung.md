# R00006: Datenspeicherung (LocalStorage)

## Beschreibung

Persistierung aller Einstellungen und Fortschritte im LocalStorage des Browsers.

## Akzeptanzkriterien

- [x] Trainingsauswahl wird gespeichert und beim Start wiederhergestellt
- [x] Fragenanzahl-Auswahl wird gespeichert und wiederhergestellt
- [x] Reihenfolge-Auswahl wird gespeichert und wiederhergestellt
- [x] Aufgabenpunkte werden gespeichert und wiederhergestellt
- [x] Daten bleiben über Browser-Sessions hinweg erhalten
- [x] Fehlerhafte Daten werden graceful behandelt (Fallback auf Defaults)

## Status

- [x] Abgeschlossen

## Technische Details

### LocalStorage Keys

| Key | Typ | Beschreibung |
|-----|-----|--------------|
| `trainingsAuswahl` | `string[]` (JSON) | Array der ausgewählten Training-IDs |
| `AnzahlAuswahl` | `string` | Gewählte Fragenanzahl ("5", "30", "45", "100", "all") |
| `ReihenfolgeAuswahl` | `string` | "sequential" oder "random" |
| `Aufgabenpunkte` | `object` (JSON) | Hash-zu-Punkte Mapping |

### Fehlerbehandlung

```typescript
function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return JSON.parse(stored);
  } catch {
    console.warn(`Failed to load ${key} from storage`);
    return defaultValue;
  }
}
```

## Notizen

Die Speicherung erfolgt automatisch bei jeder Änderung der Einstellungen.
