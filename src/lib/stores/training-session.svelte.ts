// Training Session Store - Manages active training sessions
import { browser } from '$app/environment';
import type { Question, Training } from '$lib/types';
import { hashQuestion } from '$lib/utils/hash';
import { shuffle } from '$lib/utils/shuffle';
import { scoreStore } from './scores.svelte';
import { configStore } from './config.svelte';

interface QueuedQuestion {
	question: Question;
	hash: string;
	repeatCount: number;
}

class TrainingSessionStore {
	// Session state
	private _active = $state(false);
	private _trainingName = $state('');
	private _queue = $state<QueuedQuestion[]>([]);
	private _currentIndex = $state(0);

	// Statistics
	private _correctCount = $state(0);
	private _wrongCount = $state(0);

	// UI state
	private _answerRevealed = $state(false);
	private _evaluated = $state(false);
	private _lastResult = $state<'correct' | 'wrong' | null>(null);

	// Getters
	get isActive() {
		return this._active;
	}
	get name() {
		return this._trainingName;
	}
	get currentQuestion(): Question | null {
		return this._queue[this._currentIndex]?.question ?? null;
	}
	get currentHash(): string {
		return this._queue[this._currentIndex]?.hash ?? '';
	}
	get position() {
		return this._currentIndex + 1;
	}
	get total() {
		return this._queue.length;
	}
	get correctCount() {
		return this._correctCount;
	}
	get wrongCount() {
		return this._wrongCount;
	}
	get isRevealed() {
		return this._answerRevealed;
	}
	get isEvaluated() {
		return this._evaluated;
	}
	get lastResult() {
		return this._lastResult;
	}
	get isComplete() {
		return this._currentIndex >= this._queue.length;
	}

	// Get question text for hashing
	private getQuestionText(question: Question): string {
		if (question.type === 'word-search') {
			return question.title;
		}
		return question.question;
	}

	// Start training with selected trainings
	start(trainings: Training[]) {
		let allQuestions: QueuedQuestion[] = [];

		// Collect questions from selected trainings
		for (const training of trainings) {
			for (const question of training.questions) {
				const hash = hashQuestion(this.getQuestionText(question));

				// Apply spaced repetition skip logic
				if (!scoreStore.shouldSkipQuestion(hash)) {
					allQuestions.push({ question, hash, repeatCount: 0 });
				}
			}
		}

		// Apply order from config
		if (configStore.order === 'random') {
			allQuestions = shuffle(allQuestions);
		}

		// Apply question count limit
		const questionCount = configStore.questionCount;
		if (questionCount !== 'all' && allQuestions.length > questionCount) {
			allQuestions = allQuestions.slice(0, questionCount);
		}

		// Initialize session
		this._trainingName =
			trainings.length === 1 ? trainings[0].name : `${trainings.length} Trainings`;
		this._queue = allQuestions;
		this._currentIndex = 0;
		this._correctCount = 0;
		this._wrongCount = 0;
		this._answerRevealed = false;
		this._evaluated = false;
		this._lastResult = null;
		this._active = true;
	}

	// Reveal answer (Antwort anzeigen)
	revealAnswer() {
		this._answerRevealed = true;
	}

	// Evaluate answer
	evaluate(isCorrect: boolean) {
		const hash = this.currentHash;

		if (isCorrect) {
			scoreStore.recordCorrect(hash);
			this._correctCount++;
			this._lastResult = 'correct';
		} else {
			scoreStore.recordWrong(hash);
			this._wrongCount++;
			this._lastResult = 'wrong';

			// Insert repetitions for wrong answer (R00005)
			const currentQ = this._queue[this._currentIndex];
			if (currentQ && currentQ.repeatCount < 2) {
				// Insert at positions +1 and +2 (immediate repetitions)
				const repeat1: QueuedQuestion = { ...currentQ, repeatCount: currentQ.repeatCount + 1 };
				const repeat2: QueuedQuestion = { ...currentQ, repeatCount: currentQ.repeatCount + 1 };

				// Insert immediate repeats
				this._queue = [
					...this._queue.slice(0, this._currentIndex + 1),
					repeat1,
					repeat2,
					...this._queue.slice(this._currentIndex + 1)
				];

				// Insert one more at a random later position
				const remainingLength = this._queue.length - this._currentIndex - 3;
				if (remainingLength > 0) {
					const laterOffset = Math.floor(Math.random() * remainingLength);
					const laterIndex = this._currentIndex + 3 + laterOffset;
					const repeat3: QueuedQuestion = { ...currentQ, repeatCount: currentQ.repeatCount + 1 };
					this._queue = [
						...this._queue.slice(0, laterIndex),
						repeat3,
						...this._queue.slice(laterIndex)
					];
				}
			}
		}

		this._evaluated = true;
	}

	// Advance to next question
	next() {
		this._currentIndex++;
		this._answerRevealed = false;
		this._evaluated = false;
		this._lastResult = null;
	}

	// End session
	end() {
		this._active = false;
		this._queue = [];
		this._currentIndex = 0;
		this._trainingName = '';
	}
}

export const trainingSessionStore = new TrainingSessionStore();
