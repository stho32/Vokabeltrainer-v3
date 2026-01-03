// Store für importierte Trainings
import { browser } from '$app/environment';
import type { Training } from '$lib/types';
import { logger } from '$lib/utils/logger';

const STORAGE_KEY = 'ImportierteTrainings';

class ImportedTrainingsStore {
	private trainings = $state<Training[]>([]);

	constructor() {
		if (browser) {
			this.loadFromStorage();
		}
	}

	private loadFromStorage() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) {
					this.trainings = parsed;
					logger.info('ImportedTrainingsStore', 'Trainings aus LocalStorage geladen', {
						count: this.trainings.length
					});
				}
			}
		} catch {
			logger.event('ImportedTrainingsStore', 'Fehler beim Laden aus LocalStorage');
		}
	}

	private saveToStorage() {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.trainings));
			logger.state('ImportedTrainingsStore', 'Trainings in LocalStorage gespeichert', {
				count: this.trainings.length
			});
		}
	}

	add(training: Training): boolean {
		// Prüfen ob ID bereits existiert
		if (this.hasId(training.id)) {
			logger.action('ImportedTrainingsStore', 'Training-ID bereits vorhanden', {
				id: training.id
			});
			return false;
		}

		// Source sicherstellen
		training.source = 'imported';

		this.trainings.push(training);
		this.saveToStorage();

		logger.action('ImportedTrainingsStore', 'Training hinzugefügt', {
			id: training.id,
			name: training.name,
			questionCount: training.questions.length
		});

		return true;
	}

	update(training: Training): boolean {
		const index = this.trainings.findIndex((t) => t.id === training.id);
		if (index === -1) {
			return false;
		}

		training.source = 'imported';
		this.trainings[index] = training;
		this.saveToStorage();

		logger.action('ImportedTrainingsStore', 'Training aktualisiert', {
			id: training.id,
			name: training.name
		});

		return true;
	}

	addOrUpdate(training: Training): void {
		if (this.hasId(training.id)) {
			this.update(training);
		} else {
			this.add(training);
		}
	}

	remove(id: string): boolean {
		const index = this.trainings.findIndex((t) => t.id === id);
		if (index === -1) {
			return false;
		}

		const removed = this.trainings.splice(index, 1)[0];
		this.saveToStorage();

		logger.action('ImportedTrainingsStore', 'Training entfernt', {
			id: removed.id,
			name: removed.name
		});

		return true;
	}

	clear(): void {
		const count = this.trainings.length;
		this.trainings = [];
		this.saveToStorage();

		logger.action('ImportedTrainingsStore', 'Alle Trainings entfernt', { count });
	}

	getAll(): Training[] {
		return this.trainings;
	}

	getById(id: string): Training | undefined {
		return this.trainings.find((t) => t.id === id);
	}

	hasId(id: string): boolean {
		return this.trainings.some((t) => t.id === id);
	}

	get count(): number {
		return this.trainings.length;
	}
}

export const importedTrainingsStore = new ImportedTrainingsStore();
