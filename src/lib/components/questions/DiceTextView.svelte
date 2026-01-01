<script lang="ts">
	import type { DiceTextQuestion } from '$lib/types';
	import { normalizeAnswer } from '$lib/utils/answer-check';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: DiceTextQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	let userAnswers = $state<string[]>([]);
	let submittedAnswers = $state<string[] | null>(null);
	let wasCorrect = $state<boolean | null>(null);
	let inputRefs = $state<(HTMLInputElement | undefined)[]>([]);

	// Parse text into words
	let words = $derived(question.text.split(/\s+/));

	// Get correct answers for hidden words
	let correctAnswers = $derived(question.hiddenWords.map((i) => words[i]));

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset when question changes
	$effect(() => {
		const currentHash = question.text;
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			userAnswers = question.hiddenWords.map(() => '');
			submittedAnswers = null;
			wasCorrect = null;
			inputRefs = question.hiddenWords.map(() => undefined);
			logger.state('DiceTextView', 'Neue Frage geladen', {
				hiddenWordCount: question.hiddenWords.length
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			userAnswers = question.hiddenWords.map(() => '');
			submittedAnswers = null;
			wasCorrect = null;
			logger.state('DiceTextView', 'Frage zurückgesetzt (Wiederholung)');
		}
		wasEvaluated = evaluated;

		// Focus first input when question is ready for answering
		if (!evaluated && inputRefs[0]) {
			inputRefs[0].focus();
		}
	});

	function checkWord(index: number): boolean {
		if (!submittedAnswers) return false;
		const userAnswer = submittedAnswers[index] || '';
		const correctAnswer = correctAnswers[index];
		return normalizeAnswer(userAnswer) === normalizeAnswer(correctAnswer);
	}

	function handleSubmit() {
		if (evaluated) return;

		// Check all words
		const allCorrect = userAnswers.every((answer, i) => {
			return normalizeAnswer(answer) === normalizeAnswer(correctAnswers[i]);
		});

		submittedAnswers = [...userAnswers];
		wasCorrect = allCorrect;

		logger.action('DiceTextView', 'handleSubmit', {
			correctCount: userAnswers.filter(
				(a, i) => normalizeAnswer(a) === normalizeAnswer(correctAnswers[i])
			).length,
			totalCount: correctAnswers.length,
			isCorrect: allCorrect
		});

		onSubmit(allCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Ctrl+Enter submits
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault();
			logger.action('DiceTextView', 'Keyboard: Ctrl+Enter (Submit)');
			handleSubmit();
		}
	}

	// Listen for external submit trigger
	function handleTriggerSubmit() {
		if (!evaluated) {
			handleSubmit();
		}
	}

	$effect(() => {
		window.addEventListener('trigger-submit', handleTriggerSubmit);
		return () => window.removeEventListener('trigger-submit', handleTriggerSubmit);
	});

	// Get the index in hiddenWords array for a word index
	function getHiddenIndex(wordIndex: number): number {
		return question.hiddenWords.indexOf(wordIndex);
	}

	function getInputClass(hiddenIndex: number): string {
		if (!evaluated || submittedAnswers === null) return '';
		return checkWord(hiddenIndex) ? 'correct' : 'wrong';
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="dice-text-question">
	<div class="question">
		{@html question.question}
	</div>

	<div class="dice-text">
		{#each words as word, i}
			{#if question.hiddenWords.includes(i)}
				{@const hiddenIndex = getHiddenIndex(i)}
				<span class="input-wrapper">
					<input
						type="text"
						bind:this={inputRefs[hiddenIndex]}
						bind:value={userAnswers[hiddenIndex]}
						onkeydown={handleKeydown}
						disabled={evaluated}
						class="word-input {getInputClass(hiddenIndex)}"
						style="width: {Math.max(word.length * 0.7, 3)}em;"
						placeholder="..."
					/>
					{#if evaluated && submittedAnswers !== null && !checkWord(hiddenIndex)}
						<span class="correct-word" title="Richtige Antwort">{word}</span>
					{/if}
				</span>
			{:else}
				<span class="visible-word">{word}</span>
			{/if}
			{' '}
		{/each}
	</div>

	{#if evaluated && submittedAnswers !== null}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig – Alle Wörter korrekt ausgefüllt
			{:else}
				{@const correctCount = submittedAnswers.filter(
					(a, i) => normalizeAnswer(a) === normalizeAnswer(correctAnswers[i])
				).length}
				✗ Falsch – {correctCount} von {correctAnswers.length} Wörtern richtig
			{/if}
		</div>
	{/if}

	{#if revealed && !evaluated}
		<div class="revealed-answers">
			<strong>Richtige Antworten:</strong>
			{correctAnswers.join(', ')}
		</div>
	{/if}
</div>

<style>
	.dice-text-question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.dice-text {
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
		line-height: 2.2;
		font-size: 1.125rem;
	}

	.visible-word {
		display: inline;
	}

	.input-wrapper {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		vertical-align: bottom;
		position: relative;
	}

	.word-input {
		padding: 0.25rem 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		border: 2px solid var(--color-border);
		border-radius: 0.25rem;
		text-align: center;
		min-width: 3em;
	}

	.word-input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
	}

	.word-input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	.word-input.correct {
		border-color: var(--color-success);
		background-color: #e8f5e9;
	}

	.word-input.wrong {
		border-color: var(--color-error);
		background-color: #ffebee;
	}

	.correct-word {
		position: absolute;
		bottom: -1.25rem;
		font-size: 0.75rem;
		color: var(--color-success);
		font-weight: 600;
		white-space: nowrap;
	}

	.result-banner {
		padding: 1rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-align: center;
	}

	.result-banner.correct {
		background-color: #e8f5e9;
		color: var(--color-success);
	}

	.result-banner.wrong {
		background-color: #ffebee;
		color: var(--color-error);
	}

	.revealed-answers {
		padding: 1rem;
		background-color: #e8f5e9;
		border-left: 4px solid var(--color-success);
		border-radius: 0.25rem;
	}
</style>
