<script lang="ts">
	import type { TrueFalseQuestion } from '$lib/types';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: TrueFalseQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	let selectedAnswer = $state<boolean | null>(null);
	let submittedAnswer = $state<boolean | null>(null);
	let wasCorrect = $state<boolean | null>(null);
	let wahrButtonRef: HTMLButtonElement | undefined = $state();

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset when question changes
	$effect(() => {
		const currentHash = question.statement;
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			selectedAnswer = null;
			submittedAnswer = null;
			wasCorrect = null;
			logger.state('TrueFalseView', 'Neue Frage geladen', {
				statementPreview: question.statement.slice(0, 50)
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			selectedAnswer = null;
			submittedAnswer = null;
			wasCorrect = null;
			logger.state('TrueFalseView', 'Frage zurückgesetzt (Wiederholung)', {
				statementPreview: question.statement.slice(0, 50)
			});
		}
		wasEvaluated = evaluated;

		// Focus first button when question is ready for answering
		if (!evaluated && wahrButtonRef) {
			wahrButtonRef.focus();
		}
	});

	function selectAnswer(value: boolean) {
		if (evaluated) return;
		selectedAnswer = value;
		logger.action('TrueFalseView', 'Antwort ausgewählt', { value: value ? 'Wahr' : 'Falsch' });
	}

	function handleSubmit() {
		if (evaluated || selectedAnswer === null) return;
		const isCorrect = selectedAnswer === question.correct;
		submittedAnswer = selectedAnswer;
		wasCorrect = isCorrect;
		logger.action('TrueFalseView', 'handleSubmit', {
			selectedAnswer: selectedAnswer ? 'Wahr' : 'Falsch',
			correctAnswer: question.correct ? 'Wahr' : 'Falsch',
			isCorrect
		});
		onSubmit(isCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (evaluated) return;

		// 1 = Wahr
		if (event.key === '1') {
			event.preventDefault();
			logger.action('TrueFalseView', 'Keyboard: 1 (Wahr)');
			selectAnswer(true);
		}

		// 2 = Falsch
		if (event.key === '2') {
			event.preventDefault();
			logger.action('TrueFalseView', 'Keyboard: 2 (Falsch)');
			selectAnswer(false);
		}

		// Enter = Submit
		if (event.key === 'Enter' && selectedAnswer !== null) {
			event.preventDefault();
			logger.action('TrueFalseView', 'Keyboard: Enter (Submit)');
			handleSubmit();
		}

		// Ctrl+Enter = Submit (auch wenn nichts ausgewählt)
		if (event.key === 'Enter' && event.ctrlKey && selectedAnswer !== null) {
			event.preventDefault();
			logger.action('TrueFalseView', 'Keyboard: Ctrl+Enter (Submit)');
			handleSubmit();
		}
	}

	// Listen for external submit trigger
	function handleTriggerSubmit() {
		if (!evaluated && selectedAnswer !== null) {
			handleSubmit();
		}
	}

	$effect(() => {
		window.addEventListener('trigger-submit', handleTriggerSubmit);
		return () => window.removeEventListener('trigger-submit', handleTriggerSubmit);
	});

	function getButtonClass(value: boolean): string {
		if (!evaluated) {
			return selectedAnswer === value ? 'selected' : '';
		}

		// Nach Auswertung
		const isCorrectAnswer = question.correct === value;
		const wasSelected = submittedAnswer === value;

		if (isCorrectAnswer && wasSelected) return 'correct selected';
		if (isCorrectAnswer && !wasSelected) return 'correct';
		if (!isCorrectAnswer && wasSelected) return 'wrong selected';
		return '';
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="true-false-question">
	<div class="question">
		{@html question.question}
	</div>

	<div class="statement">
		{question.statement}
	</div>

	<div class="buttons">
		<button
			bind:this={wahrButtonRef}
			class="answer-button {getButtonClass(true)}"
			onclick={() => selectAnswer(true)}
			disabled={evaluated}
		>
			<span class="key-hint">1</span>
			Wahr
		</button>
		<button
			class="answer-button {getButtonClass(false)}"
			onclick={() => selectAnswer(false)}
			disabled={evaluated}
		>
			<span class="key-hint">2</span>
			Falsch
		</button>
	</div>

	{#if evaluated && submittedAnswer !== null}
		<div class="result-banner" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			{#if wasCorrect}
				✓ Richtig
			{:else}
				✗ Falsch – Die Aussage ist {question.correct ? 'wahr' : 'falsch'}
			{/if}
		</div>
	{/if}

	{#if (revealed || evaluated) && question.explanation}
		<div class="explanation">
			<strong>Erklärung:</strong>
			{question.explanation}
		</div>
	{/if}
</div>

<style>
	.true-false-question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.statement {
		font-size: 1.125rem;
		padding: 1rem;
		background-color: #f8f9fa;
		border-radius: 0.5rem;
		border-left: 4px solid var(--color-primary);
		font-style: italic;
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}

	.answer-button {
		flex: 1;
		padding: 1rem 1.5rem;
		font-size: 1.125rem;
		font-weight: 500;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		background: white;
		cursor: pointer;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.answer-button:hover:not(:disabled) {
		border-color: var(--color-primary);
		background-color: #f0f7ff;
	}

	.answer-button:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
	}

	.answer-button.selected {
		border-color: var(--color-primary);
		background-color: #e0f2fe;
	}

	.answer-button.correct {
		border-color: var(--color-success);
		background-color: #e8f5e9;
	}

	.answer-button.wrong {
		border-color: var(--color-error);
		background-color: #ffebee;
	}

	.answer-button:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}

	.key-hint {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		background-color: var(--color-border);
		border-radius: 0.25rem;
		color: #666;
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

	.explanation {
		padding: 1rem;
		background-color: #fff3e0;
		border-left: 4px solid #ff9800;
		border-radius: 0.25rem;
	}
</style>
