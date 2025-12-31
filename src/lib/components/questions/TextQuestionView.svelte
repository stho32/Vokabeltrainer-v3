<script lang="ts">
	import type { TextQuestion } from '$lib/types';
	import { checkTextAnswer } from '$lib/utils/answer-check';
	import { logger } from '$lib/utils/logger';

	interface Props {
		question: TextQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	let userAnswer = $state('');
	let submittedAnswer = $state<string | null>(null);
	let wasCorrect = $state<boolean | null>(null);
	let textareaRef: HTMLTextAreaElement | undefined = $state();

	// Track question hash to detect question changes
	let lastQuestionHash = $state('');
	let wasEvaluated = $state(false);

	// Reset user answer and focus textarea when question text changes
	$effect(() => {
		const currentHash = question.question;
		if (currentHash !== lastQuestionHash) {
			lastQuestionHash = currentHash;
			userAnswer = question.initialValue ?? '';
			submittedAnswer = null;
			wasCorrect = null;
			logger.state('TextQuestionView', 'Neue Frage geladen', {
				questionPreview: question.question.slice(0, 50),
				hasInitialValue: !!question.initialValue
			});
		}
	});

	// Reset when transitioning from evaluated to not evaluated (new question round)
	$effect(() => {
		if (wasEvaluated && !evaluated) {
			// Transition from evaluated to not evaluated means new question round
			userAnswer = question.initialValue ?? '';
			submittedAnswer = null;
			wasCorrect = null;
			logger.state('TextQuestionView', 'Frage zurückgesetzt (Wiederholung)', {
				questionPreview: question.question.slice(0, 50)
			});
		}
		wasEvaluated = evaluated;

		// Focus textarea when question is ready for answering
		if (!evaluated && textareaRef) {
			textareaRef.focus();
		}
	});

	function handleSubmit() {
		if (evaluated) return;
		const isCorrect = checkTextAnswer(userAnswer, question.answer);
		submittedAnswer = userAnswer;
		wasCorrect = isCorrect;
		logger.action('TextQuestionView', 'handleSubmit', {
			userAnswerLength: userAnswer.length,
			userAnswerPreview: userAnswer.slice(0, 30),
			isCorrect
		});
		onSubmit(isCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Tab inserts 4 spaces (R00007)
		if (event.key === 'Tab' && textareaRef) {
			event.preventDefault();
			logger.action('TextQuestionView', 'Keyboard: Tab (4 Leerzeichen eingefügt)');
			const start = textareaRef.selectionStart;
			const end = textareaRef.selectionEnd;
			userAnswer = userAnswer.substring(0, start) + '    ' + userAnswer.substring(end);
			// Restore cursor position after update
			requestAnimationFrame(() => {
				if (textareaRef) {
					textareaRef.selectionStart = textareaRef.selectionEnd = start + 4;
				}
			});
		}

		// Ctrl+Enter submits (R00007)
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault();
			logger.action('TextQuestionView', 'Keyboard: Ctrl+Enter (Submit)');
			handleSubmit();
		}
	}

	function getCorrectAnswer(): string {
		if (Array.isArray(question.answer)) {
			return question.answer.join(' / ');
		}
		return question.answer;
	}

	// Listen for external submit trigger (from "Antworten!" button)
	function handleTriggerSubmit() {
		if (!evaluated) {
			handleSubmit();
		}
	}

	$effect(() => {
		window.addEventListener('trigger-submit', handleTriggerSubmit);
		return () => window.removeEventListener('trigger-submit', handleTriggerSubmit);
	});
</script>

<div class="text-question">
	<div class="question">
		{@html question.question}
	</div>

	<textarea
		bind:this={textareaRef}
		bind:value={userAnswer}
		onkeydown={handleKeydown}
		disabled={evaluated}
		rows="4"
		placeholder="Deine Antwort..."
		class="answer-input"
	></textarea>

	{#if evaluated && submittedAnswer !== null}
		<div class="user-answer" class:correct={wasCorrect} class:wrong={!wasCorrect}>
			<strong>Deine Antwort:</strong>
			{submittedAnswer || '(keine Antwort)'}
			{#if wasCorrect}
				<span class="result-badge correct">✓ Richtig</span>
			{:else}
				<span class="result-badge wrong">✗ Falsch</span>
			{/if}
		</div>
	{/if}

	{#if revealed || evaluated}
		<div class="correct-answer">
			<strong>Richtige Antwort:</strong>
			{getCorrectAnswer()}
		</div>
	{/if}
</div>

<style>
	.text-question {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question {
		font-size: 1.25rem;
		line-height: 1.6;
	}

	.answer-input {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		font-family: inherit;
		border: 2px solid var(--color-border);
		border-radius: 0.5rem;
		resize: vertical;
		min-height: 100px;
	}

	.answer-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.answer-input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	.user-answer {
		padding: 1rem;
		border-radius: 0.25rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.user-answer.correct {
		background-color: #e8f5e9;
		border-left: 4px solid var(--color-success);
	}

	.user-answer.wrong {
		background-color: #ffebee;
		border-left: 4px solid var(--color-error);
	}

	.result-badge {
		font-size: 0.875rem;
		font-weight: 600;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		margin-left: auto;
	}

	.result-badge.correct {
		color: var(--color-success);
		background-color: rgba(40, 167, 69, 0.1);
	}

	.result-badge.wrong {
		color: var(--color-error);
		background-color: rgba(220, 53, 69, 0.1);
	}

	.correct-answer {
		padding: 1rem;
		background-color: #e8f5e9;
		border-left: 4px solid var(--color-success);
		border-radius: 0.25rem;
	}
</style>
