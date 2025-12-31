# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vokabeltrainer is a web-based learning platform for vocabulary and knowledge questions using Spaced Repetition. The application is written in German.

## Commands

```bash
npm run dev          # Start dev server at localhost:5173
npm run build        # Production build
npm run check        # TypeScript and Svelte type checking
npm run check:watch  # Type checking in watch mode
```

## Tech Stack

- **Svelte 5** with runes-based reactivity (`$state`, `$derived`, `$effect`, `$props`)
- **SvelteKit 2.x** for routing and SSR
- **TypeScript**
- **Vite 6**

## Architecture

### State Management Pattern

Global stores use class-based pattern with Svelte 5 runes in `.svelte.ts` files:

```typescript
// src/lib/stores/example.svelte.ts
class ExampleStore {
  private value = $state<Type>(initial);

  getValue() { return this.value; }
  setValue(v: Type) { this.value = v; }
}
export const exampleStore = new ExampleStore();
```

Key stores:
- `scoreStore` (scores.svelte.ts) - Spaced repetition scores per question (LocalStorage persisted)
- `configStore` (config.svelte.ts) - Training configuration (selected trainings, question count, order)

### Question Types

Defined in `src/lib/types/index.ts`:
- `TextQuestion` - Free text input with tolerant answer checking
- `MultipleChoiceQuestion` - Multiple choice with explanations
- `DiceTextQuestion` - Text with hidden words to fill in
- `WordSearchQuestion` - Word search puzzle

### Spaced Repetition System

Score range: -20 to +10 per question
- Correct answer: +1 point
- Wrong answer: -5 points
- Higher scores increase skip probability during training

### LocalStorage Keys

- `Aufgabenpunkte` - Question scores map
- `trainingsAuswahl` - Selected training IDs
- `AnzahlAuswahl` - Question count setting
- `ReihenfolgeAuswahl` - Order setting (sequential/random)

## Svelte 5 Conventions

- Use `$state()` for reactive variables
- Use `$derived()` for computed values (not `$effect` for state sync)
- Use `$props()` for component properties
- Store files use `.svelte.ts` extension for runes support
- Check `$app/environment.browser` before accessing browser APIs

## Requirements Documentation

Feature requirements are documented in `Anforderungen/` directory with German descriptions.

## Architecture Reference

Detailed Svelte 5 patterns and best practices are in `.claude/app-architectures/svelte-app-architecture/`.
