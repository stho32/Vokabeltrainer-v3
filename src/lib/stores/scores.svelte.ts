// Aufgabenpunkte-Store für Spaced Repetition
import { browser } from '$app/environment';

const STORAGE_KEY = 'Aufgabenpunkte';
const MIN_SCORE = -20;
const MAX_SCORE = 10;
const CORRECT_POINTS = 1;
const WRONG_POINTS = -5;

class ScoreStore {
	private scores = $state<Map<string, number>>(new Map());

	constructor() {
		if (browser) {
			this.loadFromStorage();
		}
	}

	private loadFromStorage() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored) as Record<string, number>;
				this.scores = new Map(Object.entries(parsed));
			}
		} catch {
			console.warn('Failed to load scores from storage');
		}
	}

	private saveToStorage() {
		if (browser) {
			const obj = Object.fromEntries(this.scores);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
		}
	}

	getScore(hash: string): number {
		return this.scores.get(hash) ?? 0;
	}

	hasScore(hash: string): boolean {
		return this.scores.has(hash);
	}

	recordCorrect(hash: string): number {
		const current = this.getScore(hash);
		const newScore = Math.min(current + CORRECT_POINTS, MAX_SCORE);
		this.scores.set(hash, newScore);
		this.saveToStorage();
		return newScore;
	}

	recordWrong(hash: string): number {
		const current = this.getScore(hash);
		const newScore = Math.max(current + WRONG_POINTS, MIN_SCORE);
		this.scores.set(hash, newScore);
		this.saveToStorage();
		return newScore;
	}

	shouldSkipQuestion(hash: string): boolean {
		const score = this.getScore(hash);
		if (score <= 0) return false;
		// Higher score = higher chance to skip
		const skipProbability = score / MAX_SCORE;
		return Math.random() < skipProbability;
	}

	getTotalScore(): number {
		let total = 0;
		for (const score of this.scores.values()) {
			total += score;
		}
		return total;
	}

	getMaxPossibleScore(): number {
		return this.scores.size * MAX_SCORE;
	}

	getScorePercentage(): number {
		const max = this.getMaxPossibleScore();
		if (max === 0) return 100;
		return Math.round((this.getTotalScore() / max) * 100);
	}
}

export const scoreStore = new ScoreStore();
