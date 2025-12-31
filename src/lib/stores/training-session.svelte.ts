// Training Session Store - Manages active training sessions
import type { Question, Training } from '$lib/types';
import { hashQuestion } from '$lib/utils/hash';
import { shuffle } from '$lib/utils/shuffle';
import { logger } from '$lib/utils/logger';
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
		logger.group('TrainingSession', 'Session Start');
		logger.info('TrainingSession', 'Starte Training', {
			trainingCount: trainings.length,
			trainingNames: trainings.map(t => t.name)
		});

		let allQuestions: QueuedQuestion[] = [];
		let skippedCount = 0;

		// Collect questions from selected trainings
		for (const training of trainings) {
			for (const question of training.questions) {
				const hash = hashQuestion(this.getQuestionText(question));

				// Apply spaced repetition skip logic
				if (!scoreStore.shouldSkipQuestion(hash)) {
					allQuestions.push({ question, hash, repeatCount: 0 });
				} else {
					skippedCount++;
				}
			}
		}

		logger.info('TrainingSession', 'Fragen gesammelt', {
			totalAvailable: allQuestions.length + skippedCount,
			skippedBySpacedRepetition: skippedCount,
			afterSkip: allQuestions.length
		});

		// Apply order from config
		if (configStore.order === 'random') {
			allQuestions = shuffle(allQuestions);
			logger.state('TrainingSession', 'Fragen zufällig gemischt');
		} else {
			logger.state('TrainingSession', 'Fragen in Reihenfolge');
		}

		// Apply question count limit
		const questionCount = configStore.questionCount;
		if (questionCount !== 'all' && allQuestions.length > questionCount) {
			allQuestions = allQuestions.slice(0, questionCount);
			logger.state('TrainingSession', 'Fragen auf Limit gekürzt', {
				limit: questionCount,
				finalCount: allQuestions.length
			});
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

		logger.info('TrainingSession', 'Session gestartet', {
			name: this._trainingName,
			totalQuestions: this._queue.length
		});
		logger.groupEnd();
	}

	// Reveal answer (Antwort anzeigen)
	revealAnswer() {
		this._answerRevealed = true;
		logger.action('TrainingSession', 'revealAnswer', {
			position: this.position,
			total: this.total
		});
	}

	// Evaluate answer
	evaluate(isCorrect: boolean) {
		const hash = this.currentHash;
		const questionPreview = this.currentQuestion?.type === 'text'
			? this.currentQuestion.question.slice(0, 50)
			: this.currentQuestion?.type === 'multiple-choice'
				? this.currentQuestion.question.slice(0, 50)
				: 'unknown';

		logger.action('TrainingSession', 'evaluate', {
			position: this.position,
			total: this.total,
			isCorrect,
			hash: hash.slice(0, 8),
			questionPreview
		});

		if (isCorrect) {
			scoreStore.recordCorrect(hash);
			this._correctCount++;
			this._lastResult = 'correct';
			logger.state('TrainingSession', 'Antwort RICHTIG', {
				correctCount: this._correctCount,
				wrongCount: this._wrongCount
			});
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

				logger.state('TrainingSession', 'Antwort FALSCH - Wiederholungen eingefügt', {
					correctCount: this._correctCount,
					wrongCount: this._wrongCount,
					repeatCount: currentQ.repeatCount + 1,
					newQueueLength: this._queue.length
				});
			} else {
				logger.state('TrainingSession', 'Antwort FALSCH - Max Wiederholungen erreicht', {
					correctCount: this._correctCount,
					wrongCount: this._wrongCount
				});
			}
		}

		this._evaluated = true;
	}

	// Advance to next question
	next() {
		const previousPosition = this.position;
		this._currentIndex++;
		this._answerRevealed = false;
		this._evaluated = false;
		this._lastResult = null;

		if (this.isComplete) {
			logger.info('TrainingSession', 'Training abgeschlossen', {
				correctCount: this._correctCount,
				wrongCount: this._wrongCount,
				totalAnswered: this._correctCount + this._wrongCount
			});
		} else {
			logger.action('TrainingSession', 'next', {
				previousPosition,
				newPosition: this.position,
				total: this.total
			});
		}
	}

	// End session
	end() {
		logger.info('TrainingSession', 'Session beendet', {
			name: this._trainingName,
			correctCount: this._correctCount,
			wrongCount: this._wrongCount
		});
		this._active = false;
		this._queue = [];
		this._currentIndex = 0;
		this._trainingName = '';
	}
}

export const trainingSessionStore = new TrainingSessionStore();
