// Type definitions for Vokabeltrainer

export interface TextQuestion {
	type: 'text';
	question: string;
	answer: string | string[];
	initialValue?: string;
}

export interface MultipleChoiceOption {
	text: string;
	correct: boolean;
	explanation?: string;
}

export interface MultipleChoiceQuestion {
	type: 'multiple-choice';
	question: string;
	options: MultipleChoiceOption[];
}

export interface DiceTextQuestion {
	type: 'dice-text';
	question: string;
	text: string;
	hiddenWords: number[];
}

export interface WordSearchQuestion {
	type: 'word-search';
	title: string;
	question: string;
	answer: string;
}

export type Question = TextQuestion | MultipleChoiceQuestion | DiceTextQuestion | WordSearchQuestion;

export interface Training {
	id: string;
	name: string;
	questions: Question[];
}

export interface QuestionScore {
	hash: string;
	score: number;
}

export interface TrainingConfig {
	selectedTrainings: string[];
	questionCount: number | 'all';
	order: 'sequential' | 'random';
}

export interface TrainingState {
	currentIndex: number;
	questions: Question[];
	correctCount: number;
	wrongCount: number;
	isActive: boolean;
}
