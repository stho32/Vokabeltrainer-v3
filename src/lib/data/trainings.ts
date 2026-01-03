// Training data for Vokabeltrainer
import type { Training } from '$lib/types';
import { importedTrainingsStore } from '$lib/stores/imported-trainings.svelte';

// Import all trainings from separate files
import { testTraining } from './trainings/test-training';

// Eingebaute Trainings (mit source markiert)
const builtinTrainings: Training[] = [{ ...testTraining, source: 'builtin' as const }];

// Abwärtskompatibilität: Export der eingebauten Trainings
export const trainings: Training[] = builtinTrainings;

// Alle Trainings (eingebaut + importiert)
export function getAllTrainings(): Training[] {
	return [...builtinTrainings, ...importedTrainingsStore.getAll()];
}

export function getTrainingById(id: string): Training | undefined {
	// Zuerst in eingebauten suchen
	const builtin = builtinTrainings.find((t) => t.id === id);
	if (builtin) return builtin;

	// Dann in importierten suchen
	return importedTrainingsStore.getById(id);
}

export function getSelectedTrainings(ids: string[]): Training[] {
	const all = getAllTrainings();
	return all.filter((t) => ids.includes(t.id));
}

export function getTrainingsSorted(): Training[] {
	const all = getAllTrainings();
	return all.sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

export function isBuiltinTraining(id: string): boolean {
	return builtinTrainings.some((t) => t.id === id);
}

export function isImportedTraining(id: string): boolean {
	return importedTrainingsStore.hasId(id);
}

// Re-export individual trainings for direct access
export { testTraining };
