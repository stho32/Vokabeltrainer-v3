<script lang="ts">
	import type { Question } from '$lib/types';
	import { logger } from '$lib/utils/logger';
	import TextQuestionView from './TextQuestionView.svelte';
	import MultipleChoiceView from './MultipleChoiceView.svelte';

	interface Props {
		question: Question;
		revealed: boolean;
		evaluated: boolean;
		onSubmit: (isCorrect: boolean) => void;
	}

	let { question, revealed, evaluated, onSubmit }: Props = $props();

	$effect(() => {
		logger.debug('QuestionRenderer', 'Rendering Frage', {
			type: question.type,
			revealed,
			evaluated
		});
	});
</script>

<div class="question-renderer">
	{#if question.type === 'text'}
		<TextQuestionView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'multiple-choice'}
		<MultipleChoiceView {question} {revealed} {evaluated} {onSubmit} />
	{:else if question.type === 'dice-text'}
		<div class="unsupported">
			<p>Würfeltext-Fragen werden noch nicht unterstützt.</p>
		</div>
	{:else if question.type === 'word-search'}
		<div class="unsupported">
			<p>Wortsuchrätsel werden noch nicht unterstützt.</p>
		</div>
	{/if}
</div>

<style>
	.question-renderer {
		width: 100%;
	}

	.unsupported {
		padding: 2rem;
		text-align: center;
		background-color: #fff3e0;
		border: 2px solid var(--color-warning);
		border-radius: 0.5rem;
	}
</style>
