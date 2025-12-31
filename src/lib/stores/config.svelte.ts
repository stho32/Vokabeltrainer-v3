// Trainings-Konfiguration Store
import { browser } from '$app/environment';
import type { TrainingConfig } from '$lib/types';

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
		} catch {
			console.warn('Failed to load config from storage');
		}
	}

	private saveToStorage() {
		if (browser) {
			localStorage.setItem(STORAGE_KEYS.trainingsAuswahl, JSON.stringify(this.selectedTrainings));
			localStorage.setItem(STORAGE_KEYS.anzahlAuswahl, String(this.questionCount));
			localStorage.setItem(STORAGE_KEYS.reihenfolgeAuswahl, this.order);
		}
	}

	setSelectedTrainings(trainings: string[]) {
		this.selectedTrainings = trainings;
		this.saveToStorage();
	}

	toggleTraining(trainingId: string) {
		const index = this.selectedTrainings.indexOf(trainingId);
		if (index === -1) {
			this.selectedTrainings.push(trainingId);
		} else {
			this.selectedTrainings.splice(index, 1);
		}
		this.saveToStorage();
	}

	setQuestionCount(count: number | 'all') {
		this.questionCount = count;
		this.saveToStorage();
	}

	setOrder(order: 'sequential' | 'random') {
		this.order = order;
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
