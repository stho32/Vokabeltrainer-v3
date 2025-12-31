<script lang="ts">
	import type { TextQuestion } from '$lib/types';
	import { checkTextAnswer } from '$lib/utils/answer-check';

	interface Props {
		question: TextQuestion;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	let userAnswer = $state('');
	let textareaRef: HTMLTextAreaElement | undefined = $state();

	// Reset user answer when question changes
	$effect(() => {
		userAnswer = question.initialValue ?? '';
	});

	function handleSubmit() {
		if (evaluated) return;
		const isCorrect = checkTextAnswer(userAnswer, question.answer);
		onSubmit(isCorrect);
	}

	function handleKeydown(event: KeyboardEvent) {
		// Tab inserts 4 spaces (R00007)
		if (event.key === 'Tab' && textareaRef) {
			event.preventDefault();
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
			handleSubmit();
		}
	}

	function getCorrectAnswer(): string {
		if (Array.isArray(question.answer)) {
			return question.answer.join(' / ');
		}
		return question.answer;
	}
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

	.correct-answer {
		padding: 1rem;
		background-color: #e8f5e9;
		border-left: 4px solid var(--color-success);
		border-radius: 0.25rem;
	}
</style>
