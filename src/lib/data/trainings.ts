// Training data for Vokabeltrainer
// Quelle: NCI Graduate School - Applied Behavior Research (Chase Hughes)
import type { Training } from '$lib/types';

// Import all trainings from separate files
import { needsMap } from './trainings/needs-map';

export const trainings: Training[] = [needsMap];

export function getTrainingById(id: string): Training | undefined {
	return trainings.find((t) => t.id === id);
}

export function getSelectedTrainings(ids: string[]): Training[] {
	return trainings.filter((t) => ids.includes(t.id));
}

export function getTrainingsSorted(): Training[] {
	return [...trainings].sort((a, b) => a.name.localeCompare(b.name, 'de'));
}

// Re-export individual trainings for direct access
export { needsMap };
