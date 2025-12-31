// Trainings-Konfiguration Store
import { browser } from '$app/environment';
import type { TrainingConfig } from '$lib/types';
import { logger } from '$lib/utils/logger';

const STORAGE_KEYS = {
	trainingsAuswahl: 'trainingsAuswahl',
	anzahlAuswahl: 'AnzahlAuswahl',
	reihenfolgeAuswahl: 'ReihenfolgeAuswahl'
};

class ConfigStore {
	selectedTrainings = $state<string[]>([]);
	questionCount = $state<number | 'all'>(30);
	order = $state<'sequential' | 'random'>('random');

	constructor() {
		if (browser) {
			this.loadFromStorage();
		}
	}

	private loadFromStorage() {
		try {
			const trainings = localStorage.getItem(STORAGE_KEYS.trainingsAuswahl);
			if (trainings) {
				this.selectedTrainings = JSON.parse(trainings);
			}

			const count = localStorage.getItem(STORAGE_KEYS.anzahlAuswahl);
			if (count) {
				this.questionCount = count === 'all' ? 'all' : parseInt(count, 10);
			}

			const order = localStorage.getItem(STORAGE_KEYS.reihenfolgeAuswahl);
			if (order === 'sequential' || order === 'random') {
				this.order = order;
			}
			logger.info('ConfigStore', 'Konfiguration aus LocalStorage geladen', {
				selectedTrainings: this.selectedTrainings,
				questionCount: this.questionCount,
				order: this.order
			});
		} catch {
			logger.event('ConfigStore', 'Fehler beim Laden der Konfiguration aus LocalStorage');
		}
	}

	private saveToStorage() {
		if (browser) {
			localStorage.setItem(STORAGE_KEYS.trainingsAuswahl, JSON.stringify(this.selectedTrainings));
			localStorage.setItem(STORAGE_KEYS.anzahlAuswahl, String(this.questionCount));
			localStorage.setItem(STORAGE_KEYS.reihenfolgeAuswahl, this.order);
			logger.state('ConfigStore', 'Konfiguration in LocalStorage gespeichert');
		}
	}

	setSelectedTrainings(trainings: string[]) {
		logger.action('ConfigStore', 'setSelectedTrainings', { trainings });
		this.selectedTrainings = trainings;
		this.saveToStorage();
	}

	toggleTraining(trainingId: string) {
		const index = this.selectedTrainings.indexOf(trainingId);
		const wasSelected = index !== -1;
		if (index === -1) {
			this.selectedTrainings.push(trainingId);
		} else {
			this.selectedTrainings.splice(index, 1);
		}
		logger.action('ConfigStore', 'toggleTraining', {
			trainingId,
			action: wasSelected ? 'deselected' : 'selected',
			totalSelected: this.selectedTrainings.length
		});
		this.saveToStorage();
	}

	setQuestionCount(count: number | 'all') {
		const previousCount = this.questionCount;
		this.questionCount = count;
		logger.action('ConfigStore', 'setQuestionCount', {
			previousCount,
			newCount: count
		});
		this.saveToStorage();
	}

	setOrder(order: 'sequential' | 'random') {
		const previousOrder = this.order;
		this.order = order;
		logger.action('ConfigStore', 'setOrder', {
			previousOrder,
			newOrder: order
		});
		this.saveToStorage();
	}

	getConfig(): TrainingConfig {
		return {
			selectedTrainings: this.selectedTrainings,
			questionCount: this.questionCount,
			order: this.order
		};
	}
}

export const configStore = new ConfigStore();
