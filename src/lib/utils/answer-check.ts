// Answer checking utilities with tolerance for typos

export function normalizeAnswer(answer: string): string {
	return answer.toLowerCase().trim().replace(/\s+/g, ' ');
}

export function checkTextAnswer(userAnswer: string, correctAnswers: string | string[]): boolean {
	const normalized = normalizeAnswer(userAnswer);
	const answers = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];

	return answers.some((answer) => normalizeAnswer(answer) === normalized);
}

export function checkMultipleChoice(selected: number[], correct: number[]): boolean {
	if (selected.length !== correct.length) return false;
	const sortedSelected = [...selected].sort();
	const sortedCorrect = [...correct].sort();
	return sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
}
